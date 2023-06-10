"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import DynamicSectionFields from "./DynamicSectionFields";
import { Button } from "@/utils/formFields";
import { useMutation, useQuery } from "@tanstack/react-query";
import AuthRoute from "@/contexts/AuthRoute";
import { getProposal, updateProposal, createProposal } from "@/utils/api";
import { useAuth } from "@/contexts/authContexts";

function CreateProposal({ params: { gigId }, searchParams: { sectionId } }) {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [sections, setSections] = useState([
    {
      id: uuidv4(),
      header: "",
      description: "",
      bullets: [""],
    },
  ]);

  const { currentUser, setNotification } = useAuth();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["sectionDetails", sectionId],
    queryFn: getProposal,
    enabled: sectionId !== undefined,
  });

  useEffect(() => {
    // Update sections when sectionId is present
    if (sectionId && data) {
      setSections(data.proporsal_sections);
    }
  }, [data, sectionId]);

  const createProposalMutation = useMutation({
    mutationFn: createProposal,
    onError: () => {
      setNotification(false, "Something went wrong.");
      setLoading(false);
    },
    onSuccess: (data) => {
      setNotification(true, "Proposal Created Successfully");
      router.replace(`/gigs/details/${gigId}`);
    },
  });

  const updateProposalMutation = useMutation({
    mutationFn: updateProposal,
    onError: () => {
      setNotification(false, "Something went wrong.");
      setLoading(false);
    },
    onSuccess: (data) => {
      setNotification(true, "Proposal Updated Successfully");
      router.replace(`/gigs/details/${gigId}`);
    },
  });

  const validate = () => {
    setIsValid(false);
    if (!sections.length) return false;
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

  const onSubmit = async () => {
    setLoading(true);
    const reqData = {
      proposal: {
        user_id: currentUser.uid,
        gig_id: gigId,
      },
    };
    const sectionData = {
      proposal_section: sections,
    };

    try {
      if (sectionId) {
        sectionData["proporsal_id"] = sectionId;
        updateProposalMutation.mutate({ sectionData, sectionId });
      } else {
        createProposalMutation.mutate({ reqData, sectionData });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <section className="section" aria-label="feature" id="featured">
      <div className="container">
        <div
          className="jobDescription"
          style={{
            gap: "1rem",
          }}
        >
          <h3>Create a proposal</h3>
          <DynamicSectionFields
            setSections={setSections}
            sections={sections}
            isValid={isValid}
          />
          <Button
            validate={validate}
            onSubmit={onSubmit}
            label={sectionId ? "Update" : "Submit"}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
}

export default AuthRoute(CreateProposal);
