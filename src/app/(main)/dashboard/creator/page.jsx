
import CopiesChart from "@/component/creator/CopiesChart";
import PromptGrowthChart from "@/component/creator/PromptGrowthChart";
import { auth } from "@/lib/auth";
import { Card } from "@heroui/react";
import { headers } from "next/headers";
import { FaUsers } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";
import { MdOutlineReviews } from "react-icons/md";
import { TbPrompt } from "react-icons/tb";

const CreatorOverviewPage = async() => {

    const session = await auth.api.getSession({
       headers: await headers(),
    });

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/creator/analytics/${session.user.email}`,
        {
            cache: "no-store",
        }
    );

    const analytics = await res.json();
    const data = [
        { name: "Bookmarks", value: analytics.totalBookmarks },
        { name: "Prompts", value: analytics.totalPrompts },
        { name: "Copies", value: analytics.totalCopies },
    ];

    return (
        <div>
           <div className="mb-20 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-[#3D2C24]">
                    Creator Dashboard
                </h1>

                <p className="mt-3 text-[#6F5B50] text-base md:text-lg">
                    Track your prompts, monitor copies, bookmarks, and analyze your prompt performance.
                </p>
            </div>
            <div className="mb-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card className="w-full overflow-hidden rounded-3xl border border-[#E9DDD2] bg-[#FFFCF8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

            {/* Top Accent */}
            <div className="h-1.5 bg-[#C9873F]" />

            <div className="flex items-center justify-between p-6">

                <div>
                <p className="uppercase text-xs tracking-[0.2em] font-semibold text-[#8A7568]">
                    Total Bookmarks
                </p>

                <h2 className="mt-3 text-5xl font-bold text-[#3D2C24]">
                    {analytics.totalBookmarks}
                </h2>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FDF2E8]">
                <FaUsers className="text-3xl text-[#C9873F]" />
                </div>

            </div>

            </Card>

            <Card className="w-full overflow-hidden rounded-3xl border border-[#E9DDD2] bg-[#FFFCF8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

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
            
            <Card className="w-full overflow-hidden rounded-3xl border border-[#E9DDD2] bg-[#FFFCF8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

            {/* Top Accent */}
            <div className="h-1.5 bg-[#C9873F]" />

            <div className="flex items-center justify-between p-6">

                <div>
                <p className="uppercase text-xs tracking-[0.2em] font-semibold text-[#8A7568]">
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
            <CopiesChart
                data={analytics.copiesChart}
            />
            <div className="mt-10">
                <PromptGrowthChart
                    data={analytics.growthChart}
                />
            </div>
        </div>
    );
};

export default CreatorOverviewPage;