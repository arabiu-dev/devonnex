"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContexts";
import { InputField, Button } from "@/utils/formFields";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [isRequestSent, setIsRequetSent] = useState(false);
  const [nameWordError, setNameWordError] = useState("Can't be empty");
  const [isValid, setIsValid] = useState(true);
  const { resetPassword, setNotification } = useAuth();

  const validate = () => {
    setIsValid(false);
    if (!email.trim()) {
      setNameWordError("Can't be empty");
      return false;
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = async () => {
    try {
      await resetPassword(email);
      setIsRequetSent(true);
    } catch (err) {
      if (err.code === "auth/user-not-found")
        setNotification(false, "There is no user with this account");
    }
  };

  return isRequestSent ? (
    <>
      {" "}
      <h3 style={{ alignSelf: "flex-start" }}>Password Reset Success</h3>
      <p>Reset password email sent successfully.</p>
    </>
  ) : (
    <>
      <div>
        <h3>Password Reset</h3>
        <InputField
          type="email"
          labelName={"Email"}
          fieldValue={email}
          setFieldValue={setEmail}
          placeholder="e.g abc@example.com"
          isValid={isValid}
          error={nameWordError}
        />
        <Button
          validate={validate}
          onSubmit={onSubmit}
          label="Reset"
          loading={false}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <Link href={"/auth/login"}>
          <small>Login</small>
        </Link>
        <Link href={"/auth/register"}>
          <small>Need an account? Sign up.</small>
        </Link>
      </div>
    </>
  );
}
