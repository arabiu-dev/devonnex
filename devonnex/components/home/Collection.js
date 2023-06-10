"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowBack, ArrowForward } from "../../utils/Icons";

const data = [
  ["project-1_og57fa", "Web Development", "38"],
  ["project-4_x9xvcm", "Mobile App Development", "18"],
  ["project-7_bscngj", "Data Science", "48"],
  ["project-6_f65txj", "Cybersecurity", "12"],
  ["project-5_qdb9b4", "Cloud Computing", "38"],
  ["project-3_ki6k8n", "UI/UX Design", "76"],
  ["project-2_zchefq", "IT Project Management", "18"],
  ["project-8_ghfk9n", "Database Administration", "48"],
  ["project-9_pbpj9u", "IT Support and Helpdesk", "12"],
];

function Collection() {
  const [totalSlidableItems, setTtotalSlidableItems] = useState(1);
  const sliderContainer = useRef(null);
  const moveSliderItem = useRef(null);
  let currentSlidePos = 0;

  moveSliderItem.current = () => {
    sliderContainer.current.style.transform = `translateX(-${sliderContainer.current.children[currentSlidePos].offsetLeft}px)`;
  };

  useLayoutEffect(() => {
    const updateItems = () => {
      setTtotalSlidableItems(
        sliderContainer.current?.childElementCount -
          (window.matchMedia("(min-width: 576px)").matches ? 3 : 1)
      );
      moveSliderItem.current();
    };
    window.addEventListener("resize", updateItems);
    updateItems();
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const slideNext = () => {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem.current();
  };

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem.current();
  };
  return (
    <section
      className="section top-collection"
      aria-labelledby="collection-label"
    >
      <div className="container">
        <div className="title-wrapper">
          <h2
            className="headline-md section-title text-center"
            id="collection-label"
          >
            Top Collections
          </h2>

          <a href="#" className="btn-link link:hover">
            <span className="span">See More</span>

            <ArrowForward />
          </a>
        </div>

        <div className="card topic-card">
          <div className="card-content">
            <h2 className="title-md card-title" id="topic-label">
              Hot topics
            </h2>

            <p className="card-text body-md">
              Don&apos;t miss out on the latest news about Travel tips, Hotels
              review, Food guide...
            </p>

            <div className="btn-group">
              <button
                className="btn-icon"
                aria-label="previous"
                data-slider-prev
                onClick={slidePrev}
              >
                <ArrowBack />
              </button>

              <button
                className="btn-icon"
                aria-label="next"
                onClick={slideNext}
                data-slider-next
              >
                <ArrowForward />
              </button>
            </div>
          </div>

          <div className="slider" data-slider>
            <ul
              className="slider-list"
              ref={sliderContainer}
              data-slider-container
              data-testid="slider-container"
            >
              {data.map((field) => (
                <li className="slider-item" key={field[1]}>
                  <Link href="/discussions" className="slider-card">
                    <figure
                      className="slider-banner img-holder"
                      style={{ "--width": "507", "--height": "618" }}
                    >
                      <Image
                        src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_507,h_618/${field[0]}.jpg`}
                        width="507"
                        height="618"
                        loading="lazy"
                        alt="Sport"
                        className="img-cover"
                      />
                    </figure>

                    <div className="slider-content">
                      <span className="slider-title title-md">{field[1]}</span>

                      <p className="slider-subtitle">{field[2]} Discussions</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Collection;
