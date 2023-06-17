import React, { useState } from "react";
import { useChat } from "@/contexts/chatContext";
import { useAuth } from "@/contexts/authContexts";
import { GridOutline, SendOutline } from "../../utils/Icons";

export default function Controls({ setActive, setModalClosed }) {
  const [msg, setMsg] = useState("");
  const { currentChatUser, setChatHistory, socket } = useChat();
  const { currentUserDetails } = useAuth();

  const onClick = () => {
    if (!msg.trim()) return;

    const chat = {
      type: "message",
      chat: {
        from: currentUserDetails.username,
        to: currentChatUser.username,
        message: msg,
      },
    };

    // Send message via socket
    socket.current.send(JSON.stringify(chat));

    // Update chat history with the new message
    setChatHistory((prev) => ({
      ...prev,
      data: [
        { ...chat.chat, timestamp: Date.now() / 1000, id: Date.now() },
        ...prev.data,
      ],
    }));

    // Reset the input field
    setMsg("");
  };

  return (
    <div className="mobile-bottom-navigation">
      {/* Open sidebar button */}
      <button
        className="action-btn"
        data-mobile-menu-open-btn
        onClick={() => setActive((state) => !state)}
      >
        <GridOutline />
      </button>

      <div className="header-text-container">
        {/* Message input */}
        <input
          type="text"
          name=""
          className="text-field"
          value={msg}
          placeholder="Enter your text..."
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.code === "Enter" && onClick()}
        />

        {/* Send message button */}
        <button className="text-btn" onClick={onClick}>
          <SendOutline />
        </button>
      </div>
    </div>
  );
}
