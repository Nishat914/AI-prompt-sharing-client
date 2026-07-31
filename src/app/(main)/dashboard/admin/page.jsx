import AnalyticsChart from "@/component/admin/AnalythicsChart";
import { Card } from "@heroui/react";
import { FaUsers } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";
import { MdOutlineReviews } from "react-icons/md";
import { TbPrompt } from "react-icons/tb";

const AdminOverviewPage = async() => {
    const res = await fetch(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/analytics`,
  {
    cache: "no-store",
  }
);

const analytics = await res.json();
const data = [
  { name: "Users", value: analytics.totalUsers },
  { name: "Prompts", value: analytics.totalPrompts },
  { name: "Reviews", value: analytics.totalReviews },
  { name: "Copies", value: analytics.totalCopies },
];
    return (
        <div>
           <div className="mb-20 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3D2C24]">
                Admin Overview
            </h1>

            <p className="mt-3 text-[#6F5B50] text-base md:text-lg">
                Monitor your platform's performance with key statistics, user activity, and overall insights.
            </p>
            </div>
            <div className="mb-20 flex justify-center items-center gap-3 flex-wrap">
            <Card className="overflow-hidden rounded-3xl border border-[#E9DDD2] bg-[#FFFCF8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

            {/* Top Accent */}
            <div className="h-1.5 bg-[#C9873F]" />

            <div className="flex items-center justify-between p-6">

                <div>
                <p className="uppercase text-xs tracking-[0.2em] font-semibold text-[#8A7568]">
                    Total Users
                </p>

                <h2 className="mt-3 text-5xl font-bold text-[#3D2C24]">
                    {analytics.totalUsers}
                </h2>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FDF2E8]">
                <FaUsers className="text-3xl text-[#C9873F]" />
                </div>

            </div>

            </Card>

            <Card className="overflow-hidden rounded-3xl border border-[#E9DDD2] bg-[#FFFCF8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

            {/* Top Accent */}
            <div className="h-1.5 bg-[#C9873F]" />

            <div className="flex items-center justify-between p-6">

                <div>
                <p className="uppercase text-xs tracking-[0.2em] font-semibold text-[#8A7568]">
                    Total Prompts
                </p>

                <h2 className="mt-3 text-5xl font-bold text-[#3D2C24]">
                    {analytics.totalPrompts}
                </h2>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FDF2E8]">
                <TbPrompt className="text-3xl text-[#C9873F]" />
                </div>

            </div>

            </Card>
            <Card className="overflow-hidden rounded-3xl border border-[#E9DDD2] bg-[#FFFCF8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

            {/* Top Accent */}
            <div className="h-1.5 bg-[#C9873F]" />

            <div className="flex items-center justify-between p-6">

                <div>
                <p className="uppercase text-xs tracking-[0.2em] font-semibold text-[#8A7568]">
                    Total Reviews
                </p>

                <h2 className="mt-3 text-5xl font-bold text-[#3D2C24]">
                    {analytics.totalReviews}
                </h2>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FDF2E8]">
                <MdOutlineReviews className="text-3xl text-[#C9873F]" />
                </div>

            </div>

            </Card>
            <Card className="overflow-hidden rounded-3xl border border-[#E9DDD2] bg-[#FFFCF8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

            {/* Top Accent */}
            <div className="h-1.5 bg-[#C9873F]" />

            <div className="flex items-center justify-between p-6">

                <div>
                <p className=" text-xs  font-semibold text-[#8A7568]">
                    Total Copies
                </p>

                <h2 className="mt-3 text-5xl font-bold text-[#3D2C24]">
                    {analytics.totalCopies}
                </h2>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FDF2E8]">
                <IoIosCopy className="text-3xl text-[#C9873F]" />
                </div>

            </div>

            </Card>
            </div>
           <AnalyticsChart data={data}/>
        </div>
    );
};

export default AdminOverviewPage;