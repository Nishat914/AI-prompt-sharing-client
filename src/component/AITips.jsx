"use client";

import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaBullseye,
  FaComments,
  FaRedo,
} from "react-icons/fa";

const tips = [
  {
    icon: <FaBullseye />,
    title: "Be Specific",
    description:
      "Clearly explain what you want so the AI can generate accurate results.",
  },
  {
    icon: <FaComments />,
    title: "Provide Context",
    description:
      "Adding context helps AI better understand your request.",
  },
  {
    icon: <FaLightbulb />,
    title: "Define Output",
    description:
      "Mention whether you need code, a list, a table or an article.",
  },
  {
    icon: <FaRedo />,
    title: "Refine Prompts",
    description:
      "Improve your prompts step by step to get even better responses.",
  },
];

const AITips = () => {
  return (
    <section className="py-24 bg-[#EFE4D7]">

      <div className="container mx-auto w-[80%]">

        <div className="text-center mb-16">

          <span className="bg-[#F5E4D6] text-[#C86B43] px-4 py-2 rounded-full font-semibold">
            💡 AI Prompt Tips
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#3D2C24]">
            Write Better Prompts
          </h2>

          <p className="mt-4 text-[#6F5B50] max-w-2xl mx-auto">
            Follow these simple tips to generate more accurate and useful AI responses.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {tips.map((tip, index) => (

            <motion.div
              key={index}
              whileHover={{
                scale: 1.04,
                y: -8,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * .15 }}
              className="bg-white rounded-3xl p-8 shadow-md"
            >

              <div className="w-16 h-16 rounded-2xl bg-[#FDF2E8] flex items-center justify-center text-3xl text-[#C86B43]">

                {tip.icon}

              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#3D2C24]">

                {tip.title}

              </h3>

              <p className="mt-4 text-[#6F5B50] leading-7">

                {tip.description}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default AITips;