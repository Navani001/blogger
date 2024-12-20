'use client'

import { useState } from "react";
import Tiptap from "../../lib/TextEditor";
import create_database from "@/lib/blogcreate";
import { Navbar, NavbarBrand, NavbarContent, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";

const contentmain = ``

export default function Home() {
  const [content, setcontent] = useState<string>(contentmain);
  const [pageUrl, setPageUrl] = useState("");
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleSubmit = async () => {
    if (pageUrl.trim()) {
      await create_database(content);
      onClose();
      setPageUrl("");
      // You might want to add success notification or redirect here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <Navbar 
        maxWidth="full" 
        position="sticky" 
        className="bg-white shadow-sm"
      >
        <NavbarBrand>
          <p className="font-bold text-2xl">Blogger</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Button
            color="primary"
            onClick={onOpen}
            size="lg"
            className="px-8"
          >
            Publish Post
          </Button>
        </NavbarContent>
      </Navbar>

      {/* Main Content */}
      <div className=" mx-auto py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Tiptap content={content} setcontent={setcontent} />
        </div>
      </div>

      {/* Submit Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="lg"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Publish Your Post
          </ModalHeader>
          <ModalBody>
            <Input
              label="Page URL"
              placeholder="Enter the URL for your post"
              variant="bordered"
              value={pageUrl}
              onChange={(e) => setPageUrl(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              This URL will be used to access your blog post. Make sure it's unique and descriptive.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onClick={onClose}
            >
              Cancel
            </Button>
           
            <button className="p-1">   Publish </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}