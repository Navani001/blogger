"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Dialog from "@mui/material/Dialog";
import { Card } from "@mui/material";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  subject?: string;
  message?: string;
}

export function ContactUs({ name, email }: any) {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    name,
    email,
    subject: "",
    message: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [open, setOpen] = React.useState(false);

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formData.subject.length < 3) {
      errors.subject = "Subject must be at least 3 characters";
    } else if (formData.subject.length > 100) {
      errors.subject = "Subject must be less than 100 characters";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters";
    } else if (formData.message.length > 1000) {
      errors.message = "Message must be less than 1000 characters";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-type": "application/json" },
        next: { revalidate: 3600 },
        cache: "force-cache",
      });

      if (!response.ok) throw new Error("Network response was not ok");
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined,
      });
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          color: "gray",
          textTransform: "none",
          fontSize: "14px",
          border: 0,
          padding: "0",
        }}
      >
        Contact Us
      </Button>
      <Dialog open={open} onClose={handleClose}>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                    type="email"
                    name="email"
                    id="email"
                    disabled
                    value={formData.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                )}
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
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Send />}
                  disabled={loading}
                  sx={{
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                    px: 3,
                    py: 1.5,
                    borderRadius: 1,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                    boxShadow: 1,
                    "&:focus": {
                      outline: "none",
                      ring: 2,
                      ringOffset: 2,
                      ringColor: "primary.light",
                    },
                  }}   
                >
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
