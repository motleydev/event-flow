import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { client } from "../utils/client";
import Cookies from "js-cookie";
import Router from "next/router";
import {
  RegisterUser,
  RegisterUserMutation,
  RegisterUserMutationVariables,
  User,
} from "../generated/graphql";
import { GraphQLError } from "graphql";

const COOKIE_STRING = "event-flow-user-id";

const errorPick = (error: string) => (errorArray: GraphQLError[]) =>
  errorArray.filter(({ message }) => message.includes(error)).length > 0;

const notUniqueError = errorPick("Uniqueness violation");

export enum AUTH {
  AUTHED = "authed",
  NOT_AUTHED = "not_authed",
}

export enum FORMSTATUS {
  PRISTINE = "pristine",
  ERROR = "error",
  EXISTS = "exists",
  SUCCESS = "success",
  LOADING = "loading",
}

interface LocalUser extends Partial<User> {
  authed: AUTH;
  token?: string;
}

interface EventFlow {
  user: LocalUser;
  formStatus: FORMSTATUS;
  register: (name: string, email: string) => void;
  logOut: () => void;
  setUser: (user: LocalUser) => void;
}

const useStore = create<EventFlow>()(
  devtools(
    persist(
      (set, get) => ({
        user: { authed: AUTH.NOT_AUTHED },
        formStatus: FORMSTATUS.PRISTINE,
        setUser: (user) => {
          set({ user });
        },
        logOut: () => {
          set({
            user: { authed: AUTH.NOT_AUTHED },
            formStatus: FORMSTATUS.PRISTINE,
          });
          Cookies.remove(COOKIE_STRING);
          Router.push("/");
        },
        register: (name: string, email: string) => {
          console.log("Signing up user ", name);
          set({ formStatus: FORMSTATUS.LOADING });
          client
            .mutation<RegisterUserMutation, RegisterUserMutationVariables>(
              RegisterUser,
              {
                name,
                email,
              }
            )
            .toPromise()
            .then((d) => {
              if (d.error) {
                if (notUniqueError(d.error.graphQLErrors)) {
                  set({ formStatus: FORMSTATUS.EXISTS });
                } else {
                  set({ formStatus: FORMSTATUS.ERROR });
                  console.log(d.error.graphQLErrors);
                }
              } else {
                if (d.data?.insert_user_one) {
                  const { name, id, verified } = d.data?.insert_user_one;
                  Cookies.set(COOKIE_STRING, id as string);
                  set({
                    user: { authed: AUTH.AUTHED, verified, id, name },
                    formStatus: FORMSTATUS.SUCCESS,
                  });
                }
              }
            });
        },
      }),
      {
        name: "event-flow",
        getStorage: () => localStorage,
      }
    )
  )
);

export { useStore };
