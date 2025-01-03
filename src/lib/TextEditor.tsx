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
   content ={ `
   <p><span style="font-family: Inter">Did you know that Inter is a really nice font for interfaces?</span></p>
   <p><span style="font-family: Comic Sans MS, Comic Sans">It doesn’t look as professional as Comic Sans.</span></p>
   <p><span style="font-family: serif">Serious people use serif fonts anyway.</span></p>
   <p><span style="font-family: monospace">The cool kids can apply monospace fonts aswell.</span></p>
   <p><span style="font-family: cursive">But hopefully we all can agree, that cursive fonts are the best.</span></p>
   <p><span style="font-family: var(--title-font-family)">Then there are CSS variables, the new hotness.</span></p>
   <p><span style="font-family: 'Exo 2'">TipTap even can handle exotic fonts as Exo 2.</span></p>
 `}
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
