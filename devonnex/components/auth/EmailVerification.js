"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContexts";

export default function EmailVerification() {
  const [countdown, setCountdown] = useState(120);
  const isInitialRender = useRef(true);
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialRender.current) {
      currentUser.reload();
      if (!currentUser.emailVerified) {
        currentUser.sendEmailVerification({
          url: "https://devonnex.tech/account/setup",
        });
      } else {
        router.push("/account/setup");
      }
      isInitialRender.current = false;
    }
  }, [currentUser, router]);

  useEffect(() => {
    let timer = null;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <h3 style={{ alignSelf: "flex-start" }}>Email Verification</h3>
      <p style={{ marginBlockEnd: "2rem" }}>
        You are almost there! We sent an email to{" "}
        <small>{currentUser && currentUser.email}</small>
      </p>
      <p style={{ marginBlockEnd: "2rem" }}>
        Just click on the link in that mail to complete your signup. If you
        don&apos;t see it, you may need to <b>check your spam</b> folder.
      </p>

      <div style={{ textAlign: "center" }}>
        <small>Still Cant&apos;t find the email?</small>
        <button
          onClick={async () => {
            setCountdown(120);
            currentUser.sendEmailVerification({
              url: "https://devonnex.tech/account/setup",
            });
          }}
          className="btn"
          disabled={countdown > 0}
          style={{
            margin: "6px auto",
            width: "100%",
            color: `${countdown > 0 ? "gray" : ""}`,
          }}
        >
          Resend email
        </button>
        <small>{formatTime(countdown)}</small>
      </div>
    </>
  );
}
