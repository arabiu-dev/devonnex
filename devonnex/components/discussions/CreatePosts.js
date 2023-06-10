"use client";

// Import necessary modules and components
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPost, updatePost, getPost } from "@/utils/api";
import { useAuth } from "@/contexts/authContexts";
import AuthRoute from "@/contexts/AuthRoute";
import { ArrowBack } from "../../utils/Icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  InputField,
  Button,
  InputFieldFile,
  InputFieldSelect,
} from "@/utils/formFields";

function CreatePosts({ searchParams: { id } }) {
  // State variables
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [paragraph, setParagraph] = useState([
    { content: "", order: 1 },
    { content: "", order: 2 },
    { content: "", order: 3 },
  ]);
  const [topic, setTopic] = useState("Web Development");
  const [tags, setTags] = useState([""]);

  // Access authentication context and router
  const { currentUser, setNotification } = useAuth();
  const router = useRouter();

  // Query to get post details if editing an existing post
  const { data } = useQuery(["postDetails", id], getPost, {
    enabled: id !== undefined,
  });

  // Set initial values if editing an existing post
  useEffect(() => {
    if (id && data) {
      setTitle(data.title);
      setTopic(data.topic);
      setParagraph(data.paragraphs);
      setTags(data.tags);
    }
  }, [data, id]);

  // Handle paragraph content change
  const onChangeparagraph = (id, newValue) => {
    setParagraph((prevState) => {
      const newState = [...prevState];
      const paragraphIndex = newState.findIndex(
        (paragraph) => paragraph.order === id
      );
      newState[paragraphIndex].content = newValue;
      return newState;
    });
  };

  // Delete a tag
  const onDelete = (index) => {
    setTags((prevState) =>
      prevState.filter((_, tagIndex) => tagIndex !== index)
    );
  };

  // Delete a paragraph
  const onDeleteparagraph = (id) => {
    setParagraph((prevState) =>
      prevState.filter((paragraph) => paragraph.order !== id)
    );
  };

  // Validate form fields
  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }

    if (!id && (!photo || !["image/png", "image/jpeg"].includes(photo.type))) {
      setPhoto(null);
      return false;
    }

    for (let i = 0; i < tags.length; i++) {
      if (!tags[i].trim()) {
        return false;
      }
    }

    for (let i = 0; i < paragraph.length; i++) {
      if (!paragraph[i].content.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
  };

  // Mutation for creating a new post
  const createPostMutation = useMutation(createPost, {
    onError: () => {
      setNotification(false, "Something went wrong.");
      setLoading(false);
    },
    onSuccess: (data) => {
      setNotification(true, "Post Created Successfully");
      router.replace(
        `/discussions/post/${data[0].post.title}?postId=${data[0].post.id}`
      );
    },
  });

  // Mutation for updating an existing post
  const updatePostMutation = useMutation(updatePost, {
    onError: () => {
      setNotification(false, "Something went wrong.");
      setLoading(false);
    },
    onSuccess: (data) => {
      setNotification(true, "Post Updated Successfully");
      router.replace(
        `/discussions/post/${data[0].post.title}?postId=${data[0].post.id}`
      );
    },
  });

  // Submit the form
  const onSubmit = async () => {
    setLoading(true);
    let photoData = null;
    if (photo) {
      photoData = new FormData();
      photoData.append("file", photo);
      photoData.append("upload_preset", "vua0iayr");
    }

    const totalWordCount = paragraph.reduce((count, para) => {
      const words = para.content.split(" ");
      return count + words.length;
    }, 0);

    const reqData = {
      post: {
        title,
        topic,
        tags: [...tags],
        readtime: Math.ceil(totalWordCount / 200),
        user_id: currentUser.uid,
      },
    };

    const paraData = {
      paragraph,
    };
    try {
      if (id) {
        reqData.post["id"] = id;
        updatePostMutation.mutate({ photoData, reqData, paraData });
      } else {
        createPostMutation.mutate({ photoData, reqData, paraData });
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <section className="section" aria-label="feature" id="featured">
      <div className="container">
        <Link href="#" className="btn-link link:hover" onClick={router.back}>
          <ArrowBack />
          <span className="span">Go back</span>
        </Link>
        <div className="jobDescription" style={{ gap: "1rem" }}>
          <h3>Create a post</h3>
          <InputField
            type="text"
            labelName={"Post Title"}
            fieldValue={title}
            setFieldValue={setTitle}
            placeholder="Helpful Tips for Working from Home as a Freelancer"
            isValid={isValid}
            error={"Can't be empty"}
          />
          <InputFieldFile
            labelName={"Image to support the post"}
            fieldValue={photo}
            setFieldValue={setPhoto}
            isValid={isValid}
            error={id ? "Only Images are supported" : "Can't be empty"}
          />
          <label>Post Tags</label>
          <div className="modal-columns">
            {tags.map((tag, index) => {
              return (
                <div className="modal-column" key={index}>
                  <div className="input-container">
                    <input
                      onChange={(e) =>
                        setTags((state) => {
                          const newState = [...state];
                          newState[index] = e.target.value;
                          return newState;
                        })
                      }
                      type="text"
                      value={tag}
                      style={{ marginBottom: "0" }}
                      className={!isValid && !tag.trim() ? "red-border" : ""}
                    />
                    {!isValid && !tag.trim() ? (
                      <span className="cant-be-empty-span text-L">
                        {" "}
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
                      onDelete(index);
                    }}
                  />
                </div>
              );
            })}
          </div>

          {tags.length < 3 && (
            <button
              onClick={() => {
                setTags((state) => [...state, ""]);
              }}
              style={{ marginInline: "auto" }}
              className="btn-light"
            >
              {tags.length === 0 ? "Create a tag" : "+ Add New Tag"}
            </button>
          )}
          <label htmlFor="task-name-input">Post paragraph</label>
          <div className="description-container">
            {paragraph.map((paragraph, index) => {
              return (
                <div className="modal-column" key={index}>
                  <div className="input-container">
                    <textarea
                      value={paragraph.content}
                      style={{ height: "100px", marginBottom: "0" }}
                      onChange={(e) => {
                        onChangeparagraph(paragraph.order, e.target.value);
                      }}
                      id="task-description-input"
                      placeholder="e.g. It's always good to take a break. 
                      This 15 minute break will recharge the batteries a little."
                    />
                    {!isValid && !paragraph.content.trim() ? (
                      <span className="cant-be-empty-span text-L">
                        {" "}
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
                      onDeleteparagraph(paragraph.order);
                    }}
                  />
                </div>
              );
            })}
            <button
              onClick={() => {
                setParagraph((state) => [
                  ...state,
                  { content: "", order: state[state.length - 1].order + 1 },
                ]);
              }}
              style={{ marginInline: "auto" }}
              className="btn-light"
            >
              {paragraph.length === 0
                ? "Create a paragraph"
                : "+ Add New Paragraph"}
            </button>
          </div>
          <InputFieldSelect
            labelName="Choose a topic for the post"
            fieldValue={topic}
            setFieldValue={setTopic}
            optionsValue={null}
          />
          <Button
            validate={validate}
            onSubmit={onSubmit}
            label={id ? "Update" : "Create a post"}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
}

export default AuthRoute(CreatePosts);
