import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export async function auth(formData: FormData) {
  "use server";

  const session = await getSession();
  const password = formData.get("password");
  const shouldAuthenticate = password === process.env.IRON_SESSION_PASSWORD;
  const redirectPath = (formData.get("redirect") as string) || "/";

  session.isAuthenticated = shouldAuthenticate;
  await session.save();

  if (!shouldAuthenticate) {
    redirect(
      `/sign-in?error=1&redirect=${encodeURIComponent(redirectPath)}`
    );
  }

  redirect(redirectPath.startsWith("/") ? redirectPath : "/");
}
