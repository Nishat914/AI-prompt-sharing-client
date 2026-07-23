"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { GiRobotHelmet } from "react-icons/gi";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  console.log(session, "session");
  const user = session?.user;
  console.log(user, "user");
  console.log(isPending);

  const pathname = usePathname();

  const navLinkClass = (path) =>
    `font-semibold pb-1 transition-all duration-300 ${
      pathname === path
        ? "border-b-2 border-[#C86B43] text-[#C86B43]"
        : "text-[#3D2C24] hover:text-[#C86B43]"
    }`;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <>
      <div className="relative z-50">
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            >
            <TypeAnimation
                sequence={[
                "AI Prompt Sharing & Marketplace Platform",
                2000,
                "Share AI Prompts | Inspire Innovation | Grow Together",
                2000,
                "Create Smarter with AI",
                2000,
                ]}
                wrapper="h2"
                speed={50}
                repeat={Infinity}
                className="text-center text-2xl font-bold text-[#C86B43] bg-[#F5E8DD] py-3"
            />
        </motion.div>
        <div className="navbar flex-col gap-3 md:flex-row bg-transparent shadow-sm p-4 relative z-50">
          {/* Logo */}
          <div className="flex-1">
            <p className="btn btn-ghost text-4xl font-bold text-[#3D2C24] hover:bg-transparent">
              <GiRobotHelmet  className="text-[#C86B43]" />
              AI-<span className="text-[#C86B43]">PSMP</span>
            </p>
          </div>

          <div className="flex justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-6">
              <Link href="/" className={navLinkClass("/")}>
                Home
              </Link>

              <Link href="/all-prompts" className={navLinkClass("/all-prompts")}>
                All Prompts
              </Link>

            </div>

            {/* Avatar */}
            <div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar hover:bg-transparent"
                >
                  <div className="w-10 rounded-full border-2 border-[#D9C9B8]">
                    {user ? (
                      <img alt="user" src={user.image} />
                    ) : (
                      <img
                        alt="Default User"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    )}
                  </div>
                </div>

                <ul
                  tabIndex={-1}
                  className="menu menu-sm dropdown-content bg-[#F8F4EF] border border-[#D9C9B8] rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
                >
                  {user ? (
                    <>
                      <li>
                        <Link
                          href="/dashboard"
                          className={`${
                            pathname === "/dashboard"
                              ? "bg-[#C86B43] text-white"
                              : "hover:bg-[#EFE4D7] text-[#3D2C24]"
                          }`}
                        >
                          Dashboard
                        </Link>
                      </li>

                      <li>
                        <button
                          onClick={handleSignOut}
                          className="text-[#3D2C24] hover:bg-[#EFE4D7]"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link
                        href="/login"
                        className={`${
                          pathname === "/login"
                            ? "bg-[#C86B43] text-white"
                            : "hover:bg-[#EFE4D7] text-[#3D2C24]"
                        }`}
                      >
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;