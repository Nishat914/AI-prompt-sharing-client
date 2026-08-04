"use client";

import { motion } from "framer-motion";
import {
  FaRobot,
  FaRocket,
  FaLock,
  FaUsers,
  FaChartLine,
  FaStar,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI-Optimized Prompts",
    description:
      "Access powerful prompts designed for ChatGPT, Gemini, Claude and other AI tools.",
  },
  {
    icon: <FaRocket />,
    title: "Boost Productivity",
    description:
      "Save time by using ready-made prompts for writing, coding, marketing and more.",
  },
  {
    icon: <FaLock />,
    title: "Premium Content",
    description:
      "Unlock exclusive private prompts with a premium subscription for advanced use cases.",
  },
  {
    icon: <FaUsers />,
    title: "Creator Community",
    description:
      "Share your own prompts, inspire others and grow with an active AI community.",
  },
  {
    icon: <FaChartLine />,
    title: "Prompt Analytics",
    description:
      "Track copies, bookmarks and engagement to understand your prompt performance.",
  },
  {
    icon: <FaStar />,
    title: "Quality Reviewed",
    description:
      "Every prompt is reviewed by admins to ensure quality, relevance and reliability.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-[#EFE4D7]">

      <div className="container mx-auto w-[80%]">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-[#F5E4D6] px-4 py-2 text-[#C86B43] font-semibold">
            ✨ Why Choose Us
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#3D2C24]">
            Empower Your AI Journey
          </h2>

          <p className="mt-4 text-[#6F5B50] max-w-3xl mx-auto">
            Discover a smarter way to create, share and explore AI prompts.
            Our platform helps creators and users boost productivity,
            creativity and collaboration.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .5,
                delay: index * .15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition"
            >

              <div className="w-16 h-16 rounded-2xl bg-[#FDF2E8] flex items-center justify-center text-[#C86B43] text-3xl">

                {feature.icon}

              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#3D2C24]">

                {feature.title}

              </h3>

              <p className="mt-4 text-[#6F5B50] leading-7">

                {feature.description}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;