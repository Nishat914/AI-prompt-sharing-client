'use client'

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.title = "APSM | Update Profile";
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name && !image) {
      toast.error("Please enter at least one field");
      return;
    }

    const { data: res, error } = await authClient.updateUser({
      ...(name && { name }),
      ...(image && { image }),
    });

    if (error) {
      toast.error(error.message || "Update failed");
      return;
    }

    if (res) {
      toast.success("Profile Updated!");

      setTimeout(() => {
        router.push("/dashboard/user");
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto w-[80%] md:w-[70%] lg:w-[60%] mt-20">
      <div className="rounded-2xl p-6 bg-linear-to-r from-[#f4ebe3]  to-[#e6c3b1]  shadow-xl">
        
        <div className="text-center my-3">
          <h1 className="text-3xl font-bold text-mauve-700 ">
            Update Profile
          </h1>
          <p className="font-semibold text-mauve-500 dark:text-gray-300 mt-4">
            Update your personal information and keep your profile fresh.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="mt-10">
          <div className="bg-white/60 dark:bg-zinc-900/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/30 dark:border-zinc-700 space-y-6">
            
            <div>
              <label className="block text-mauve-700 dark:text-white font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-4 rounded-xl bg-mauve-100 dark:bg-zinc-800 text-gray-700 dark:text-white outline-none border border-mauve-200 dark:border-zinc-700"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-mauve-700 dark:text-white font-semibold mb-2">
                Profile Image URL
              </label>
              <input
                type="text"
                placeholder="Enter image URL"
                className="w-full p-4 rounded-xl bg-mauve-100 dark:bg-zinc-800 text-gray-700 dark:text-white outline-none border border-mauve-200 dark:border-zinc-700"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6F5B50] hover:bg-[#a99286] text-white font-semibold py-4 rounded-xl border-2 border-mauve-400 transition"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;