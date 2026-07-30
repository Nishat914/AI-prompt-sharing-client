"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const role = user?.role || "user";

  const navMenu = {
    user: [
      {
        title: "Overview",
        href: "/dashboard/user",
      },
      {
        title: "Add Prompt",
        href: "/dashboard/user/add-prompt",
      },
      {
        title: "My Prompt",
        href: "/dashboard/user/my-prompt",
      },
      {
        title: "Saved Prompts",
        href: "/dashboard/user/saved-prompts",
      },
      {
        title: "My Reviews",
        href: "/dashboard/user/my-reviews",
      },
      
      {
        title: "Home",
        href: "/",
      },
    ],

    creator: [
      {
        title: "My Profile",
        href: "/dashboard/creator/my-profile",
      },
      {
        title: "Creator Dashboard Home",
        href: "/dashboard/creator",
      },
      {
        title: "Add Prompt",
        href: "/dashboard/creator/add-prompt",
      },
      {
        title: "My Prompts",
        href: "/dashboard/creator/my-prompts",
      },
      {
        title: "Home",
        href: "/",
      },
    ],

    admin: [
      {
        title: "My Profile",
        href: "/dashboard/admin/my-profile",
      },
      {
        title: "Analytics",
        href: "/dashboard/admin",
      },
      {
        title: "All Users",
        href: "/dashboard/admin/all-users",
      },
      {
        title: "All Prompts",
        href: "/dashboard/admin/all-prompts",
      },
      {
        title: "All Payments",
        href: "/dashboard/admin/all-payments",
      },
      {
        title: "Reported Prompts",
        href: "/dashboard/admin/reported-prompts",
      },
      
      {
        title: "Home",
        href: "/",
      },
    ],
  };

  const menu = navMenu[role];

  return (
    <nav className="p-4 space-y-2">
      {menu.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={`block rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
            pathname === item.href
              ? "bg-[#EFE4D7] text-[#C86B43] shadow-md"
              : "text-[#3D2C24] hover:bg-[#EFE4D7] hover:text-[#C86B43]"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default DashboardSidebar;