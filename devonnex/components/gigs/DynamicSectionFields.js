"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

function DynamicSectionFields({ setSections, sections, isValid }) {
  const onChangeSections = (id, type, newValue) => {
    // Update section or bullet value based on the type
    if (type === "bullets") {
      setSections((prevState) => {
        const newState = [...prevState];
        const section = newState.find((section) => section.id === id[0]);
        const bullets = [...section[type]];
        bullets[id[1]] = newValue;
        section["bullets"] = bullets;
        return newState;
      });
    } else {
      setSections((prevState) => {
        const newState = [...prevState];
        const section = newState.find((section) => section.id === id);
        section[type] = newValue;
        return newState;
      });
    }
  };

  const onDeleteBullet = (id) => {
    // Remove the bullet from the section
    setSections((prevState) => {
      const newState = [...prevState];
      const section = newState.find((section) => section.id === id[0]);
      let bullets = [...section["bullets"]];
      bullets.splice(id[1], 1);
      section["bullets"] = bullets;
      return newState;
    });
  };

  const onDeleteSection = (id) => {
    // Remove the section from the sections array
    setSections((prevState) => prevState.filter((el) => el.id !== id));
  };

  return (
    <>
      <div className="modal-columns">
        {/* Render each section */}
        {sections.map((section, index) => {
          return (
            <div key={index}>
              <div className="modal-column">
                <div className="input-container">
                  <h4 style={{ margin: "0" }}>Section</h4>
                </div>

                <Image
                  src="/assets/images/icon-cross.svg"
                  width="16"
                  height="16"
                  alt="delete-column-icon"
                  onClick={() => {
                    onDeleteSection(section.id);
                  }}
                />
              </div>
              <div>
                {/* Section Header */}
                <label htmlFor="section-title">Section Header</label>
                <div className="input-container">
                  <input
                    value={section.header}
                    onChange={(e) =>
                      onChangeSections(
                        section.id,
                        e.target.name,
                        e.target.value
                      )
                    }
                    id="section-title"
                    type="text"
                    name="header"
                    placeholder="e.g. Take a coffee break"
                    className={
                      !isValid && !section.header.trim() ? "red-border" : ""
                    }
                  />
                  {!isValid && !section.header.trim() && (
                    <span className="cant-be-empty-span text-L">
                      Can&apos;t be empty
                    </span>
                  )}
                </div>
                {/* Section Description */}
                <label htmlFor="section-description">Section Description</label>
                <div className="input-container">
                  <textarea
                    value={section.description}
                    style={{ height: "100px", marginBottom: "8px" }}
                    onChange={(e) =>
                      onChangeSections(
                        section.id,
                        e.target.name,
                        e.target.value
                      )
                    }
                    id="section-description"
                    name="description"
                    placeholder="e.g. It's always good to take a break. This 15-minute break will recharge the batteries a little."
                  />
                  {!isValid && !section.description.trim() && (
                    <span className="cant-be-empty-span text-L">
                      Can&apos;t be empty
                    </span>
                  )}
                </div>
                {/* Section Bullets */}
                <label>Section Bullets</label>
                <div className="modal-columns">
                  {/* Render each bullet point */}
                  {section.bullets.map((bullet, index) => {
                    return (
                      <div className="modal-column" key={index}>
                        <div className="input-container">
                          <input
                            onChange={(e) => {
                              onChangeSections(
                                [section.id, index],
                                e.target.name,
                                e.target.value
                              );
                            }}
                            type="text"
                            name="bullets"
                            value={bullet}
                            style={{ marginBottom: "0" }}
                            className={
                              !isValid && !bullet.trim() ? "red-border" : ""
                            }
                          />
                          {!isValid && !bullet.trim() ? (
                            <span className="cant-be-empty-span text-L">
                              Can&apos;t be empty
                            </span>
                          ) : null}
                        </div>
                        <Image
                          src="/assets/images/icon-cross.svg"
                          width="16"
                          height="16"
                          alt="delete-column-icon"
                          onClick={() => {
                            onDeleteBullet([section.id, index]);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                {/* Add new bullet point */}
                <button
                  onClick={() => {
                    setSections((prevState) => {
                      const newState = [...prevState];
                      const sec = newState.find((sec) => sec.id === section.id);
                      sec["bullets"].push("");
                      return newState;
                    });
                  }}
                  className="btn-light"
                  style={{ marginInline: "auto" }}
                >
                  {section.bullets.length === 0
                    ? "Create a bullet point"
                    : "+ Add a new bullet point"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Add new section */}
      <button
        onClick={() => {
          setSections((state) => [
            ...state,
            {
              id: uuidv4(),
              header: "",
              description: "",
              bullets: [""],
            },
          ]);
        }}
        className="add-column-btn btn-light"
        style={{ marginBottom: "20px" }}
      >
        {sections.length === 0
          ? "Create a detail section"
          : "+ Add a new detail section"}
      </button>
    </>
  );
}

export default DynamicSectionFields;
