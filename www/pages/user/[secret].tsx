import { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { client } from "../../utils/client";
import {
  GetUserBySlug,
  GetUserBySlugQuery,
  GetUserBySlugQueryVariables,
} from "../../generated/graphql";
import { generateJWT } from "../../utils/jwt";
import { useStore } from "../../store/store";
import React from "react";
import dynamic from "next/dynamic";

const DynamicUserStatus = dynamic(
  () => import("../../components/userStatus/UserStatus"),
  { ssr: false }
);

type Data = {
  user: GetUserBySlugQuery["login_request"][number]["user"] | null;
  token?: string | null;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { secret } = query;
  let token = null;

  const user = await client
    .query<GetUserBySlugQuery, GetUserBySlugQueryVariables>(GetUserBySlug, {
      slug: secret as string,
    })
    .toPromise()
    .then((d) => {
      if (d.error) {
        console.log(d.error.graphQLErrors);
        return null;
      }
      if (d.data) {
        return d.data.login_request[0].user || null;
      } else {
        return null;
      }
    })
    .catch((e) => {
      console.log(e.message);
      return null;
    });

  if (!user?.id) {
    console.log("yippe");
  }

  if (user?.id) {
    token = generateJWT({
      otherClaims: {
        "X-Hasura-User-Id": user.id.toString(),
      },
    });
  }

  const data: Data = { user, token };

  return {
    props: data,
  };
};

const UserSecret: NextPage = ({
  user,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setUser } = useStore();

  useEffect(() => {
    setUser({ ...user, token });
  }, [user, token]);

  return (
    <div>
      <DynamicUserStatus />
    </div>
  );
};

export default UserSecret;
