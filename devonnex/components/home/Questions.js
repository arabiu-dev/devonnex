"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChevronDown } from "../../utils/Icons";

const QA = [
  [
    "What services does your freelance company provide?",
    "Our freelance company offers a wide range of services across various industries. We specialize in web development, graphic design, content writing, digital marketing, social media management, and virtual assistance. Our talented pool of freelancers ensures that we can cater to diverse client needs.",
  ],
  [
    "How do you ensure the quality of freelancers on your platform?",
    "We take the quality of our freelancers seriously. Each freelancer undergoes a rigorous screening process before being accepted onto our platform. We review their skills, experience, portfolio, and conduct interviews to ensure their expertise matches our standards. Additionally, we encourage clients to provide feedback and ratings after completing projects, which helps maintain accountability and quality.",
  ],
  [
    "What payment methods are accepted for freelancer services?",
    "We accept various payment methods to provide convenience and flexibility to our clients. You can pay freelancers using major credit cards, PayPal, or other secure online payment gateways. We also provide an escrow service for larger projects, ensuring that payments are securely held until the project is completed to your satisfaction.",
  ],
  [
    "Can I work with freelancers outside of my country?",
    "Absolutely! Our platform connects clients with freelancers from around the world. Whether you prefer working with freelancers locally or internationally, you have the freedom to choose based on your project requirements. Embracing a global talent pool allows us to provide you with a diverse range of skills and expertise.",
  ],
  [
    "What if I'm not satisfied with the freelancer's work?",
    "We strive to ensure client satisfaction. If you are not completely satisfied with a freelancer's work, we encourage you to communicate your concerns directly with the freelancer. Often, open dialogue can resolve any issues. In case of persistent dissatisfaction, our support team is here to assist you and mediate a solution. We aim to maintain a positive working relationship between clients and freelancers.",
  ],
];

function Questions() {
  const [accordion, setAccordion] = useState("");
  return (
    <section className="section qna" aria-label="question and answer">
      <div className="container">
        <h2 className="headline-md section-title text-center">Q&A</h2>

        <p className="section-text body-md text-center">
          Get answers to common questions about our freelance services, from
          hiring freelancers to payment methods. Need more assistance? Contact
          our support team.
        </p>

        <ul className="qna-list">
          {QA.map((q, index) => (
            <li className="qna-item" key={uuidv4()}>
              <div
                className={`qna-card ${accordion === index ? "active" : ""}`}
                data-accordion
              >
                <button
                  className="qna-btn"
                  onClick={() => setAccordion(accordion === index ? "" : index)}
                  data-accordion-btn
                >
                  <h3 className="title-sm">{q[0]}</h3>

                  <ChevronDown />
                </button>

                <div className="qna-content">
                  <p className="body-md">{q[1]}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Questions;
