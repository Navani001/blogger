"use client";
import "./styles.scss";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Publish from "@/lib/model";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "ai/react";
import FloatingMenuBar from "./FloatingMenubar";
import { MenuBar } from "./MenuBar";
import { extensions } from "./Extension";
import Image from "next/image";



const TiptapEditor = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [title, settitle] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editorConfig = useMemo(
    () => ({
      extensions,
     
      immediatelyRender: false,
    }),
    []
  );

  if (!isMounted) {
    return <div className="w-full p-8">Loading editor...</div>;
  }

  return (
    <div className="m-5 rounded-lg shadow-2xl bg-[#f9fbfd] overflow-y-auto relative">
      <EditorProvider

        {...editorConfig}
        slotBefore={[ <Navbar
          
        >
          <div className="flex gap-1 py-4 ">
            <div><Image width={26} height={26} alt="icon" src="/android-chrome-192x192.png"></Image></div>
            <p className="font-bold text-lg">Blogix</p>
          </div>
          <div>
            <Publish settitle={settitle} title={title} />
          </div>
        </Navbar>,<MenuBar />]}
      >       
        <FloatingMenuBar />
        <div className=""> <EditorContent /></div>
       
      </EditorProvider>
    </div>
  );
};

const EditorContent = () => {
  const { editor } = useCurrentEditor();
  const { messages } = useChat();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {

    if (!isMounted) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant" && editor) {
      editor.commands.setContent(`<p>${lastMessage.content}</p>`);
    }
  }, [messages, editor, isMounted]);

  return null;
};

export default TiptapEditor;
