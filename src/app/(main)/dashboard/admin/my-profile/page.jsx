import { auth } from "@/lib/auth";
import { Card, Chip, Button } from "@heroui/react";
import { headers } from "next/headers";
import { FaEnvelope, FaUserShield, FaCrown } from "react-icons/fa";


import Link from "next/link";
import { FaUsers, FaFileAlt, FaChartBar } from "react-icons/fa";

export default async function MyProfile() {
    const session = await auth.api.getSession({
        headers : await headers()
       }) 
  return (
    <div className="max-w-5xl mx-auto py-8">

      <Card className="rounded-3xl overflow-hidden border border-[#E9DDD2] bg-[#FFFCF8] shadow-md">

        {/* Top Banner */}
        <div className="h-32 bg-linear-to-r from-[#3D2C24] via-[#6F5B50] to-[#C9873F]" />

       <div className="px-8 pb-8">

            {/* Avatar */}
            <div className="-mt-16 flex flex-col md:flex-row md:items-end gap-6">

                <img
                src={session.user.image}
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />

                <div className="flex-1">

                <h2 className="text-3xl font-bold text-[#3D2C24]">
                    {session.user.name}
                </h2>

                <p className="text-[#6F5B50] mt-1">
                    Platform Administrator
                </p>

                <div className="flex gap-3 mt-4 flex-wrap">

                    <Chip
                    color="success"
                    variant="flat"
                    >
                    Active
                    </Chip>

                    <Chip
                    color="warning"
                    variant="flat"
                    >
                    <div className="flex items-center gap-2">
                        <FaCrown className="text-sm" />
                        <span className="capitalize">
                        {session.user.plan}
                        </span>
                    </div>
                    </Chip>

                </div>

                </div>

            </div>

            {/* Information */}

            <div className="grid md:grid-cols-2 gap-6 mt-10">

                {/* Name */}
                <div className="rounded-2xl border border-[#E8DDD4] bg-[#FFFCF8] p-5">

                <p className="text-sm uppercase tracking-widest text-[#8A7568]">
                    Full Name
                </p>

                <h3 className="mt-3 text-xl font-semibold text-[#3D2C24]">
                    {session.user.name}
                </h3>

                </div>

                {/* Email */}
                <div className="rounded-2xl border border-[#E8DDD4] bg-[#FFFCF8] p-5">

                <p className="text-sm uppercase tracking-widest text-[#8A7568]">
                    Email
                </p>

                <div className="mt-3 flex items-center gap-3 text-[#3D2C24]">

                    <FaEnvelope className="text-[#C9873F]" />

                    <span>{session.user.email}</span>

                </div>

                </div>

                {/* Role */}
                <div className="rounded-2xl border border-[#E8DDD4] bg-[#FFFCF8] p-5">

                <p className="text-sm uppercase tracking-widest text-[#8A7568]">
                    Role
                </p>

                <div className="mt-3 flex items-center gap-3">

                    <FaUserShield className="text-[#C9873F]" />

                    <span className="font-semibold capitalize text-[#3D2C24]">
                    {session.user.role}
                    </span>

                </div>

                </div>

                {/* Subscription */}
                <div className="rounded-2xl border border-[#E8DDD4] bg-[#FFFCF8] p-5">

                <p className="text-sm uppercase tracking-widest text-[#8A7568]">
                    Subscription
                </p>

                <div className="mt-3 flex items-center gap-3">

                    <FaCrown className="text-[#C9873F]" />

                    <span className="font-semibold capitalize text-[#3D2C24]">
                    {session.user.plan}
                    </span>

                </div>

                </div>

            </div>

        </div>

        <div className="mt-10">

        <h3 className="text-2xl font-bold text-[#3D2C24] mb-5">
            Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <Link href="/dashboard/admin/all-users">
            <div className="group rounded-2xl border border-[#E8DDD4] bg-[#FFFCF8] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9873F] hover:shadow-lg cursor-pointer">

                <div className="w-14 h-14 rounded-xl bg-[#FDF2E8] flex items-center justify-center">
                <FaUsers className="text-2xl text-[#C9873F]" />
                </div>

                <h4 className="mt-5 text-xl font-semibold text-[#3D2C24]">
                Manage Users
                </h4>

                <p className="mt-2 text-sm text-[#6F5B50]">
                View users, update roles and manage accounts.
                </p>

            </div>
            </Link>

            <Link href="/dashboard/admin/all-prompts">
            <div className="group rounded-2xl border border-[#E8DDD4] bg-[#FFFCF8] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9873F] hover:shadow-lg cursor-pointer">

                <div className="w-14 h-14 rounded-xl bg-[#FDF2E8] flex items-center justify-center">
                <FaFileAlt className="text-2xl text-[#C9873F]" />
                </div>

                <h4 className="mt-5 text-xl font-semibold text-[#3D2C24]">
                Manage Prompts
                </h4>

                <p className="mt-2 text-sm text-[#6F5B50]">
                Approve, reject and organize submitted prompts.
                </p>

            </div>
            </Link>

            <Link href="/dashboard/admin">
            <div className="group rounded-2xl border border-[#E8DDD4] bg-[#FFFCF8] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9873F] hover:shadow-lg cursor-pointer">

                <div className="w-14 h-14 rounded-xl bg-[#FDF2E8] flex items-center justify-center">
                <FaChartBar className="text-2xl text-[#C9873F]" />
                </div>

                <h4 className="mt-5 text-xl font-semibold text-[#3D2C24]">
                View Analytics
                </h4>

                <p className="mt-2 text-sm text-[#6F5B50]">
                Monitor platform performance and user activity.
                </p>

            </div>
            </Link>

        </div>

        </div>

      </Card>

    </div>
  );
}