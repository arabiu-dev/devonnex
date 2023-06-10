"use client";

import React from "react";
import Ellipses from "@/utils/ellipses";
import { useQuery } from "@tanstack/react-query";
import { fetchUserGigs, checkIfUserExist, fetchUserReviews } from "@/utils/api";
import { CheckmarkDoneOutline, ConstructOutline } from "../../utils/Icons";
import AuthRoute from "@/contexts/AuthRoute";
import { useAuth } from "@/contexts/authContexts";
import ProfileCard from "./ProfileCard";
import ContactList from "./ContactList";
import ProgressItem from "./ProgressItem";
import TaskCard from "./TaskCard";
import Revenue from "./Revenue";
import Bio from "./Bio";
import ProjectCard from "./ProjectCard";
import ReviewCard from "./ReviewCard";
import { BeatLoader } from "react-spinners";

function Profile({ searchParams: { user } }) {
  const { currentUserDetails } = useAuth();

  // Fetch user details
  const userQuery = useQuery({
    queryKey: ["userDetails", user],
    queryFn: () => checkIfUserExist(user),
    enabled: user !== undefined,
  });

  // Fetch user reviews
  const reviewsQuery = useQuery({
    queryKey: ["userReviews", user],
    queryFn: () => fetchUserReviews(user),
    enabled: user !== undefined,
  });

  // Fetch user gigs
  const gigsQuery = useQuery({
    queryKey: ["userGigs", user],
    queryFn: () => fetchUserGigs(userQuery?.data?.id, user),
    enabled: userQuery?.data !== undefined,
  });

  // Return early if gigsQuery.data is not available
  if (!gigsQuery.data)
    return (
      <BeatLoader
        color="#635fc7"
        margin={5}
        loading={true}
        speedMultiplier={1}
        cssOverride={{ textAlign: "center", marginTop: "20vh" }}
      />
    );

  // Destructure data from userQuery.data
  const {
    full_name,
    username,
    phone_number,
    work_email,
    expertise,
    revenue,
    bio,
    image_url,
    rating,
  } = userQuery?.data;

  const isProfileOwner = currentUserDetails.username === username;

  return (
    <>
      <section className="section product" id="product" aria-label="product">
        <div className="container">
          <h2 className="h2 article-title">
            Hi {currentUserDetails.full_name.split(" ")[0]}
          </h2>

          <p className="article-subtitle">Welcome to Dashboard!</p>
          <div className="home">
            <div className="card">
              {isProfileOwner && (
                <Ellipses
                  handlers={[
                    ["Edit", `/gigs/create?id=${""}`],
                    ["Delete", `http://localhost:3030/api/v1/gigs/${""}`],
                  ]}
                />
              )}
              <ProfileCard
                image={image_url}
                fullName={full_name}
                expertise={expertise}
              />
              <ContactList email={work_email} phoneNumber={phone_number} />
              <div className="divider card-divider"></div>
              <ul className="progress-list">
                <ProgressItem
                  title="Project Completion"
                  progress={85}
                  color="--green-cyan"
                />
                <ProgressItem
                  title="Overall Rating"
                  progress={rating * 10}
                  color="--maximum-red"
                />
              </ul>
            </div>

            <div className="profile-wrapper">
              <TaskCard
                icon={<CheckmarkDoneOutline />}
                data={
                  gigsQuery.data &&
                  gigsQuery.data.filter((gig) => gig.offered_to !== null).length
                }
                msg="Tasks Completed"
              />

              <TaskCard
                icon={<ConstructOutline />}
                data={
                  gigsQuery.data &&
                  gigsQuery.data.filter((gig) => gig.offered_to === null).length
                }
                msg="Tasks Inprogress"
              />
            </div>

            <Revenue revenue={revenue} isProfileOwner={isProfileOwner} />
          </div>

          <Bio bio={bio} />

          <ProjectCard data={gigsQuery.data} />

          <ReviewCard
            data={reviewsQuery.data}
            user={currentUserDetails.username === username}
          />
        </div>
      </section>
    </>
  );
}

export default AuthRoute(Profile);
