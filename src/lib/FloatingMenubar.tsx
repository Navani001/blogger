import React, { useCallback, useEffect, useState } from "react";
import { useCurrentEditor } from "@tiptap/react";

import {
  ChevronDown,
  Wand2,
  Type,
  ListOrdered,
  Code,
  History,
  Image,
  Palette,
} from "lucide-react";
type EditorAction = {
  [key: string]: (...args: any[]) => void;
};
const NavBar = ({ editor }: any) => {
 
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const editorActions: EditorAction = {
    Add_Image: () => {
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
    },

    Bold: () => {
      editor.chain().focus().toggleBold().run();
    },
    Strike: () => {
      editor?.chain().focus().toggleStrike().run();
    },

    Italic: () => {
      editor.chain().focus().toggleItalic().run();
    },

    Code: () => {
      editor.chain().focus().toggleCode().run();
    },

    Clear_Marks: () => {
      editor.chain().focus().unsetAllMarks().run();
    },

    Clear_Nodes: () => {
      editor.chain().focus().clearNodes().run();
    },

    Heading: (level: any) => {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(level[1]) })
        .run();
    },

    Bullet_List: () => {
      editor.chain().focus().toggleBulletList().run();
    },

    Ordered_List: () => {
      editor.chain().focus().toggleOrderedList().run();
    },

    Code_Block: () => {
      editor.chain().focus().toggleCodeBlock().run();
    },

    Blockquote: () => {
      editor.chain().focus().toggleBlockquote().run();
    },

    Horizontal_Rule: () => {
      editor.chain().focus().setHorizontalRule().run();
    },
    MergeorSpilit: () => {
      editor.chain().focus().mergeOrSplit().run();
    },

    Hard_Break: () => {
      editor.chain().focus().setHardBreak().run();
    },

    Undo: () => {
      editor.chain().focus().undo().run();
    },

    Redo: () => {
      editor.chain().focus().redo().run();
    },

    setColor: (color: any) => {
      editor.chain().focus().setColor(color).run();
    },
    Paragraph: () => {
      editor?.chain().focus().setParagraph().run();
    },
    Link: () => {
      setLink();
    },
    Underline: () => {
      editor.chain().focus().toggleUnderline().run();
    },
    Delete: () => {
      editor.chain().focus().deleteTable().run()
    }
    
  };

  const buttonGroups = {
    
    text: {
      label: "Text",
      icon: <Type size={16} />,
      items: ["Bold", "Italic", "Strike", "Code", "Paragraph", "Underline"],
    },
    headings: {
      label: "Headings",
      icon: <Type size={16} className="font-bold" />,
      items: ["H1", "H2", "H3", "H4", "H5", "H6"],
    },
    lists: {
      label: "Lists",
      icon: <ListOrdered size={16} />,
      items: ["Bullet_List", "Ordered_List"],
    },
    blocks: {
      label: "Blocks",
      icon: <Code size={16} />,
      items: ["Code_Block", "Blockquote", "Horizontal_Rule", "Hard_Break"],
    },

    insert: {
      label: "Insert",
      icon: <Image size={16} />,
      items: ["Link"],
    },
    font:{
      label: "Font",
      icon: <Image size={16} />,
      items: ["Inter","Comic Sans MS","serif","Monospace","Cursive","Exo 2"],

    },

    format: {
      label: "Format",
      icon: <Palette size={16} />,
      items: ["Clear_Marks", "Clear_Nodes"],
    },
    table: {
      label: "Table",
      icon: <Image size={16} />,
      items: ["MergeorSpilit", "Delete"],
    },
  };

  const handleButtonClick = (action: any) => {
    console.log(
      `Button clicked: ${["H1", "H2", "H3", "H4", "H5", "H6", "H7"].includes(
        action
      )}`
    );
    if (["H1", "H2", "H3", "H4", "H5", "H6", "H7"].includes(action)) {
      editorActions["Heading"](action);
    } else if (action in editorActions) {
      editorActions[action + ""]();
    }
  };

  const toggleDropdown = (group: any) => {
    setActiveDropdown(activeDropdown === group ? null : group);
  };

  return (
    <nav className="flex items-center gap-0.5 p-1 bg-white border-b">
      {Object.entries(buttonGroups).map(([groupKey, group]) => (
        <div key={groupKey} className="relative">
          <button
            className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded-sm transition-colors"
            onClick={() => toggleDropdown(groupKey)}
          >
            {group.icon}
            {group.label}
            <ChevronDown
              size={12}
              className={`transform transition-transform ${
                activeDropdown === groupKey ? "rotate-180" : ""
              }`}
            />
          </button>
          
      
          {activeDropdown === groupKey && (
            <div className="absolute z-10 mt-1 py-1 bg-white border rounded-md shadow-lg min-w-[140px]">
              {group.items.map((item) => (
                
                <button
                  key={item}
                  className="w-full px-3 py-1.5 text-sm text-gray-700 text-left hover:bg-gray-50 flex items-center gap-2"
                 
                  onClick={() =>{ groupKey!="font"? handleButtonClick(item):editor.chain().focus().setFontFamily(item).run()}}
                >
                  <span className="w-4 h-4"></span>
                  {item}
        
                </button>
              ))}
            </div>
          )}
          
        </div>
      ))}
    </nav>
  );
};

const FloatingMenuBar = () => {
  const { editor } = useCurrentEditor();
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    visible: false,
  });

  useEffect(() => {
    if (!editor) return;
    
    const updateMenuPosition = () => {
   
      const { from, to } = editor.state.selection;

      // Check if there's a selection
      if (from !== to) {
        const startPos = editor.view.coordsAtPos(from);
        const endPos = editor.view.coordsAtPos(to);

        if (startPos && endPos) {
          setMenuPosition({
            top: startPos.top,
            left: (startPos.left + endPos.left) / 2, // Center between start and end
            visible: true,
          });
        }
      } else {
        // No selection, hide the menu
        setMenuPosition((prev) => ({ ...prev, visible: false }));
      }
    };

    // Attach the listener
    editor.on("selectionUpdate", updateMenuPosition);

    // Cleanup listener on unmount
    return () => {
      editor.off("selectionUpdate", updateMenuPosition);
    };
  }, [editor]);

  if (!menuPosition.visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: menuPosition.top,
        left: menuPosition.left,
        zIndex: 1000,
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        padding: "8px",
      }}
      className="floating-menu"
    >
      <NavBar editor={editor} />
      {/* <button
          onClick={() => editor?.chain().focus().setParagraph().run()}
          className={editor?.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={!editor?.can().chain().focus().toggleStrike().run()}
          className={editor?.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </button> */}
    </div>
  );
};

export default FloatingMenuBar;
