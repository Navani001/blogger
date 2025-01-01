import { useCurrentEditor } from "@tiptap/react";
import { useChat, useCompletion } from "ai/react";
import { useCallback, useEffect, useRef } from "react";

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
       
      }
    
    }, [messages]);
  
    if (!editor) return null;
    useEffect(() => {
      console.log(i2);
      hs3();
   
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
  
     
      } else if (parentNode.type.name === "paragraph") {
        setInput(parentNode.textContent);
  
    
      }
     
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