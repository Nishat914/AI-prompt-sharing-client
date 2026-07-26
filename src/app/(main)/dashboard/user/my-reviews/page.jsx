"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Card, Chip } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar, FaRegEdit, FaTrash } from "react-icons/fa";

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

  return (
    <div className="min-h-screen px-4 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#3D2C24]">
            My Reviews
          </h1>

          <p className="text-gray-500 mt-3">
            Manage all the reviews you've submitted.
          </p>
        </div>

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
          <div className="space-y-6">

            {reviews.map((review) => (
              <Card
                key={review._id}
                className="p-6"
              >
                <div className="flex flex-col md:flex-row gap-6">

                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-full md:w-56 h-40 object-cover rounded-xl"
                  />

                  <div className="flex-1">

                    <div className="flex justify-between items-start">

                      <div>
                        <h2 className="text-2xl font-bold">
                          {review.userName}
                        </h2>

                        <p className="text-gray-500 mt-1">
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <Chip
                        color="warning"
                        variant="flat"
                      >
                        ⭐ {review.rating}/5
                      </Chip>

                    </div>

                    <p className="leading-8 mt-5">
                      {review.comment}
                    </p>

                    <div className="flex gap-3 mt-6">

                      <Link
                        href={`/prompt-details/${review.promptId}`}
                      >
                        <Button className="bg-[#6F5B50]">
                          View Prompt
                        </Button>
                      </Link>

                      <Button
                        color="warning"
                        variant="flat"
                      >
                        <FaRegEdit />
                        Edit
                      </Button>

                      <Button
                        color="danger"
                        variant="flat"
                      >
                        <FaTrash />
                        Delete
                      </Button>

                    </div>

                  </div>

                </div>
              </Card>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default MyReviewPage;