"use client";

import { Avatar, Card } from "@heroui/react";
import { FaStar } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";

const ReviewList = ({ reviews }) => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-[#3D2C24] mb-6">
        Reviews & Ratings
      </h2>

      {reviews.length === 0 ? (
        <Card className="p-10 text-center">
          <MdOutlineReviews
            size={55}
            className="mx-auto text-gray-400 mb-4"
          />

          <h3 className="text-xl font-semibold">
            No Reviews Yet
          </h3>

          <p className="text-gray-500 mt-2">
            Be the first to review this prompt.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card
              key={review._id}
              className="p-6 shadow-md"
            >
              <div className="flex justify-between items-start">

                <div className="flex gap-4">

                  <Avatar
                    src={review.userImage}
                    name={review.userName}
                    size="lg"
                  />

                  <div>
                    <h3 className="font-bold">
                      {review.userName}
                    </h3>

                    {/* <p className="text-sm text-gray-500">
                      {review.userEmail}
                    </p> */}

                    <p className="text-xs text-gray-400">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                </div>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

              </div>

              <div className="border-t mt-5 pt-5">
                <p className="leading-8">
                  {review.comment}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;