import { auth } from "@/lib/utilis/auth";
import { SignIn } from "@/lib/auth/signin-button";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50">
      <SignIn />
    </div>
  );
}
