import React from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const RegisterForms = dynamic(
  () => import("../../components/registerUser/RegisterForms"),
  { ssr: false }
);

const RegisterPage: NextPage = () => {
  return (
    <div>
      <RegisterForms />
    </div>
  );
};

export default RegisterPage;
