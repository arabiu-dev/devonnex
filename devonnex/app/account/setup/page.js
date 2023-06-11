"use client";

import React, { useState } from "react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContexts";
import { checkIfUserExist, createUser } from "@/utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  InputFieldSelect,
  Button,
  InputFieldFile,
  InputField,
} from "@/utils/formFields";

export default function AccountSetupPage() {
  const [loading, setLoading] = useState(false);
  const [workEmail, setWorkEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("Can't be empty");
  const [expertise, SetExpertise] = useState("Web Development");
  const [photo, setPhoto] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const router = useRouter();

  const { currentUser, setCurrentUserDetails, setNotification } = useAuth();
  const queryClient = useQueryClient();

  const validate = () => {
    setIsValid(false);
    if (
      !workEmail.trim() ||
      !fullName.trim() ||
      !username.trim() ||
      !phoneNumber.trim() ||
      !bio.trim() ||
      !photo ||
      !expertise.trim()
    ) {
      setError("Can't be empty");
      return false;
    }

    if (!["image/png", "image/jpeg"].includes(photo.type)) return false;

    if (usernameError !== "") return false;
    setIsValid(true);
    return true;
  };

  const usernameQuery = useQuery({
    queryKey: ["usernameExist"],
    queryFn: () => checkIfUserExist(username),
    enabled: username !== "",
    onSuccess: (data) => {
      if (data) {
        setUsernameError("Username already exist");
      } else {
        username.length <= 3 && username.length > 0
          ? setUsernameError("Username too short")
          : setUsernameError("");
      }
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      setCurrentUserDetails(data);
      nookies.set(undefined, "userDetails", JSON.stringify(data), {
        path: "/",
      });
      destroyCookie(null, "_psw_", { path: "/" });
      setNotification(true, "Acount created successfully");
      router.push(`/account?user=${data.username}`);
    },
    onError: () => {
      setLoading(false);
      setNotification(false, "Something went wrong");
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    const photoData = new FormData();
    photoData.append("file", photo);
    photoData.append("upload_preset", "vua0iayr");

    const reqData = {
      user: {
        bio,
        username,
        expertise,
        work_email: workEmail,
        phone_number: phoneNumber,
        id: currentUser.uid,
        full_name: fullName,
      },
    };
    createUserMutation.mutate({ photoData, reqData });
  };
  return (
    <section className="section" aria-label="feature" id="featured">
      <div className="container">
        <div
          className="jobDescription"
          style={{
            gap: "1rem",
            width: "480px",
            marginTop: "4rem",
            position: "relative",
          }}
        >
          <div>
            <h3>Profile Setup</h3>
            <InputField
              type="text"
              labelName="Full Name"
              fieldValue={fullName}
              setFieldValue={setFullName}
              placeholder="e.g. Korra Dune"
              isValid={isValid}
              error={"Can't be empty"}
            />

            <InputField
              type="email"
              labelName={"Work Email"}
              fieldValue={workEmail}
              setFieldValue={setWorkEmail}
              placeholder="e.g. user@example.com"
              isValid={isValid}
              error={"Can't be empty"}
            />
            <label htmlFor="board-username-input">Unique Username</label>
            <div className="input-container">
              <input
                value={username}
                onChange={async (e) => {
                  await setUsername(e.target.value);
                  usernameQuery.refetch();
                }}
                id="board-username-input"
                type="text"
                placeholder="e.g. Korra Dune"
                className={
                  usernameError || (!isValid && !username.trim())
                    ? "red-border"
                    : ""
                }
              />
              {(usernameError || (!isValid && !username.trim())) && (
                <span className="cant-be-empty-span text-L">
                  {usernameError || error}
                </span>
              )}
            </div>
            <InputField
              type="tel"
              labelName={"Phone Number"}
              fieldValue={phoneNumber}
              setFieldValue={setPhoneNumber}
              placeholder="e.g. 0123456789"
              isValid={isValid}
              error={"Can't be empty"}
            />
            <InputFieldSelect
              labelName="Field"
              fieldValue={expertise}
              setFieldValue={SetExpertise}
              optionsValue={null}
            />
            <label htmlFor="board-bio-input">Bio</label>
            <div className="input-container">
              <textarea
                value={bio}
                style={{ height: "100px" }}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                id="task-description-input"
                placeholder="e.g. It's always good to take a break. 
                      This 15 minute break will  recharge the batteries a little."
              />
              {!isValid && !bio.trim() ? (
                <span className="cant-be-empty-span text-L">
                  {" "}
                  Can&apos;t be empty
                </span>
              ) : null}
            </div>
            <InputFieldFile
              labelName="Profile Picture"
              fieldValue={photo}
              setFieldValue={setPhoto}
              isValid={isValid}
              error="Can't be empty"
            />
            <Button
              validate={validate}
              onSubmit={onSubmit}
              label="Submit"
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
