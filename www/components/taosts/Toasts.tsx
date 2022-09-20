import React from "react";
import { formatISO } from "date-fns";
import { Toaster, toast } from "react-hot-toast";
import { useStreamUsersSubscription } from "../../generated/graphql";

type Props = {};

export default function Toasts({}: Props) {
  const [{ data }, method] = useStreamUsersSubscription(
    {
      variables: {
        date: formatISO(new Date()),
      },
    },
    () => {
      toast.success("🥃");
    }
  );

  return <></>;
}
