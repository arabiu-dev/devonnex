"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContexts";
import { ArrowBack } from "../../utils/Icons";
import { createTalent, updateTalent, getTalent } from "@/utils/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import AuthRoute from "@/contexts/AuthRoute";
import {
  InputFieldSelect,
  Button,
  InputField,
  InputFieldFile,
} from "@/utils/formFields";

function CreateTalent({ searchParams: { id } }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [rate, setRate] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const { currentUser, setNotification } = useAuth();

  const { data } = useQuery({
    queryKey: ["talentDetails", id],
    queryFn: getTalent,
    enabled: id !== undefined,
  });

  useEffect(() => {
    if (id && data) {
      setTitle(data.title);
      setRate(data.rate);
    }
  }, [data, id]);

  const validate = () => {
    setIsValid(true);
    setError("");

    if (!title.trim() || !category.trim() || rate < 0) {
      setError("Can't be empty");
      setIsValid(false);
      return false;
    }

    if (!id && !photo) {
      setPhoto(null);
      setIsValid(false);
      return false;
    }

    if (id && photo && !["image/png", "image/jpeg"].includes(photo.type)) {
      setPhoto(null);
      setIsValid(false);
      return false;
    }
    setIsValid(true);
    return true;
  };

  const createTalentMutation = useMutation({
    mutationFn: createTalent,
    onError: () => {
      setNotification(false, "Something went wrong.");
      setLoading(false);
    },
    onSuccess: (data) => {
      setNotification(true, "Talent Created Successfully");
      router.push("/talents?page=1&filter=All");
    },
  });

  const updateTalentMutation = useMutation({
    mutationFn: updateTalent,
    onError: () => {
      setNotification(false, "Something went wrong.");
      setLoading(false);
    },
    onSuccess: (data) => {
      setNotification(true, "Talent Updated Successfully");
      router.push("/talents?page=1&filter=All");
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    let photoData = null;
    if (photo) {
      photoData = new FormData();
      photoData.append("file", photo);
      photoData.append("upload_preset", "vua0iayr");
    }

    const reqData = {
      talent: {
        title,
        rate,
        category,
        user_id: currentUser.uid,
      },
    };
    if (id) {
      reqData.talent["id"] = id;
      updateTalentMutation.mutate({ photoData, reqData });
    } else {
      createTalentMutation.mutate({ photoData, reqData });
    }
  };

  return (
    <section className="section" aria-label="feature" id="featured">
      <div className="container">
        <button href="#" className="btn-link link:hover" onClick={router.back}>
          <ArrowBack />
          <span className="span">Go back</span>
        </button>
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
            <h3>Advertise Your Skills</h3>

            <InputField
              type="text"
              labelName="Card Title"
              fieldValue={title}
              setFieldValue={setTitle}
              isValid={isValid}
              error={"Can'y be empty"}
            />

            <InputField
              type="number"
              labelName="Service Rate Per Hour"
              fieldValue={rate}
              setFieldValue={setRate}
              isValid={isValid}
              error={"Value can't be negative"}
            />

            <InputFieldFile
              labelName="Add a Photo Summarizing All the things you offer"
              fieldValue={photo}
              setFieldValue={setPhoto}
              isValid={isValid}
              error={id ? "Only Images are supported" : "Can't be empty"}
            />
            <InputFieldSelect
              labelName="Choose the IT field your ad will focus"
              fieldValue={category}
              setFieldValue={setCategory}
              optionsValue={null}
            />
            <Button
              validate={validate}
              onSubmit={onSubmit}
              label={id ? "Update" : "Create"}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthRoute(CreateTalent);
