"use client";

import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaSearch,
  FaCopy,
  FaRocket,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Create an Account",
    description:
      "Sign up and join our AI Prompt Marketplace in just a few clicks.",
  },
  {
    icon: <FaSearch />,
    title: "Explore Prompts",
    description:
      "Browse thousands of AI prompts across multiple categories.",
  },
  {
    icon: <FaCopy />,
    title: "Copy & Save",
    description:
      "Bookmark your favorite prompts and copy them instantly.",
  },
  {
    icon: <FaRocket />,
    title: "Share & Grow",
    description:
      "Publish your own prompts and grow as a creator.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-[#FDF7F2]">

      <div className="container mx-auto w-[80%]">

        <div className="text-center mb-16">

          <span className="bg-[#F5E4D6] text-[#C86B43] px-4 py-2 rounded-full font-semibold">
            🚀 How It Works
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#3D2C24]">
            Get Started in Four Simple Steps
          </h2>

          <p className="mt-4 text-[#6F5B50] max-w-2xl mx-auto">
            Start exploring, saving and sharing powerful AI prompts in minutes.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * .15 }}
              className="bg-white rounded-3xl p-8 shadow-md text-center"
            >

              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FDF2E8] flex items-center justify-center text-3xl text-[#C86B43]">

                {step.icon}

              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#3D2C24]">

                {step.title}

              </h3>

              <p className="mt-4 text-[#6F5B50] leading-7">

                {step.description}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;