"use client";
// Import dependencies
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/authContexts";
import AuthRoute from "@/contexts/AuthRoute";
import { createGig, updateGig, getGig } from "@/utils/api";
import { ArrowBack } from "../../utils/Icons";
import DynamicSectionFields from "./DynamicSectionFields";
import { InputField, Button, InputFieldSelect } from "@/utils/formFields";
import { useRouter } from "next/navigation";

function CreateGig({ searchParams: { id } }) {
  // State variables
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [category, setCategory] = useState("Web Development");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [numberOfFreelancers, setNumberOfFreelancers] = useState(1);
  const [overview, setOverview] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [paymentPer, setPaymentPer] = useState("Hour");
  const [sections, setSections] = useState([
    {
      id: uuidv4(),
      header: "",
      description: "",
      bullets: [""],
    },
  ]);

  // Fetch authenticated user
  const { currentUser, setNotification, currentUserDetails } = useAuth();
  const router = useRouter();

  // Fetch gig details if id is provided
  const { data } = useQuery({
    queryKey: ["gigDetails", id],
    queryFn: getGig,
    enabled: id !== undefined,
  });

  // Set state variables with gig details
  useEffect(() => {
    if (id && data) {
      setTitle(data.title);
      setPrice(data.payment_amount);
      setNumberOfFreelancers(data.no_of_freelancers);
      setOverview(data.overview);
      setDuration(data.duration);
      setLocation(data.location);
      setPaymentPer(data.payment_per);
      setSections(data.sections);
    }
  }, [data, id]);

  // Create gig mutation
  const createGigMutation = useMutation({
    mutationFn: createGig,
    onError: () => {
      setNotification(false, "Something went wrong.");
      setLoading(false);
    },
    onSuccess: (data) => {
      setNotification(true, "Gig Created Successfully");
      router.push(`/gigs/details/${data[0].gig.id}`);
    },
  });

  // Update gig mutation
  const updateGigMutation = useMutation({
    mutationFn: updateGig,
    onError: () => {
      setNotification(false, "Something went wrong.");
      setLoading(false);
    },
    onSuccess: (data) => {
      setNotification(true, "Gig Updated Successfully");
      router.push(`/gigs/details/${data[0].gig.id}`);
    },
  });

  // Form validation
  const validate = () => {
    setIsValid(false);
    if (
      !title.trim() ||
      price <= 0 ||
      price > currentUserDetails.revenue ||
      !overview.trim() ||
      !location.trim() ||
      !duration.trim() ||
      !paymentPer.trim() ||
      !category.trim()
    ) {
      return false;
    }

    for (let i = 0; i < sections.length; i++) {
      if (!sections[i].header.trim() || !sections[i].description.trim()) {
        return false;
      }
      for (let j = 0; j < sections[i]["bullets"].length; j++) {
        if (!sections[i]["bullets"][j].trim()) {
          return false;
        }
      }
    }

    setIsValid(true);
    return true;
  };

  // Form submission
  const onSubmit = async () => {
    setLoading(true);
    const reqData = {
      gig: {
        title,
        overview,
        duration,
        location,
        category,
        payment_amount: price,
        no_of_freelancers: numberOfFreelancers,
        payment_per: paymentPer,
        user_id: currentUser.uid,
      },
    };

    const sectionData = {
      section: sections,
    };

    try {
      if (id) {
        reqData.gig["id"] = id;
        updateGigMutation.mutate({ reqData, sectionData });
      } else {
        createGigMutation.mutate({ reqData, sectionData });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <section className="section" aria-label="feature" id="featured">
      <div className="container">
        {/* Go back link */}
        <Link
          href="/gigs?page=1&filter=All"
          className="btn-link link:hover"
          // onClick={() => router.replace("/gigs?page=1&filter=All")}
        >
          <ArrowBack />
          <span className="span">Go back</span>
        </Link>

        <div
          className="jobDescription"
          style={{
            gap: "1rem",
          }}
        >
          <h3>Create a gig</h3>

          {/* Gig Title */}
          <InputField
            type="text"
            labelName={"Gig Title"}
            fieldValue={title}
            setFieldValue={setTitle}
            placeholder="Midlevel Back End Engineer"
            isValid={isValid}
            error={"Can't be empty"}
          />

          {/* Gig Location */}
          <InputField
            type="text"
            labelName={"Gig Location"}
            fieldValue={location}
            setFieldValue={setLocation}
            placeholder="Remote"
            isValid={isValid}
            error={"Can't be empty"}
          />

          {/* Gig Payment Amount */}
          <InputField
            type="number"
            max={currentUserDetails.revenue}
            labelName={"Gig Payment Amount"}
            fieldValue={price}
            setFieldValue={setPrice}
            isValid={isValid}
            error={"Amount exceed your revenue"}
          />

          {/* Payment Per */}
          <InputFieldSelect
            labelName="Choose the type of payment you preferred"
            fieldValue={paymentPer}
            setFieldValue={setPaymentPer}
            optionsValue={["Hour", "Gig"]}
          />

          {/* Gig Category */}
          <InputFieldSelect
            labelName="Choose the IT field your gig is"
            fieldValue={category}
            setFieldValue={setCategory}
            optionsValue={null}
          />

          {/* Gig Duration */}
          <InputField
            type="text"
            labelName={"Gig Duration"}
            fieldValue={duration}
            setFieldValue={setDuration}
            placeholder="1 week"
            isValid={isValid}
            error={"Can't be empty"}
          />

          {/* Gig Overview Description */}
          <label htmlFor="gig-overview">Gig Overview Description</label>
          <div className="input-container">
            <textarea
              value={overview}
              style={{ height: "100px" }}
              onChange={(e) => setOverview(e.target.value)}
              id="gig-overview"
              placeholder="e.g. It's always good to take a break. 
                      This 15 minute break will  recharge the batteries a little."
            />
            {!isValid && !overview.trim() && (
              <span className="cant-be-empty-span text-L">
                {" "}
                Can&apos;t be empty
              </span>
            )}
          </div>

          {/* Number Of Freelancers Required */}
          <InputField
            type="number"
            labelName={"Number Of Freelancers Required"}
            fieldValue={numberOfFreelancers}
            setFieldValue={setNumberOfFreelancers}
            isValid={isValid}
            error={"Value can't be negative"}
          />

          <h3>Section Details</h3>

          {/* Dynamic Section Fields */}
          <DynamicSectionFields
            setSections={setSections}
            sections={sections}
            isValid={isValid}
          />

          {/* Submit button */}
          <Button
            validate={validate}
            onSubmit={onSubmit}
            label={id ? "Update" : "Create a gig"}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
}

export default AuthRoute(CreateGig);
