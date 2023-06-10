import PasswordReset from "@/components/auth/PasswordReset";
import React from "react";

export const metadata = {
  title: "Password Reset - Devonnex",
  description:
    "Reset your password and regain access to your account on Devonnex.",
};

function PasswordResetPage() {
  return <PasswordReset />;
}

export default PasswordResetPage;
