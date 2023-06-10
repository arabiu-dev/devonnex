import React, { useState } from "react";
import moment from "moment";
import Image from "next/image";
import { useChat } from "@/contexts/chatContext";
import { useAuth } from "../../contexts/authContexts";
import { CloseOutline, PersonAddOutline } from "../../utils/Icons";

export default function Sidebar({ setActive, active }) {
  // Get necessary data and functions from hooks
  const { contacts, addContact, setCurrentChatUser } = useChat();
  const { currentUserDetails } = useAuth();

  // State for new contact input
  const [newContact, setNewContact] = useState("");

  // Function to handle adding a new contact
  const handleNewContact = () => {
    // Check if the input is empty or the same as the current user's username
    if (!newContact.trim()) return;
    if (newContact === currentUserDetails.username) return;

    // Add the new contact using the addContact mutation function
    addContact.mutate({ username: newContact });

    // Reset the new contact input value
    setNewContact("");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${active ? "active" : ""}`}
        data-overlay
        onClick={() => setActive((state) => !state)}
      ></div>

      {/* Sidebar */}
      <div className={`chatSidebar ${active ? "active" : ""}`} data-mobile-menu>
        <div className="chatSidebar-category">
          {/* Sidebar top */}
          <div className="chatSidebar-top">
            <h2 className="chatSidebar-title">Contacts</h2>

            {/* Close button */}
            <button
              className="chatSidebar-close-btn"
              data-mobile-menu-close-btn
              onClick={() => setActive((state) => !state)}
            >
              <CloseOutline />
            </button>
          </div>

          {/* Contacts list */}
          <div className="showcase-wrapper">
            <div className="showcase-container">
              {contacts.data.length <= 0 ? (
                // Message when no contacts are available
                <p className="showcase-title">
                  Your Contacts will appear here...
                </p>
              ) : (
                // Render each contact
                contacts.data.map((contact) => {
                  return (
                    <div
                      className="showcase"
                      key={contact.username}
                      onClick={() => {
                        // Set the current chat user and close the sidebar
                        setCurrentChatUser(
                          contacts.data.find(
                            (c) => c.username === contact.username
                          )
                        );
                        setActive((state) => !state);
                      }}
                    >
                      <button className="showcase-img-box">
                        {/* Contact image */}
                        <Image
                          src={`https://res.cloudinary.com/dqzvvp77h/image/upload/ar_1.0,c_fill,w_250/r_max/f_auto/${contact.photo}.jpg`}
                          alt={contact.username}
                          width="65"
                          height="65"
                          className="showcase-img"
                        />
                      </button>

                      <div className="showcase-content">
                        <button>
                          {/* Contact username */}
                          <h4 className="showcase-title">{contact.username}</h4>
                        </button>

                        <div className="date-box">
                          {/* Last activity date */}
                          <p className="showcase-title">
                            {moment(contact.last_activity * 1000)
                              .local(true)
                              .format("MMM Do YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Add new contact */}
        <div className="product-showcase">
          <div
            className="product-showcase"
            style={{
              position: "absolute",
              bottom: "30px",
            }}
          >
            <h3 className="showcase-heading">Add new contact</h3>

            <div className="header-text-container">
              {/* New contact input */}
              <input
                type="text"
                name="search"
                className="text-field"
                value={newContact}
                placeholder="Enter a username..."
                onChange={(e) => setNewContact(e.target.value)}
              />

              {/* Add contact button */}
              <button className="text-btn" onClick={handleNewContact}>
                <PersonAddOutline />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
