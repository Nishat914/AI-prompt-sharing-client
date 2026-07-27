
import PromptActions from "@/component/PromptActions";
import ReviewList from "@/component/ReviewList";
import { auth } from "@/lib/auth";
import { Button, Card, Chip } from "@heroui/react";
import { headers } from "next/headers";

import Link from "next/link";
import { BsBookmarkFill, BsBookmarksFill } from "react-icons/bs";
import {
  FaBookmark,
  FaCopy,
  FaFlag,
  FaLock,
  FaRobot,
  FaStar,
} from "react-icons/fa";
import { MdOutlineReviews, MdReport } from "react-icons/md";

export const metadata = {
  title: "Prompt Details",
};

const PromptDetailsPage = async ({ params }) => {
  const { id } = await params;
 
  const session = await auth.api.getSession({
    headers: await headers(),
  });
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/prompts/${id}` );

      const prompt = await res.json();
      // console.log(session.user.plan)
      console.log(prompt.visibility)
      const isPremiumLocked =
      prompt.visibility === "Private" &&
      session?.user?.plan === "free" ;
        console.log(isPremiumLocked)

    const reviewRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/${id}`
    );

    const reviews = await reviewRes.json();
    
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Prompt Details */}

        <Card className="bg-linear-to-r from-[#f4ebe3]  to-[#e6c3b1] shadow-2xl overflow-hidden">

          <img
            src={prompt.image}
            alt={prompt.title}
            className="w-full h-105 object-cover"
          />

          <div className="p-8 space-y-7">

            <div className="flex flex-wrap gap-3">

              <Chip color="secondary">
                {prompt.category}
              </Chip>

              <Chip color="warning">
                {prompt.difficulty}
              </Chip>

              <Chip color="success">
                {prompt.aiTool}
              </Chip>

              <Chip
                color={
                  prompt.visibility === "public"
                    ? "primary"
                    : "danger"
                }
              >
                {prompt.visibility}
              </Chip>

            </div>

            <div>

              <h1 className="text-4xl font-bold text-[#3D2C24]">
                {prompt.title}
              </h1>

              <p className="text-mauve-500 mt-5 leading-8 text-lg">
                {prompt.description}
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Prompt Content
                </h2>

                {isPremiumLocked ? (
                    <div className="relative overflow-hidden rounded-xl border min-h-70 sm:min-h-87.5">
                    {/* Blurred Content */}
                    <div className="blur-md select-none pointer-events-none opacity-60 p-4">
                        <p className="leading-8 whitespace-pre-wrap">
                        {prompt.content}
                        </p>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[2px]">
                        <div className="flex flex-col items-center text-center px-6 max-w-md">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4">
                            <FaLock
                            size={28}
                            className="text-[#3D2C24]"
                            />
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                            Premium Prompt
                        </h3>

                        <p className="text-sm sm:text-base text-default-500 mb-6">
                            This prompt is available only for Premium members.
                            Upgrade your account to unlock full access.
                        </p>

                        <Button
                            
                            
                            size="lg"
                            className="w-full sm:w-auto px-8 font-semibold bg-[#6F5B50]"
                        ><Link href="/payment">
                        Subscribe to Premium
                        </Link>
                            
                        </Button>
                        </div>
                    </div>
                    </div>
                ) : (
                    <p className="leading-8 whitespace-pre-wrap text-default-700">
                    {prompt.content}
                    </p>
                )}
            </Card>

              <Card className="p-5">

                <h2 className="font-bold text-xl mb-3">
                  Usage Instructions
                </h2>

                <p className="leading-8 whitespace-pre-wrap">
                  {prompt.usageInstructions}
                </p>

              </Card>

            </div>
            {/* bookmark,copy,review,report */}
            <PromptActions
              prompt={prompt}
              session={session}
              isPremiumLocked={isPremiumLocked}
            />
                        {/* Creator & Statistics */}

            <div className="grid md:grid-cols-3 gap-6">

              <Card className="p-5">

                <h2 className="text-xl font-bold mb-5">
                  Creator Information
                </h2>

                <div className="space-y-3">

                  <p>
                    <span className="font-semibold">
                      Name :
                    </span>{" "}
                    {prompt.creatorName}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Email :
                    </span>{" "}
                    {prompt.creatorEmail}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Posted :
                    </span>{" "}
                    {new Date(prompt.createdAt).toLocaleDateString()}
                  </p>

                </div>

              </Card>

              <Card className="p-5">

                <h2 className="text-xl font-bold mb-5">
                  Prompt Statistics
                </h2>

                <div className="space-y-3">

                  <p>
                    <span className="font-semibold">
                      Copy Count :
                    </span>{" "}
                    {prompt.copyCount}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Visibility :
                    </span>{" "}
                    {prompt.visibility}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Difficulty :
                    </span>{" "}
                    {prompt.difficulty}
                  </p>

                </div>

              </Card>

              <Card className="p-5">

                <h2 className="text-xl font-bold mb-5">
                  AI Information
                </h2>

                <div className="flex items-center gap-3">

                  <FaRobot
                    size={35}
                    className="text-mauve-500"
                  />

                  <div>

                    <h3 className="font-bold">
                      {prompt.aiTool}
                    </h3>

                    <p className="text-sm text-gray-500">
                      AI Tool
                    </p>

                  </div>

                </div>

              </Card>

            </div>

            {/* Tags */}

            <Card className="p-5">

              <h2 className="text-2xl font-bold mb-5">
                Tags
              </h2>

              <div className="flex flex-wrap gap-3">

                {prompt.tags?.split(",").map((tag, index) => (
                  <Chip
                    key={index}
                    color="secondary"
                    variant="flat"
                  >
                    {tag.trim()}
                  </Chip>
                ))}

              </div>

            </Card>

          </div>
        </Card>

        {/* Reviews */}

        <Card className="bg-linear-to-r from-[#f4ebe3]  to-[#e6c3b1]">

          <ReviewList reviews={reviews} />

        </Card>

      </div>
    </div>
  );
}

export default PromptDetailsPage;