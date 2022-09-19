import React from "react";
import { useStore, FORMSTATUS } from "../../store/store";
import RegisterUser from "./RegisterUser";

type Props = {};

export default function RegisterForms({}: Props) {
  const { formStatus } = useStore();
  return (
    <div>
      {formStatus === FORMSTATUS.PRISTINE && <RegisterUser />}
      {formStatus === FORMSTATUS.LOADING && <p>Loading...</p>}
      {formStatus === FORMSTATUS.SUCCESS && <p>Thanks</p>}
      {formStatus === FORMSTATUS.EXISTS && (
        <div>
          <p>Already registered! Thirsty much?</p>
          <RegisterUser />
        </div>
      )}
      {formStatus === FORMSTATUS.ERROR && (
        <div>
          <p>Something went wrong</p>
          <RegisterUser />
        </div>
      )}
      {!formStatus && <p>Please contat support</p>}
    </div>
  );
}
