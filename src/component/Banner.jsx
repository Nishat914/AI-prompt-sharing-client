"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Banner =()=> {
    const fadeUp = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
        duration: 0.8,
        },
    },
    };

    const container = {
    hidden: {},
    visible: {
        transition: {
        staggerChildren: 0.2,
        },
    },
    };
    return(
        <>
        <section className="relative overflow-hidden bg-linear-to-br from-[#FDF7F2] via-[#F9EFE6] to-[#EFE4D7] py-24">

            <div className="container mx-auto w-[90%] px-6 ">

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-2 gap-16 items-center"
                    >
                {/* Left */}

                <div>

                    <motion.span
                        variants={fadeUp}
                        className="inline-block rounded-full bg-[#F5E4D6] px-4 py-2 text-sm font-semibold text-[#C86B43]"
                        >
                        🚀 AI Prompt Marketplace
                    </motion.span>

                    <motion.h1
                        variants={fadeUp}
                        className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight text-[#3D2C24]"
                        >
                        Discover Powerful
                        <span className="text-[#C86B43]"> AI Prompts</span>
                        <br />
                        for Every Task
                    </motion.h1>

                   <motion.p
                        variants={fadeUp}
                        className="mt-6 text-lg text-[#6F5B50] max-w-xl"
                        >
                        Explore thousands of high-quality prompts for ChatGPT,
                        Gemini, Claude, DeepSeek and more.
                        Boost productivity, automate work and unleash creativity.
                    </motion.p>

                    {/* Search */}

                    <motion.div
                    variants={fadeUp}
                    className="mt-10 flex rounded-2xl bg-white shadow-lg overflow-hidden"
                    >

                    <input
                        type="text"
                        placeholder="Search prompts..."
                        className="w-full px-6 py-4 outline-none"
                    />

                    <button className="bg-[#C86B43] px-8 text-white font-semibold">
                        Search
                    </button>

                    </motion.div>

                    {/* Trending */}

                    <motion.div
                    variants={fadeUp}
                    className="mt-8"
                    >

                    <p className="font-semibold text-[#3D2C24] mb-4">
                        🔥 Trending
                    </p>

                    <div className="flex flex-wrap gap-3">

                        {[
                        "ChatGPT",
                        "SEO",
                        "Marketing",
                        "Python",
                        "Resume",
                        "Claude",
                        "Automation",
                        ].map((tag) => (

                        <motion.button
                        whileHover={{
                            scale: 1.08,
                            backgroundColor: "#C86B43",
                            color: "#fff",
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        key={tag}
                        className="rounded-full border border-[#E6D6C8] bg-white px-5 py-2 text-sm"
                        >
                        #{tag}
                        </motion.button>

                        ))}

                    </div>

                    </motion.div>

                    {/* CTA */}

                    <motion.div
                        variants={fadeUp}
                        className="mt-10 flex gap-5"
                        >
                    <Link href="/all-prompt">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block rounded-xl bg-[#C86B43] px-6 py-3 text-white font-semibold cursor-pointer"
                        >
                            Explore Prompts
                        </motion.div>
                    </Link>
                    

                        <motion.button
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        className="rounded-xl border border-[#C86B43] p-2 font-semibold text-[#C86B43]"
                        >
                        Share Prompt
                        </motion.button>

                    </motion.div>

                </div>

                {/* Right */}

                    <motion.div
                    animate={{
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="flex justify-center"
                    >
                    <img
                        src="/knowledge.png"
                        alt="AI Hero"
                        className="max-w-lg w-full"
                    />
                    </motion.div>

                </motion.div>

            </div>

        </section>
        </>
    )
}
export default Banner;