"use client";

import { motion } from "framer-motion";
import { FaFileAlt, FaCopy } from "react-icons/fa";

const TopCreators = ({ creators }) => {
  return (
    <section className="py-20 bg-[#FDF7F2]">

      <div className="container mx-auto w-[80%]">

        {/* Heading */}

        <div className="text-center mb-14">

          <span className="inline-block rounded-full bg-[#F5E4D6] px-4 py-2 text-[#C86B43] font-semibold">
            🌟 Top Creators
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#3D2C24]">
            Meet Our Top Prompt Creators
          </h2>

          <p className="mt-4 text-[#6F5B50] max-w-2xl mx-auto">
            Discover talented creators who consistently share
            high-quality AI prompts with the community.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {creators.map((creator, index) => (

            <motion.div
              key={creator._id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * .15,
              }}
              whileHover={{
                y: -8,
              }}
              className="bg-white rounded-3xl shadow-md p-8 text-center"
            >

              <img
  src={
    creator.creatorImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      creator.creatorName
    )}&background=C86B43&color=fff`
  }
  alt={creator.creatorName}
  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-[#F5E4D6]"
/>

              <h3 className="mt-5 text-2xl font-bold text-[#3D2C24]">

                {creator.creatorName}

              </h3>

              <p className="text-sm text-[#6F5B50] mt-1">

                {creator.creatorEmail}

              </p>

              <div className="flex justify-center gap-6 mt-6">

                <div>

                  <FaFileAlt className="mx-auto text-[#C86B43]" />

                  <p className="font-bold mt-2">

                    {creator.totalPrompts}

                  </p>

                  <span className="text-xs text-gray-500">
                    Prompts
                  </span>

                </div>

                <div>

                  <FaCopy className="mx-auto text-[#C86B43]" />

                  <p className="font-bold mt-2">

                    {creator.totalCopies}

                  </p>

                  <span className="text-xs text-gray-500">
                    Copies
                  </span>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default TopCreators;