import EmailVerification from "@/components/auth/EmailVerification";
import React from "react";

export const emailVerificationMetadata = {
  title: "Email Verification - Devonnex",
  description:
    "Verify your email address to complete the registration process on Devonnex.",
};

function EmailVerificationPage() {
  return <EmailVerification />;
}

export default EmailVerificationPage;
