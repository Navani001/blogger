import { auth } from "@/lib/utilis/auth";
import { SignIn } from "@/lib/auth/signin-button";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
 if (session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SignIn />
    </div>
  );
}
