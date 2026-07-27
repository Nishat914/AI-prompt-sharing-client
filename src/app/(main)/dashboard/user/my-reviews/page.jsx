"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Card, Chip } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar, FaRegEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const MyReviewPage = () => {
  const { data: session } = authClient.useSession();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-reviews/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => setReviews(data));

  }, [session]);

  const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

  return (
    <div className="min-h-screen px-4 py-10">

      <div className="max-w-6xl mx-auto">

        <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center"
            >
              <h1 className="text-4xl font-bold text-[#3D2C24]">
                My Reviews
              </h1>

              <p className="text-gray-500 mt-3">
                Manage all the reviews you've submitted.
              </p>
        </motion.div>

        {reviews.length === 0 ? (
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-semibold">
              No Reviews Yet
            </h2>

            <p className="text-gray-500 mt-3">
              You haven't reviewed any prompts yet.
            </p>
          </Card>
        ) : (
          <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >

            {reviews.map((review) => (
              <motion.div
                  key={review._id}
                  variants={cardVariants}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* User Image */}
                      <div className="md:w-48 shrink-0">
                        <img
                          src={review.userImage}
                          alt={review.userName}
                          className="w-full h-40 object-cover rounded-xl shadow-sm"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                          <div>
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                              {review.userName}
                            </h2>
                            <p className="text-sm text-gray-400 mt-0.5">
                              {new Date(review.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>

                          <Chip
                            color="warning"
                            variant="flat"
                            className="font-medium px-3 py-1 shrink-0"
                          >
                            ⭐ {review.rating}.0 / 5
                          </Chip>
                        </div>

                        {/* Comment */}
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                          {review.comment}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                          <Link href={`/prompt-details/${review.promptId}`}>
                            <Button
                              className="bg-[#6F5B50] hover:bg-[#5d4a40] text-white font-medium px-6"
                              size="sm"
                            >
                              View Prompt
                            </Button>
                          </Link>

                          <Button
                            color="warning"
                            variant="flat"
                            size="sm"
                            className="font-medium"
                          >
                            <FaRegEdit className="mr-1.5" />
                            Edit
                          </Button>

                          <Button
                            color="danger"
                            variant="flat"
                            size="sm"
                            className="font-medium"
                          >
                            <FaTrash className="mr-1.5" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
              </motion.div>
            ))}

          </motion.div>
        )}

      </div>

    </div>
  );
};

export default MyReviewPage;