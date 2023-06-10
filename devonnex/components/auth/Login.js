"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContexts";
import { LogoGoogle } from "@/utils/Icons";
import { InputField, Button } from "@/utils/formFields";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [passWordError, setPassWordError] = useState("Can't be empty");
  const [nameWordError, setNameWordError] = useState("Can't be empty");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { signin, setNotification, signinWithGoogle } = useAuth();

  const validate = () => {
    setIsValid(false);
    if (!email.trim() || !password.trim()) {
      setNameWordError("Can't be empty");
      setPassWordError("Can't be empty");
      return false;
    }

    if (password.trim().length < 6) {
      setPassword("");
      setPassWordError("Min length is six");
      return false;
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await signin(email, password);
    } catch (err) {
      console.log(err);
      if (err.code === "auth/user-not-found")
        setNotification(false, "There is no user with this email");
      else if (err.code === "auth/wrong-password")
        setNotification(false, "Password is incorrect");
      else if (err.code === "auth/invalid-email")
        setNotification(false, "The email address is badly formatted.");
      else setNotification(false, "Something is wrong.");
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h3>Login</h3>
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
        <Button
          validate={validate}
          onSubmit={onSubmit}
          label="Sign in"
          loading={loading}
        />
      </div>
      <div>
        <h4>Or with account:</h4>
        <button onClick={signinWithGoogle} className="add-column-btn btn-light">
          <LogoGoogle />
          Sign in with Google
        </button>
      </div>
      <div style={{ textAlign: "center" }}>
        <Link href={"/auth/password_reset"}>
          <small>Forgot Password?</small>
        </Link>
        <Link href={"/auth/register"}>
          <small>Need an account? Sign up.</small>
        </Link>
      </div>
    </>
  );
}
