"use client";

import { useSession } from "@/lib/auth-client";
import {
  Button,
  Card,
  Chip,
} from "@heroui/react";
import { useEffect } from "react";
import {
  FaCrown,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

const MyProfilePage = () => {
  useEffect(() => {
    document.title = "APSM | Profile";
  }, []);

  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-xl text-[#6F5B50]"></span>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <p className="text-default-500 mt-3">
          View your personal information and manage your account.
        </p>

      </div>

      <Card className="p-8">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <img
            src={user.image}
            alt={user.name}
            className="w-36 h-36 rounded-full object-cover border-4 border-primary"
          />

          <div className="flex-1 space-y-5">

            <div className="flex items-center gap-3">

              <FaUser className="text-primary text-xl" />

              <div>

                <p className="text-default-500">
                  Name
                </p>

                <h2 className="text-xl font-semibold">
                  {user.name}
                </h2>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <FaEnvelope className="text-success text-xl" />

              <div>

                <p className="text-default-500">
                  Email
                </p>

                <h2 className="font-medium">
                  {user.email}
                </h2>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <FaCrown className="text-warning text-xl" />

              <div>

                <p className="text-default-500">
                  Subscription Plan
                </p>

                <Chip
                  color={
                    user.plan === "premium"
                      ? "success"
                      : "warning"
                  }
                  variant="flat"
                >
                  {user.plan === "premium"
                    ? "premium"
                    : "Free"}
                </Chip>

              </div>

            </div>

          </div>

        </div>

      </Card>
            {user.plan === "free" ? (
        <Card className="mt-8 p-8 border-2 border-warning bg-warning-50 dark:bg-warning-950/20">

          <div className="flex flex-col lg:flex-row justify-between gap-8">

            <div>

              <Chip
                color="warning"
                variant="flat"
                className="mb-4"
              >
                Free Plan
              </Chip>

              <h2 className="text-3xl font-bold">
                🚀 Upgrade to Premium
              </h2>

              <p className="text-default-500 mt-3 max-w-2xl">
                Unlock premium features and take your AI Prompt experience
                to the next level.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mt-8">

                <div>✅ Access Private Prompts</div>

                <div>✅ Unlimited Prompt Sharing</div>

                <div>✅ Premium Badge</div>

                <div>✅ Future Premium Features</div>

              </div>

            </div>

            <div className="flex items-center">

              <Button
                className="bg-[#6F5B50]"
                size="lg"
                onPress={() => (window.location.href = "/pricing")}
              >
                Upgrade Now
              </Button>

            </div>

          </div>

        </Card>
      ) : (
        <Card className="mt-8 p-8 border-2 border-success bg-success-50 dark:bg-success-950/20">

          <Chip
            color="success"
            variant="flat"
            className="mb-4"
          >
            Premium Active
          </Chip>

          <h2 className="text-3xl font-bold">
            👑 You're a Premium Member
          </h2>

          <p className="text-default-500 mt-3">
            Thanks for subscribing to Idea Vault Premium.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-8">

            <Card className="p-4 shadow-none border">
              <p className="font-semibold">
                ✅ Access Private Prompts
              </p>
            </Card>

            <Card className="p-4 shadow-none border">
              <p className="font-semibold">
                ✅ Unlimited Prompt Sharing
              </p>
            </Card>

            <Card className="p-4 shadow-none border">
              <p className="font-semibold">
                ✅ Premium Badge
              </p>
            </Card>

            <Card className="p-4 shadow-none border">
              <p className="font-semibold">
                ✅ Priority Access to Premium Features
              </p>
            </Card>

          </div>

          <div className="mt-8 flex flex-wrap gap-3">

            <Chip color="success">
              Subscription Status : Active
            </Chip>

            <Chip color="primary">
              Enjoy all Premium Features 🎉
            </Chip>

          </div>

        </Card>
      )}

      <div className="mt-8 flex justify-end">

        <Button
          className="bg-[#6F5B50]"
          size="lg"
          onPress={() => (window.location.href = "/dashboard/user/update-profile")}
        >
          Update Profile
        </Button>

      </div>

    </div>
  );
};

export default MyProfilePage;