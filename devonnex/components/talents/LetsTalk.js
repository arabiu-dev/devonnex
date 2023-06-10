"use client";
import { useChat } from "@/contexts/chatContext";
import React from "react";
import { Flash } from "../../utils/Icons";

function LetsTalk({ talent }) {
  const { handleInterview } = useChat();
  return (
    <button className="btn btn-primary" onClick={() => handleInterview(talent)}>
      <Flash />
      <span className="span">Let&apos;s talk</span>
    </button>
  );
}

export default LetsTalk;
