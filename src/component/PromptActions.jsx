"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { BsBookmarksFill } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import { MdOutlineReviews, MdReport } from "react-icons/md";
import toast from "react-hot-toast";

export default function PromptActions({
  prompt,
  session,
  isPremiumLocked,
}) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks/${prompt._id}/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => setBookmarked(data.bookmarked));
  }, [prompt._id, session]);

  const handleBookmark = async () => {
    if (!session?.user?.email) {
      toast.error("Please login first");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promptId: prompt._id,
          userEmail: session.user.email,
        }),
      }
    );

    const data = await res.json();

    setBookmarked(data.bookmarked);
    toast.success(data.message);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onPress={handleBookmark}
        className={
          bookmarked
            ? "bg-yellow-500 text-white"
            : "bg-[#3D2C24]"
        }
      >
        <BsBookmarksFill />
      </Button>

      <Button
        className="bg-[#3D2C24]"
        isDisabled={isPremiumLocked}
      >
        <FaCopy /> Copy
      </Button>

      <Button
        className="bg-[#3D2C24]"
        isDisabled={isPremiumLocked}
      >
        <MdOutlineReviews /> Review
      </Button>

      <Button className="bg-[#3D2C24]">
        <MdReport /> Report
      </Button>
    </div>
  );
}