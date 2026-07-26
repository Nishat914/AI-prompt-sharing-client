"use client";

import { authClient } from "@/lib/auth-client";
import { Card, Button, Chip } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const SavedPromptsPage = () => {
    const { data: session } = authClient.useSession();

    const [savedPrompts, setSavedPrompts] = useState([]);

    useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/saved-prompts/${session.user.email}`
    )
        .then((res) => res.json())
        .then((data) => setSavedPrompts(data));
    }, [session]);

    const removeBookmark = async (id) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks/${id}/${session.user.email}`,
            {
            method: "DELETE",
            }
        );

        if (res.ok) {
            setSavedPrompts((prev) =>
            prev.filter((item) => item._id !== id)
            );

            toast.success("Bookmark removed");
        }
        };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#3D2C24]">
            Saved Prompts
          </h1>

          <p className="text-mauve-500 mt-3">
            Access all your bookmarked prompts in one place.
          </p>
        </div>

        {savedPrompts.length === 0 ? (
          <Card className="p-12 text-center">
            <FaRegBookmark className="mx-auto text-6xl text-gray-400 mb-5" />

            <h2 className="text-2xl font-bold">
              No Saved Prompts
            </h2>

            <p className="text-gray-500 mt-3">
              Bookmark prompts to see them here.
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedPrompts.map((prompt) => (
              <Card
                key={prompt._id}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={prompt.image}
                  alt={prompt.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5 space-y-4">
                  <div className="flex gap-2">
                    <Chip color="secondary">
                      {prompt.category}
                    </Chip>

                    <Chip color="success">
                      {prompt.aiTool}
                    </Chip>
                  </div>

                  <h2 className="text-xl font-bold">
                    {prompt.title}
                  </h2>

                  <p className="text-sm text-gray-500 line-clamp-3">
                    {prompt.description}
                  </p>

                  <div className="flex justify-between items-center pt-2">
                    <Link href={`/prompt-details/${prompt._id}`}>
                      <Button
                        color="primary"
                        variant="flat"
                      >
                        View Details
                      </Button>
                    </Link>

                    <Button
                      color="danger"
                      variant="flat"
                      onPress={() => removeBookmark(prompt._id)}
                    >
                      <FaBookmark className="mr-2" />
                      Remove
                    </Button>
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

export default SavedPromptsPage;