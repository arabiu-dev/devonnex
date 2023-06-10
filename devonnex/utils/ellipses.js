"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { updateHiring, deleteModels } from "./api";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import {
  EllipsisHorizontalOutline,
  ChatboxEllipses,
  RocketOutline,
  PencilOutline,
  TrashBinOutline,
  OpenOutline,
  DuplicateOutline,
  DownloadOutline,
} from "./Icons";
import { useChat } from "../contexts/chatContext";
import { useAuth } from "../contexts/authContexts";

export default function Ellipses({ handlers }) {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const { handleInterview } = useChat();
  const { setNotification } = useAuth();

  const deleteMutation = useMutation(deleteModels);
  const hringMutation = useMutation({
    mutationFn: updateHiring,
    onSuccess: () => {
      setNotification(true, "Hiring Successful. Funds Updated.");
      router.refresh();
    },
    onError: () => {
      setNotification(false, "Something went wrong");
      router.refresh();
    },
  });

  // Function to handle the deletion of models
  const handleDelete = (url, path) => {
    deleteMutation.mutate(url);
    router.push(path);
  };

  // Function to handle hiring actions
  const handleHiring = (val) => {
    hringMutation.mutate({
      gig: {
        id: val[0][0],
        offered_to: val[0][1],
        status: "Hired",
      },
      gigUser: val[1],
      proposalUser: val[2],
    });
  };

  const funcs = {
    Edit: router.push,
    Profile: router.push,
    Delete: handleDelete,
    Interview: handleInterview,
    "Hire!": handleHiring,
    Withdraw: router.push,
    "Add Funds": router.push,
  };

  const icons = {
    Edit: <PencilOutline />,
    Profile: <OpenOutline />,
    Delete: <TrashBinOutline />,
    Interview: <ChatboxEllipses />,
    "Hire!": <RocketOutline />,
    "Add Funds": <DuplicateOutline />,
    Withdraw: <DownloadOutline />,
  };

  return (
    <>
      <button
        className="card-menu-btn icon-box"
        aria-label="More"
        data-menu-btn
        onClick={() => setActive((prev) => !prev)}
      >
        <EllipsisHorizontalOutline />
      </button>

      <ul
        className={`ctx-menu ${active ? "active" : ""}`}
        style={{ zIndex: "20" }}
      >
        {handlers.map((handler) =>
          handler[0] !== "Delete" ? (
            <li className="ctx-item" key={uuidv4()}>
              <button
                className="ctx-menu-btn icon-box"
                onClick={() => funcs[handler[0]](handler[1])}
              >
                {icons[handler[0]]}
                <span className="ctx-menu-text">{handler[0]} </span>
              </button>
            </li>
          ) : (
            <React.Fragment key={uuidv4()}>
              <li className="divider"></li>

              <li className="ctx-item">
                <button
                  className="ctx-menu-btn red icon-box"
                  onClick={() => funcs[handler[0]](handler[1], handler[2])}
                >
                  {icons[handler[0]]}

                  <span className="ctx-menu-text">{handler[0]}</span>
                </button>
              </li>
            </React.Fragment>
          )
        )}
      </ul>
    </>
  );
}
