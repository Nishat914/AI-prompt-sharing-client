"use client";

import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const CustomerReviews = ({ reviews }) => {
  return (
    <section className="py-20 bg-[#EFE4D7]">

      <div className="container mx-auto w-[80%]">

        {/* Heading */}

        <div className="text-center mb-14">

          <span className="inline-block rounded-full bg-[#F5E4D6] px-4 py-2 text-[#C86B43] font-semibold">
            💬 Customer Reviews
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#3D2C24]">
            What Our Users Say
          </h2>

          <p className="mt-4 text-[#6F5B50] max-w-2xl mx-auto">
            Read genuine feedback from creators and users who use our AI Prompt Marketplace.
          </p>

        </div>

        {/* Reviews */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {reviews.map((review, index) => (

            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="bg-white rounded-3xl shadow-md p-8"
            >

              <FaQuoteLeft className="text-3xl text-[#C86B43]" />

              <p className="mt-6 text-[#6F5B50] leading-7 line-clamp-4">
                "{review.comment}"
              </p>

              {/* Rating */}

              <div className="flex mt-6 text-yellow-500">

                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}

              </div>

              {/* User */}

              <div className="mt-6">

                <h3 className="font-bold text-lg text-[#3D2C24]">
                  {review.userName}
                </h3>

                <p className="text-sm text-[#6F5B50]">
                  {review.userEmail}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default CustomerReviews;