"use client";

import React, { useState } from "react";
import Chats from "@/components/chats/Chats";
import Controls from "@/components/chats/Controls";
import Sidebar from "@/components/chats/Sidebar";
import AuthRoute from "@/contexts/AuthRoute";

function ChatsPage() {
  const [active, setActive] = useState(true);
  const [modalClosed, setModalClosed] = useState(true);
  return (
    <>
      <Chats />
      <Sidebar setActive={setActive} active={active} />
      <Controls setActive={setActive} setModalClosed={setModalClosed} />
    </>
  );
}

export default AuthRoute(ChatsPage);
