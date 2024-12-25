"use client";
import { useEffect, useState } from "react";
import Tiptap from "../../lib/TextEditor";

export default function Home() {
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
