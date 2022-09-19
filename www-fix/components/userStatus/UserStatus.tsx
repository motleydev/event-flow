import React from "react";
import { useStore } from "../../store/store";
import NoUserFound from "../../components/noUserFound/NoUserFound";
import UserFound from "../../components/userFound/UserFound";

type Props = {};

export default function UserStatus({}: Props) {
  const { user } = useStore();
  return (
    <div>
      {!user && <NoUserFound />}
      {user && <UserFound />}
    </div>
  );
}
