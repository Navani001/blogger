"use client";

import Placeholder from "@tiptap/extension-placeholder";
import "./styles.scss";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useChat, useCompletion } from "ai/react";
import FloatingMenuBar from "./FloatingMenubar";

const MenuBar = ({setcontent}:any) => {
  var s = 0;
  var e = 0;
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id: "creation",
  });
  const rangeRef = useRef({ start: 0, end: 0 });
  const {
    completion,
    input: i2,
    setInput,
    handleSubmit: hs3,
  } = useCompletion({
    api: "/api/completion",
  });

  const { editor } = useCurrentEditor();

  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    if (url && editor) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "image",
          attrs: { src: url },
        })
        .run();
    }
  }, [editor]);

  useEffect(() => {
    const { start, end } = rangeRef.current;
    console.log("range", start, end);
    console.log(completion);
    if (completion) {
      editor?.commands.deleteRange({ from: start, to: end });
      let en: number = start + completion.length;
      rangeRef.current = { start, end: en };
      console.log(completion);
      editor?.commands.insertContentAt(start, completion);
    }
  }, [completion]);
  useEffect(() => {
    if (messages[messages.length - 1]?.role === "assistant") {
      const newContent = "<p>" + messages[messages.length - 1].content + "</p>";

      editor?.commands.setContent(newContent);
      setcontent(newContent);
    }
    console.log(messages);
  }, [messages]);

  if (!editor) return null;
  useEffect(() => {
    console.log(i2);
    hs3();
    // handleSubmit()
  }, [i2]);
  const toggleCodeBlockWithAction = async () => {
    if (!editor) return;

    const { state } = editor;
    console.log("state", state);
    const { from } = state.selection;
    const resolvedPos = state.doc.resolve(from);
    const parentNode = resolvedPos.node(resolvedPos.depth);
    const start = resolvedPos.start(resolvedPos.depth); // Start of the code block
    const end = resolvedPos.end(resolvedPos.depth); // End of the code block
    rangeRef.current = { start, end };

    console.log("Code block range:", start, end);

    if (parentNode.type.name === "codeBlock") {
      setInput(parentNode.textContent);

      // console.log(
      //   "Currently a code block. Text content:",
      //   parentNode.textContent
      // );
    } else if (parentNode.type.name === "paragraph") {
      setInput(parentNode.textContent);

      // console.log(
      //   "Currently a paragraph. Text content:",
      //   parentNode.textContent
      // );
    }
    // editor.commands.deleteRange({ from: start, to: end })

    // handleSubmit()
  };
  return (
    <div className="control-group h-[10%]">
      <div className="button-group">
        <input value={input} onChange={handleInputChange}></input>
        <button onClick={handleSubmit}>Request AI</button>
        <button onClick={toggleCodeBlockWithAction}>auto complete </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }
        >
          Purple
        </button>
        <button onClick={addImage}>Add image from URL</button>
      </div>
    </div>
  );
};

const extensions = [
  Document,
  Paragraph,
  Text,
  Image,
  Dropcursor,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Placeholder.configure({
    placeholder: "Write something …",
  }),
];

interface EditorProps {
  content: string;
  setcontent: (content: string) => void;
}

const TiptapEditor: React.FC<EditorProps> = ({ content, setcontent }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editorConfig = useMemo(
    () => ({
      extensions,
      content,
      immediatelyRender: false,
      onUpdate: ({ editor }: any) => {
        const newContent = editor.getHTML();
        if (newContent !== content) {
          setcontent(newContent);
        }
      },
    }),
    [content, setcontent]
  );

  if (!isMounted) {
    return <div className="w-full p-8">Loading editor...</div>;
  }

  return (
    <div className="w-full p-8 overflow-y-auto relative">
      <EditorProvider
        {...editorConfig}
       onUpdate={({ editor }: { editor: any }) => {
        // Log the editor's current content as JSON
        console.log(editor.getJSON());
      
        // Optionally handle other editor updates
        const content = editor.getHTML();
        console.log("Editor HTML:", content);
      }}
        slotBefore={<MenuBar setcontent={setcontent} />}
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
