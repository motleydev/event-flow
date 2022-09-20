import React from "react";
import { FormEvent } from "react";
import { useStore } from "../../store/store";

type Props = {};

export default function RegisterUser({}: Props) {
  const { register } = useStore();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const submit = (event: FormEvent<Element>) => {
    event.preventDefault();
    register(name, email);
  };
  return (
    <form onSubmit={submit}>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        required={true}
        placeholder={"Max Mustermann"}
        value={name}
        className="input input-bordered w-full max-w-xs"
      />

      <div className="form-control">
        <label className="label">
          <span className="label-text">Your Email</span>
        </label>
        <label className="input-group">
          <span>Email</span>
          <input
            type="email"
            placeholder={"max@mustermann.com"}
            value={email}
            className="input input-bordered"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
      </div>
      <button className="btn btn-secondary mt-6" type="submit">
        Signup
      </button>
    </form>
  );
}

// "Uniqueness violation"
