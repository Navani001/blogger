'use client'
import { useState } from "react";
import Tiptap from "../../lib/TextEditor";
import create_database from "@/lib/blogcreate";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  Button,
  useDisclosure 
} from "@nextui-org/react";
import BlogModal from "@/lib/model";
import Publish from "@/lib/model";
 // Renamed for clarity

export default function Home() {
  const [content, setContent] = useState<string>("");
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
const [title,settitle] = useState<string>("")
  const handleSubmit = async () => {
   
    await create_database(content,title);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        maxWidth="full"
        position="sticky"
        className="bg-white shadow-sm"
      >
        <NavbarBrand>
          <p className="font-bold text-2xl">Blogger</p>
        </NavbarBrand>
        <NavbarContent justify="end">

       
          <Publish handleSumbit={handleSubmit} settitle={settitle} title={title}/> 
        
      
        </NavbarContent>
      </Navbar>

      <div className="mx-auto py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Tiptap content={content} setcontent={setContent} />
        </div>
      </div>
      
    
    </div>
  );
}


