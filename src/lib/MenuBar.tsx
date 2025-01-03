import { useCurrentEditor } from "@tiptap/react";
import { useChat, useCompletion } from "ai/react";
import { useCallback, useEffect, useRef } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
export const MenuBar = () => {
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
    if (completion) {
      editor?.commands.deleteRange({ from: start, to: end });
      const en: number = start + completion.length;
      rangeRef.current = { start, end: en };
      editor?.commands.insertContentAt(start, completion);
    }
  }, [completion]);

  useEffect(() => {
    if (messages[messages.length - 1]?.role === "assistant") {
      const newContent = `<p>${messages[messages.length - 1].content}</p>`;
      editor?.commands.setContent(newContent);
    }
  }, [messages]);

  if (!editor) return null;

  useEffect(() => {
    hs3();
  }, [i2]);

  const toggleCodeBlockWithAction = () => {
    if (!editor) return;
    const { state } = editor;
    const { from } = state.selection;
    const resolvedPos = state.doc.resolve(from);
    const parentNode = resolvedPos.node(resolvedPos.depth);
    const start = resolvedPos.start(resolvedPos.depth);
    const end = resolvedPos.end(resolvedPos.depth);
    rangeRef.current = { start, end };
    setInput(parentNode.textContent || "");
  };

  const buttons = [
    {
      title: "Auto complete",
      action: toggleCodeBlockWithAction,
    },
    {
      title: "Bullet list",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      title: "Ordered list",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      title: "Code block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      title: "Horizontal rule",
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      title: "Hard break",
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      title: "Undo",
      action: () => editor.chain().focus().undo().run(),
      isDisabled: () => !editor.can().chain().focus().undo().run(),
    },
    {
      title: "Redo",
      action: () => editor.chain().focus().redo().run(),
      isDisabled: () => !editor.can().chain().focus().redo().run(),
    },
    {
      title: "Purple",
      action: () => editor.chain().focus().setColor("#958DF1").run(),
      isActive: () => editor.isActive("textStyle", { color: "#958DF1" }),
    },
    {
      title: "Add image from URL",
      action: addImage,
    },
  ];

  return (
    <div className="control-group h-[10%] ">
      <div className="button-group">
        {buttons.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className={item.isActive?.() ? "is-active" : "buttonn"}
            disabled={item.isDisabled?.()}
          >
            <div><EditIcon sx={{fontSize:'small'}} />&ensp;</div>
            <div >{item.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
