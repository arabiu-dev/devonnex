"use client";

import React, { useState } from "react";
import nookies from "nookies";
import { useAuth } from "@/contexts/authContexts";
import { LogoGoogle } from "@/utils/Icons";
import { InputField, Button } from "@/utils/formFields";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [passWordError, setPassWordError] = useState("Can't be empty");
  const [nameWordError, setNameWordError] = useState("Can't be empty");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [cpassword, setCPassword] = useState("");

  const { signup, signinWithGoogle, setNotification } = useAuth();
  const validate = () => {
    setIsValid(false);
    if (!email.trim() || !password.trim() || !cpassword.trim()) {
      setNameWordError("Can't be empty");
      setPassWordError("Can't be empty");
      return false;
    }

    if (password.trim().length < 6 || cpassword.trim().length < 6) {
      setPassword("");
      setCPassword("");
      setPassWordError("Min length is six");
      return false;
    }

    if (password != cpassword) {
      setPassword("");
      setCPassword("");
      setPassWordError("Passwords do not match");
      return false;
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await signup(email, password);
      nookies.set(undefined, "_psw_", password, { path: "/" });
    } catch (err) {
      if (err.code === "auth/email-already-in-use")
        setNotification(false, "Email already used by another account");
      else if (err.code === "auth/invalid-email")
        setNotification(false, "Email is not valid");
      else setNotification(false, "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h3>Register</h3>
        <InputField
          type="email"
          labelName={"Email"}
          fieldValue={email}
          setFieldValue={setEmail}
          placeholder="e.g abc@example.com"
          isValid={isValid}
          error={nameWordError}
        />

        <InputField
          type="password"
          labelName={"Password"}
          fieldValue={password}
          setFieldValue={setPassword}
          placeholder="e.g. Min 6 chars"
          isValid={isValid}
          error={passWordError}
        />
        <InputField
          type="password"
          labelName={"Confirm Password"}
          fieldValue={cpassword}
          setFieldValue={setCPassword}
          placeholder="e.g. Min 6 chars"
          isValid={isValid}
          error={passWordError}
        />

        <Button
          validate={validate}
          onSubmit={onSubmit}
          label="Sign up"
          loading={loading}
        />
      </div>
      <div className="logging-links">
        <h4>Or with account:</h4>
        <button onClick={signinWithGoogle} className="add-column-btn btn-light">
          <LogoGoogle />
          Sign up with Google
        </button>
      </div>
      <div style={{ textAlign: "center" }}>
        <Link href={"/auth/login"}>
          <small>Already have an account?</small>
        </Link>
        <small>
          By signing up, you agree to Nexera&apos;s Terms of Service & Privacy
          Policy.
        </small>
      </div>
    </>
  );
}
