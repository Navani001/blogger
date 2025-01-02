
import { useEffect, useState } from "react";
import Tiptap from "../../lib/TextEditor";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session=await auth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Tiptap />
        </div>
      </div>
    </div>
  );
}
