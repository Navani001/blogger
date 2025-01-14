
import { auth } from "@/lib/auth";
import { TiptapEditor } from "@/lib/editor";

import { redirect } from "next/navigation";

export default async function Home() {
const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="bg-slate-50  overflow-hidden">
          <TiptapEditor />
    </div>
  );
}
