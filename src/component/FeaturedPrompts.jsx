"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FeaturedPrompts = ({ prompts }) => {
     
  return (
    <section className="py-20 bg-[#FDF7F2]">

      <div className="container mx-auto w-[80%]">

        {/* Heading */}

        <div className="text-center mb-14">

          <span className="inline-block px-4 py-2 rounded-full bg-[#F5E4D6] text-[#C86B43] font-semibold">
            ⭐ Trending Collection
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#3D2C24]">
            Featured AI Prompts
          </h2>

          <p className="mt-3 text-[#6F5B50]">
            Explore the most popular prompts shared by our creators.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {prompts.map((prompt) => (

            <motion.div
              key={prompt._id}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{
                duration: .3,
              }}
              className="bg-white rounded-3xl overflow-hidden shadow-md"
            >

              <img
                src={prompt.image}
                alt={prompt.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between mb-4">

                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">

                    {prompt.aiTool}

                  </span>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                    {prompt.visibility}

                  </span>

                </div>

                <h3 className="text-2xl font-bold text-[#3D2C24] line-clamp-1">

                  {prompt.title}

                </h3>

                <p className="text-[#6F5B50] mt-3 line-clamp-2">

                  {prompt.description}

                </p>

                <div className="flex justify-between mt-5 text-sm">

                  <span className="font-semibold text-[#C86B43]">
                    📋 {prompt.copyCount} Copies
                  </span>

                  <span className="text-[#6F5B50]">
                    {prompt.category}
                  </span>

                </div>
                <Link
                    href={`/prompt-details/${prompt._id}`}
                  >

                    <button className="mt-6 w-full rounded-xl bg-[#C86B43] py-3 text-white font-semibold hover:bg-[#B75A35] transition">

                      View Details

                    </button>

                  </Link>

                

              </div>

            </motion.div>

          ))}

        </div>

        {/* Bottom Button */}

        <div className="text-center mt-14">

          <Link href="/all-prompt">

            <button className="rounded-xl border border-[#C86B43] px-8 py-3 text-[#C86B43] font-semibold hover:bg-[#C86B43] hover:text-white transition">

              Browse All Prompts →

            </button>

          </Link>

        </div>

      </div>

    </section>
  );
};

export default FeaturedPrompts;