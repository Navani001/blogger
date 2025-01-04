import { useCurrentEditor } from "@tiptap/react";
import { useChat, useCompletion } from "ai/react";
import { useCallback, useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import BasicPopover from "./popover";

export const MenuBar = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id: "creation",
  });

  const {
    messages: custommessage,
    input: custominput,
    setInput: setcustominput,
    handleSubmit: customsumbit,
  } = useChat({
    id: "custom",
    api: "/api/custom",
  });

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setcolor(newColor);
    editor?.chain().focus().setColor(newColor).run();
  };

  const [row, setrow] = useState(3);
  const [col, setcol] = useState(3);
  const [selectedRange, setSelectedRange] = useState<{
    from: number;
    to: number;
  } | null>(null);
  const [color, setcolor] = useState("#000000");
  const rangeRef = useRef({ start: 0, end: 0 });
  const customrange = useRef({ start: 0, end: 0 });
  const [customrequest, setcustomrequest] = useState("Extend it");
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
    console.log(completion);
    const { start, end } = rangeRef.current;
    if (completion) {
      editor?.commands.deleteRange({ from: start, to: end });
      const en: number = start + completion.length;
      rangeRef.current = { start, end: en };
      editor?.commands.insertContentAt(start, completion);
    }
  }, [completion]);

  useEffect(() => {
    if (custommessage[custommessage.length - 1]?.role === "assistant") {
      const content = custommessage[custommessage.length - 1].content;
      const newContent = `<p>${content}</p>`;

      const { start, end } = customrange.current;

      console.log(start, end);
      const docSize: any = editor?.state.doc.content.size;

      const safeEnd = Math.min(Math.max(start, end), docSize);
      editor?.commands.deleteRange({ from: start, to: safeEnd });
      const en: number = start + content.length - 1;
      customrange.current = { start, end: en };
      editor?.commands.insertContentAt(start, newContent);
    }
  }, [custommessage]);

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

  useEffect(() => {
    customsumbit()
    console.log(custominput);
  }, [custominput]);

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

  const custominputai = () => {
    if (!editor) return;
    const { from, to } = editor.view.state.selection;
    console.log(from, to);
    setSelectedRange({ from, to });
    customrange.current = { start: from, end: to };
    const selectedText = editor.state.doc.textBetween(from, to);
    setcustominput(selectedText + customrequest);
  };

  const handleFocus = () => {
    if (selectedRange && editor) {
      const { from, to } = selectedRange;
      const selectedText = editor.state.doc.textBetween(from, to);
      setcustominput(selectedText); // Restore selected text on focus
    }
  };

  const buttons = [
    {
      title: "Auto complete",
      action: toggleCodeBlockWithAction,
    },
    {
      title: "custom",
      action: custominputai,
      popover: (
        <BasicPopover
          title={"custom"}
          body={
            <div>
               <input
          type="text"
          value={customrequest}
          onFocus={handleFocus} // Restore selected text when focused
          onChange={(e) => setcustomrequest(e.target.value)}
        />{" "}
              <button onClick={custominputai}>Generate</button>
            </div>
          }
        />
      ),
      
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
      title: "Color",
      action: () => editor.chain().focus().setColor(color).run(),
      isActive: () => editor.isActive("textStyle", { color }),
      input: <input type="color" value={color} onChange={handleColorChange} />,
    },
    {
      title: "Add image from URL",
      action: addImage,
    },
    {
      popover: (
        <BasicPopover
          title={"AI writer"}
          body={
            <div>
              <input
                type="text"
                value={input}
                placeholder="enter the prompt"
                onChange={handleInputChange}
                className="border-1 border-black"
              ></input>{" "}
              <button onClick={handleSubmit}>Generate</button>
            </div>
          }
        />
      ),
    },
    {
      popover: (
        <BasicPopover
          title={"Table"}
          body={
            <div>
              <input
                value={row}
                onChange={(e: any) => {
                  setrow(e.target.value);
                }}
                type="number"
                placeholder="enter no of rows "
                className="border-1 border-black"
              ></input>{" "}
              <input
                type="number"
                value={col}
                onChange={(e: any) => {
                  setcol(e.target.value);
                }}
                placeholder="enter no of colums "
                className="border-1 border-black"
              ></input>{" "}
              <button
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: row, cols: col, withHeaderRow: true })
                    .run()
                }
              >
                Generate table
              </button>
            </div>
          }
        />
      ),
    },
  ];

  return (
    <div className="control-group h-[10%]">
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <div className="button-group">
        {buttons.map((item, index) => (
          <div key={index}>
            {item.popover ? (
              item.popover
            ) : (
              <button
                onClick={item.action}
                className={item.isActive?.() ? "is-active" : "buttonn"}
                disabled={item.isDisabled?.()}
              >
                {item.input ? item.input : null}
                <div>
                  <EditIcon sx={{ fontSize: "small" }} />
                  &ensp;
                </div>
                <div>{item.title}</div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
