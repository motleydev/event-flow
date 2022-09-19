import React from "react";
import { useVerifyUserMutation } from "../../generated/graphql";
import { useStore } from "../../store/store";

type Props = {};

export default function UserFound({}: Props) {
  const [result, mutation] = useVerifyUserMutation();
  const { user, setUser } = useStore();

  return (
    <div>
      <article className="prose mb-4">
        <p>Hello {user.name}!</p>
      </article>
      {!user.verified && (
        <button
          className="btn btn-lg"
          onClick={() => {
            mutation(
              {
                id: user.id,
              },
              {
                fetchOptions: {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                },
              }
            ).then((d) => {
              if (d?.data) {
                setUser({ ...user, ...d.data.update_user_by_pk });
              }
            });
          }}
        >
          Confirm your entry
        </button>
      )}
    </div>
  );
}
