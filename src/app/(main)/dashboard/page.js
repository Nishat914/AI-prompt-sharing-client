import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role === "user") {
    redirect("/dashboard/user");
  }

  if (session.user.role === "creator") {
    redirect("/dashboard/creator");
  }

  if (session.user.role === "admin") {
    redirect("/dashboard/admin");
  }

  redirect("/");
}