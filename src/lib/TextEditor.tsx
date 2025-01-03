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
    <div className="m-5 rounded-lg shadow-2xl bg-[red] overflow-y-auto relative">
      <EditorProvider
        {...editorConfig}
        onUpdate={({ editor }: { editor: any }) => {
          // Log the editor's current content as JSON
          console.log(editor.getJSON());

          // Optionally handle other editor updates
          const content = editor.getHTML();
          console.log("Editor HTML:", content);
        }}
        slotBefore={[ <Navbar
          
        >
          <div className="flex gap-4 py-4">
            <div>i</div>
            <p className="font-bold text-2xl">Blogger</p>
          </div>
          <div>
            <Publish settitle={settitle} title={title} />
          </div>
        </Navbar>,<MenuBar />]}
      >       
        <FloatingMenuBar />
        <EditorContent />
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
