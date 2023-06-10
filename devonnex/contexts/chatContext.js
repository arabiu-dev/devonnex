"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./authContexts";
import socketHandler from "@/utils/websocket/ws";
import { getContacts, newUserContact, fetchChatHistory } from "@/utils/api";

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export default function ChatProvider({ children }) {
  const [contacts, setContacts] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [chatHistory, setChatHistory] = useState({ data: [] });
  const [socketSendMsg, setSocketSendMsg] = useState(undefined);
  const { currentUserDetails, setNotification } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const socket = useRef(null);
  const cb = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(`ws://localhost:8081/ws`);

    return () => {
      socket.current.close();
    };
  }, []);

  cb.current = (message) => {
    const msg = JSON.parse(message.data);

    if (
      currentChatUser &&
      currentUserDetails?.username === msg.to &&
      currentChatUser?.username === msg.from
    ) {
      setChatHistory((prev) => ({
        ...prev,
        data: [msg, ...prev.data],
      }));
    } else if (currentUserDetails?.username !== msg.from) {
      setNotification(<p>{msg.from} sent you a message!</p>);
    }
  };

  useEffect(() => {
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.removeEventListener("open", cb.current);
    }
    setSocketSendMsg(
      socketHandler(socket.current, cb.current, currentUserDetails?.username)
    );
  }, [currentChatUser, currentUserDetails?.username]);

  const contactsQuery = useQuery({
    queryKey: ["userContacts", currentUserDetails],
    queryFn: () => getContacts(currentUserDetails?.username),
    enabled: currentUserDetails !== undefined,
    onSuccess: (data) => {
      if (data.data !== undefined) {
        setContacts(data);
        if (data.data.length) setCurrentChatUser(data.data[0]);
      } else {
        setContacts({ data: [] });
      }
    },
  });

  const queryChatHistory = useQuery({
    queryKey: ["fetchChats", currentChatUser],
    queryFn: () =>
      fetchChatHistory(currentUserDetails?.username, currentChatUser?.username),
    enabled: currentChatUser !== null,
    onSuccess: (data) => {
      if (data.status) {
        setChatHistory(data);
      }
    },
  });

  const addContact = useMutation({
    mutationKey: ["newContacts"],
    mutationFn: (data) => newUserContact(data),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["userContacts", currentUserDetails],
        (prevData) =>
          setContacts({
            ...prevData,
            data: [data, ...prevData.data],
          })
      );
    },
  });

  const handleInterview = async (val) => {
    setLoading(true);
    const chat = {
      type: "message",
      chat: {
        from: val[0],
        to: currentUserDetails?.username,
        message: `Hi, My name is ${val[1]}, how can I be of help?`,
      },
    };

    router.push("/chats");
    await socketSendMsg(chat);
    await contactsQuery.refetch();

    setLoading(false);
  };

  const value = {
    contacts,
    currentChatUser,
    chatHistory,
    addContact,
    setCurrentChatUser,
    loading,
    setChatHistory,
    socketSendMsg,
    handleInterview,
  };

  // Provide the chat context value to children when loading is false
  return (
    <ChatContext.Provider value={value}>
      {!loading && children}
    </ChatContext.Provider>
  );
}
