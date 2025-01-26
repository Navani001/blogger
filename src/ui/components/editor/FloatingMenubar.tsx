"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCurrentEditor } from "@tiptap/react";
import { createPortal } from "react-dom";
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
        .toggleHeading({ level: Number.parseInt(level[1]) })
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
      icon: <Type size={12} />,
      items: ["Bold", "Italic", "Strike", "Code", "Paragraph", "Underline"],
    },
    headings: {
      label: "Headings",
      icon: <Type size={12} className="font-bold" />,
      items: ["H1", "H2", "H3", "H4", "H5", "H6"],
    },
    lists: {
      label: "Lists",
      icon: <ListOrdered size={12} />,
      items: ["Bullet_List", "Ordered_List"],
    },
    blocks: {
      label: "Blocks",
      icon: <Code size={12} />,
      items: ["Code_Block", "Blockquote", "Horizontal_Rule", "Hard_Break"],
    },

    insert: {
      label: "Insert",
      icon: <Image size={12} />,
      items: ["Link"],
    },
    font: {
      label: "Font",
      icon: <Image size={12} />,
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
      icon: <Palette size={12} />,
      items: ["Clear_Marks", "Clear_Nodes"],
    },
    table: {
      label: "Table",
      icon: <Image size={12} />,
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
      editorActions.Heading(action);
    } else if (action in editorActions) {
      editorActions[`${action}`]();
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
    <nav className="flex items-center w-[330px] md:w-[660px] lg:w-[820px] lg:text-[16px] gap-0.5 p-1 bg-gray-100 border-b lg:p-1 overflow-x-auto scrollbar-hide text-sm md:text-[14px]">
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
            className="text-[10px]  md:text-[14px] lg:text-[16px] lg:gap-3 flex items-center gap-1 md:gap-2 px-1 py-1 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors"
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
  const MENU_WIDTH = window.innerWidth>=660?660:330; // Width of your menu
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
        border: "1px solid #ddd",
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

