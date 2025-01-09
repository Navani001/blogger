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
import { BsThreeDotsVertical } from "react-icons/bs";
import { cn } from "@nextui-org/theme";
export const MenuBar = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id: "creation",
  });
  const [row, setrow] = useState(3);
  const [col, setcol] = useState(3);
  const [color, setcolor] = useState("#000000");
  const [popover, setpopover] = useState(false);
  const rangeRef = useRef({ start: 0, end: 0 });
  const customrange = useRef({ start: 0, end: 0 });
  const [customrequest, setcustomrequest] = useState("Extend it");
  const {
    completion,
    input: i2,
    setInput,
    handleSubmit: hs3,
  } = useCompletion({ api: "/api/completion" });
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
      editor
        .chain()
        .focus()
        .insertContent({ type: "image", attrs: { src: url } })
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
    customsumbit();
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
    console.log(i2);
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
      icon: <EditIcon sx={{ fontSize: "medium"}} />,
      action: toggleCodeBlockWithAction,
    },
    {
      title: "Bullet list",
      icon: (
        <FormatListBulletedIcon
          sx={{ fontSize: "medium" }}
        />
      ),
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      title: "Ordered list",
      icon: (
        <FormatListNumberedIcon
          sx={{ fontSize: "medium" }}
        />
      ),
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      title: "Code block",
      icon: <CodeIcon sx={{ fontSize: "large" }} />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      title: "Blockquote",
      icon: <FormatQuoteIcon sx={{ fontSize: "large"}} />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      title: "Color Pickers",
      icon: <div className="relative w-4 h-4 rounded-full overflow-hidden border border-gray-400">
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div
        style={{ backgroundColor: color }}
        className="w-full h-full rounded-full"
      ></div>
    </div>,
    
      action: () => editor.chain().focus().setColor(color).run(),
      isActive: () => editor.isActive("textStyle", { color }),
    },
    {
      title: "Line",
      icon: (
        <HorizontalRuleIcon sx={{ fontSize: "large"}} />
      ),
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      title: "Undo",
      icon: <UndoIcon sx={{ fontSize: "medium",marginRight:"2px" }} />,
      action: () => editor.chain().focus().undo().run(),
      isDisabled: () => !editor.can().chain().focus().undo().run(),
    },
    {
      title: "Redo",
      icon: <RedoIcon sx={{ fontSize: "medium",marginRight:"2px" }} />,
      action: () => editor.chain().focus().redo().run(),
      isDisabled: () => !editor.can().chain().focus().redo().run(),
    },

    {
      title: "Add image",
      icon: (
        <AddPhotoAlternateIcon
          sx={{ fontSize: "medium" }}
        />
      ),
      action: addImage,
    },
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
    <div className="control-group h-[10%] ">
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <div className="flex justify-between w-full px-4">
        <div className="xl:flex gap-4 2xl:gap-6 2xl:text-[15px] bg-[#f0f4f9] rounded-[20px] overflow-hidden items-center  shadow-md text-[13px] hidden ">
          {buttons.map((item, index) => (
            <div key={index}>
              <button
                onClick={item.action}
                className={item.isActive?.() ? "is-active" : "buttonn xl:gap-2"}
                disabled={item.isDisabled?.()}
              >
                <div>{item.icon}</div>
                <div>{item.title}</div>
             
              </button>
            </div>
          ))}
        </div>
        <div className="relative inline-block">
    <button
      onClick={() => setpopover(!popover)}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors xl:hidden"
    >
      <BsThreeDotsVertical className="w-5 h-5" />
    </button>

    <div 
      className={cn(
        "absolute top-full left-0 mt-2 z-50 transform origin-top-right transition-all duration-200 ease-out md:overflow-scroll scrollbar-hide ",
        {
          "opacity-100 scale-100": popover,
          "opacity-0 scale-95 pointer-events-none": !popover
        }
      )}
    >
      <div className="grid grid-cols-3 w-[340px]  gap-2 bg-[#f0f4f9] rounded-[20px] lg:w-[1000px] lg:flex md:w-[700px] md:overflow-scroll shadow-lg p-3 overflow-y-auto text-[12px] md:grid md:grid-cols-5 md:text-[14px] scrollbar-hide lg:gap-5 lg:text-[14px] xl:hidden">
        {buttons.map((item, index) => (
           <button
           key={index}
           style={{margin:"0",gap:5}}
           onClick={item.action}
           className={item.isActive?.() ? "is-active" : "buttonn lg:text-[13px] gap-3"}
           disabled={item.isDisabled?.()}
         >
           <div>{item.title!="Color Picker"?item.icon:""}</div>
           <div>{item.title}</div>
       
         </button>
        ))}
      </div>
    </div>
  </div>
        <div className="flex justify-center items-center text-[10px]">
          <BasicPopover
            title="AI"
            titlestyle={{
              fontSize: {
                xs: '10px',
                sm: '10px',
                md: '14px',
                lg: '12px'
              },
             
              padding: "5px 10px",
            }}
            icon={
              <SmartToyIcon sx={{    fontSize: {
                xs: '10px',
                sm: '10px',
                md: '14px',
                lg: '12px'
              }, margin: "0 8px 0 0" }} />
            }
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
            icon={
              <TableChartIcon className="md:text-lg" sx={{    fontSize: {
                xs: '10px',
                sm: '10px',
                md: '14px',
                lg: '12px'
              }, marginRight: "8px" }} />
            }
            titlestyle={{
              fontSize: {
                xs: '10px',
                sm: '10px',
                md: '14px',
                lg: '12px'
              },
              padding: "5px 10px",
            }}
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
                    editor
                      .chain()
                      .focus()
                      .insertTable({
                        rows: row,
                        cols: col,
                        withHeaderRow: true,
                      })
                      .run()
                  }
                >
                  Generate table
                </button>
              </div>
            }
          />
          <BasicPopover
            title={"custom"}
            titlestyle={{
              fontSize: {
                xs: '10px',
                sm: '10px',
                md: '14px',
                lg: '12px'
              },
              padding: "5px 10px",
            }}
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
