import { useCurrentEditor } from "@tiptap/react";
import { useChat, useCompletion } from "ai/react";
import { useCallback, useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CodeIcon from "@mui/icons-material/Code";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import PaletteIcon from "@mui/icons-material/Palette";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import TableChartIcon from "@mui/icons-material/TableChart";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Button } from "@mui/material";
import BasicPopover from "./popover";

export const MenuBar = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({ id: "creation" });
  const [row, setrow] = useState(3);
  const [col, setcol] = useState(3);
  const [color, setcolor] = useState("#000000");
  const rangeRef = useRef({ start: 0, end: 0 });
  const customrange = useRef({ start: 0, end: 0 });
  const [customrequest, setcustomrequest] = useState("Extend it");
  const { completion, input: i2, setInput, handleSubmit: hs3 } = useCompletion({ api: "/api/completion" });
  const {
    messages: custommessage,
    input: custominput,
    setInput: setcustominput,
    handleSubmit: customsumbit,
  } = useChat({
    id: "custom",
    api: "/api/custom",
  });
  const { editor } = useCurrentEditor();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setcolor(newColor);
    editor?.chain().focus().setColor(newColor).run();
  };

  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    if (url && editor) {
      editor.chain().focus().insertContent({ type: "image", attrs: { src: url } }).run();
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
    customsumbit()
    console.log(custominput);
  }, [custominput]);
  useEffect(() => {
    if (messages[messages.length - 1]?.role === "assistant") {
      const newContent = `<p>${messages[messages.length - 1].content}</p>`;
      editor?.commands.setContent(newContent);
    }
  }, [messages]);

  if (!editor) return null;

  useEffect(() => {
    console.log(i2)
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
      icon: <EditIcon sx={{ fontSize: 'medium', margin: '0 8px 0 0' }} />,
      action: toggleCodeBlockWithAction,
    },
    {
      title: "Bullet list",
      icon: <FormatListBulletedIcon sx={{ fontSize: 'medium', margin: '0 8px 0 0' }} />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      title: "Ordered list",
      icon: <FormatListNumberedIcon sx={{ fontSize: 'medium', margin: '0 8px 0 0' }} />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      title: "Code block",
      icon: <CodeIcon sx={{ fontSize: 'large', margin: '0 8px 0 0' }} />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      title: "Blockquote",
      icon: <FormatQuoteIcon sx={{ fontSize: 'large', margin: '0 8px 0 0' }} />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      title: "Horizontal rule",
      icon: <HorizontalRuleIcon sx={{ fontSize: 'large', margin: '0 8px 0 0' }} />,
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      title: "Undo",
      icon: <UndoIcon sx={{ fontSize: 'medium', margin: '0 8px 0 0' }} />,
      action: () => editor.chain().focus().undo().run(),
      isDisabled: () => !editor.can().chain().focus().undo().run(),
    },
    {
      title: "Redo",
      icon: <RedoIcon sx={{ fontSize: 'medium', margin: '0 8px 0 0' }} />,
      action: () => editor.chain().focus().redo().run(),
      isDisabled: () => !editor.can().chain().focus().redo().run(),
    },
    {
      title: "Color Picker",
      icon: <PaletteIcon sx={{ fontSize: 'medium', margin: '0 8px 0 0' }} />,
      input: (
        <div className="relative w-6 h-6 rounded-full overflow-hidden border ml-2 border-gray-400">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 ml-2 cursor-pointer"
          />
          <div
            style={{ backgroundColor: color }}
            className="w-full h-full rounded-full"
          ></div>
        </div>
      ),
      action: () => editor.chain().focus().setColor(color).run(),
      isActive: () => editor.isActive("textStyle", { color }),
    },
    {
      title: "Add image from URL",
      icon: <AddPhotoAlternateIcon sx={{ fontSize: 'large', margin: '0 8px 0 0' }} />,
      action: addImage,
    },
    // {
    //   title: "AI Writer",

    //   popover: (
    //     
    //   ),
    // },
  ];

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
  const custominputai = () => {
    if (!editor) return;
    const { from, to } = editor.view.state.selection;
    console.log(from, to);
    
    customrange.current = { start: from, end: to };
    const selectedText = editor.state.doc.textBetween(from, to);
    setcustominput(selectedText + customrequest);
  };

  return (
    <div className="control-group h-[10%]">
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <div className="flex justify-between w-full px-4">
        <div className="flex gap-1 bg-[#f0f4f9] rounded-[20px] overflow-hidden items-center p-[5px] shadow-md" >


          {buttons.map((item, index) => (
            <div key={index}>

              <button
                onClick={item.action}
                className={item.isActive?.() ? "is-active" : "buttonn"}
                disabled={item.isDisabled?.()}
              >
                <div>{item.icon}</div>
                <div>{item.title}</div>
                {item.input && <div>{item.input}</div>}
              </button>

            </div>
          ))}

        </div>

        <div className="flex">

          <BasicPopover
            title="AI"
            icon={<SmartToyIcon sx={{ fontSize: 'medium', margin: '0 8px 0 0' }} />}
            body={
              <div>
                <input
                  type="text"
                  value={input}
                  placeholder="Enter the prompt"
                  onChange={handleInputChange}
                  className="border-1 border-black"
                />
                <button onClick={handleSubmit}>Generate</button>
              </div>
            }
          />

          <BasicPopover
            icon={<TableChartIcon sx={{ fontSize: 'medium', marginRight: '8px' }} />}
            title="Table"
            body={
              <div>
                <input
                  value={row}
                  onChange={(e) => setrow(parseInt(e.target.value))}
                  type="number"
                  placeholder="Rows"
                  className="border-1 border-black"
                />
                <input
                  value={col}
                  onChange={(e) => setcol(parseInt(e.target.value))}
                  type="number"
                  placeholder="Columns"
                  className="border-1 border-black"
                />
                <button
                  onClick={() =>
                    editor.chain().focus().insertTable({ rows: row, cols: col, withHeaderRow: true }).run()
                  }
                >
                  Generate table
                </button>
              </div>
            }
          />
          <BasicPopover
          title={"custom"}
          body={
            <div>
               <input
          type="text"
          value={customrequest}
         
          onChange={(e) => setcustomrequest(e.target.value)}
        />{" "}
              <button onClick={custominputai}>Generate</button>
            </div>
          }
        />
        </div>
      </div>
    </div>
  );
};
