"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCurrentEditor } from "@tiptap/react";
import { createPortal } from "react-dom";
import { RiFontSizeAi } from "react-icons/ri";
import { CiLink } from "react-icons/ci";
import { CiViewTable } from "react-icons/ci";
import { FaRemoveFormat } from "react-icons/fa";

import { TbHeading } from "react-icons/tb";
import {
  ChevronDown,

  Type,
  ListOrdered,
  Code,

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
    //


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

    ClearMarks: () => {
      editor.chain().focus().unsetAllMarks().run();
    },

    ClearNodes: () => {
      editor.chain().focus().clearNodes().run();
    },

    Heading: (level: string) => {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: Number.parseInt(level[1]) })
        .run();
    },

    BulletList: () => {
      editor.chain().focus().toggleBulletList().run();
    },

    OrderedList: () => {
      editor.chain().focus().toggleOrderedList().run();
    },

    CodeBlock: () => {
      editor.chain().focus().toggleCodeBlock().run();
    },

    Blockquote: () => {
      editor.chain().focus().toggleBlockquote().run();
    },

    HorizontalRule: () => {
      editor.chain().focus().setHorizontalRule().run();
    },
    MergeorSpilit: () => {
      editor.chain().focus().mergeOrSplit().run();
    },

    HardBreak: () => {
      editor.chain().focus().setHardBreak().run();
    },

    Undo: () => {
      editor.chain().focus().undo().run();
    },

    Redo: () => {
      editor.chain().focus().redo().run();
    },

    setColor: (color: string) => {
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
      editor.chain().focus().deleteTable().run();
    },
  };
  const buttonGroups = {
    text: {
      label: "Text",
      icon: <Type size={14} />,
      items: ["Bold", "Italic", "Strike", "Code", "Paragraph", "Underline"],
    },
    headings: {
      label: "Headings",

      icon: <TbHeading size={16}/>,
      items: ["H1", "H2", "H3", "H4", "H5", "H6"],
    },
    lists: {
      label: "Lists",
      icon: <ListOrdered size={14} />,
      items: ["Bullet List", "Ordered List"],
    },

    blocks: {
      label: "Blocks",
      icon: <Code size={14} />,
      items: ["Code Block", "Blockquote", "Horizontal Rule", "Hard Break"],
    },

    insert: {
      label: "Insert",
      icon: < CiLink size={17} />,
      items: ["Link"],
    },
    font: {
      label: "Font",
      icon: <RiFontSizeAi size={13}/>,
      items: [
        "Inter",
        "Comic Sans MS",
        "serif",
        "Monospace",
        "Cursive",
        "Exo 2",
      ],
    },


    format: {
      label: "Format",
      icon: < FaRemoveFormat />,
      items: ["Clear Marks", "Clear Nodes"],
    },
    table: {
      label: "Table",
      icon: <CiViewTable size={15} />,
      items: ["MergeorSpilit", "Delete"],
    },
  };

  const handleButtonClick = (action: any) => {
   console.log()
    if (["H1", "H2", "H3", "H4", "H5", "H6", "H7"].includes(action)) {
      editorActions.Heading(action);
    } else if (action.replace(' ', '') in editorActions) {
      editorActions[`${action.replace(' ', '') }`]();
    }
  };

  const buttonRefs: any = useRef({});
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const toggleDropdown = (group: any) => {
    if (buttonRefs.current[group]) {
      const rect = buttonRefs.current[group].getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setActiveDropdown(activeDropdown === group ? null : group);
  };

  return (
    <nav className="flex items-center w-[330px] md:w-[660px] lg:w-[820px] lg:text-[16px] gap-3 p-1 bg-gray-100 border-b lg:p-1 overflow-x-auto scrollbar-hide text-sm md:text-[14px]">
      {Object.entries(buttonGroups).map(([groupKey, group],index) => (
        <div key={group.label} className="relative flex-shrink-0">
          <button
            ref={(el:any) => {
              //+
              if (el) {
                //+
                buttonRefs.current[groupKey] = el; //+
              } //+
            }}
            className="text-[10px]  md:text-[14px] lg:text-[16px] lg:gap-2 flex items-center gap-1 md:gap-2 px-1 py-1 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors"
            onClick={() => toggleDropdown(groupKey)}
          >
            {group.icon}
            {group.label}
            <ChevronDown
              size={12}
              className={`transform ${
                activeDropdown === groupKey ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === groupKey &&
            createPortal(
              <div
                className="fixed z-[9999]"
                style={{
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`,
                }}
              >
                <div className="bg-white border rounded-md shadow-lg">
                  <div className="max-h-[200px] w-[180px] overflow-y-auto">
                    {group.items.map((item,index) => (
                      <button
                        key={index}
                        className="w-full px-3 py-1.5 text-sm text-gray-700 text-left hover:bg-gray-50 flex items-center gap-2"
                        onClick={() => {
                          groupKey !== "font"
                            ? handleButtonClick(item)
                            : editor.chain().focus().setFontFamily(item).run();
                          setActiveDropdown(null);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>,
              document.body
            )}
        </div>
      ))}
    </nav>
  );
};

export const  FloatingMenuBar = () => {
  const { editor } = useCurrentEditor();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const MENU_WIDTH = window.innerWidth >= 660 ? window.innerWidth >= 800 ? 820 : 660:330; // Width of your menu
  const PADDING = 20; // Padding from edges

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    visible: false,
  });

  useEffect(() => {
    if (!editor) return;

    const updateMenuPosition = () => {
      const { from, to } = editor.state.selection;

      if (from !== to) {
        const startPos = editor.view.coordsAtPos(from);
        const endPos = editor.view.coordsAtPos(to);

        if (startPos && endPos) {
          const centerX = (startPos.left + endPos.left) / 2;
          const spaceOnRight = windowWidth - centerX;
          const spaceOnLeft = centerX;

          let leftPos:number;
          if (spaceOnRight >= MENU_WIDTH + PADDING) {
            leftPos = centerX;
          } else if (spaceOnLeft >= MENU_WIDTH + PADDING) {
            leftPos = centerX - MENU_WIDTH;
          } else {
            leftPos = Math.max(PADDING, windowWidth - MENU_WIDTH - PADDING);
          }

          setMenuPosition({
            top: startPos.top - PADDING,
            left: leftPos,
            visible: true,
          });
        }
      } else {
        setMenuPosition(prev => ({ ...prev, visible: false }));
      }
    };

    const cleanup = () => {
      editor.off('selectionUpdate', updateMenuPosition);
    };

    editor.on('selectionUpdate', updateMenuPosition);
    return cleanup;
  }, [editor, windowWidth, MENU_WIDTH]);

  if (!menuPosition.visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: menuPosition.top+20,
        left: menuPosition.left,
        zIndex: 1000,
        border: "0px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        padding: "0px",
        width: `${MENU_WIDTH}px`,
      }}
      className="floating-menu"
    >
      <NavBar editor={editor} />
    </div>
  );
};

