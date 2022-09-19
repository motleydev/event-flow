import Link from "next/link";
import React from "react";
import { AUTH, useStore } from "../../store/store";

type Props = {};

export default function DynamicMenu({}: Props) {
  const {
    logOut,
    user: { authed },
  } = useStore();
  return (
    <ul
      tabIndex={0}
      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li>
        <a>Homepage</a>
      </li>
      {authed === AUTH.NOT_AUTHED && (
        <li>
          <Link href="/user/register">
            <a>Register</a>
          </Link>
        </li>
      )}
      {authed == AUTH.AUTHED && (
        <li>
          <button onClick={() => logOut()}>Log Out</button>
        </li>
      )}
    </ul>
  );
}
