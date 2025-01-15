"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Dialog from "@mui/material/Dialog";
import { Card } from "@mui/material";
import { auth } from "../../../../lib/utilis/auth";

export  function ContactUs({name, email}:any) {
  
  const [formData, setFormData] = React.useState({
    name,
    email,
    subject: '',
    message: ''
  });

  const handleSubmit =async (e:any) => {
    e.preventDefault();
    console.log("hello everyone")
    // Add form submission logic here
    console.log('Form submitted:', formData);
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({ name: formData.name, email: formData.email, subject: formData.subject, message: formData.message }),
      headers: { "Content-type": "application/json" },
      next: { revalidate: 3600 },
  // Cache for 1 hour
      cache: "force-cache",
   
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      handleClose()

  };

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        className=""
        onClick={handleClickOpen}
        sx={{
          color: "gray",
          textTransform: "none",
          fontSize: "14px",
          border: 0,
          padding: "0",
        }}
      >
        contact Us
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <div className="lg:col-span-2">
          <Card className="p-6">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
         disabled
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                   disabled
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </Card>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
