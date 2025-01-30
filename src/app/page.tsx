import React from "react";
import {
  Bookmark,
  User,
  Search as SearchIcon,
} from "lucide-react";
import { SignOut } from "@/lib/auth/signout-button";
import { SignIn } from "@/lib/auth/signin-button";
import { auth } from "@/lib/utilis/auth";
import { redirect } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Recommend } from "@/ui/components/recommend";
import { Tags } from "@/ui/components/tagDisplay";
import { CardAbout } from "@/ui/components/card";
import { PopOver } from "@/ui/components/popover";
import { ContactBody, Search } from "@/ui/components";


const BlogHomepage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation - Modern and Sticky */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Blogix
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:block w-72">
                <Search />
              </div>
              {/*               
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bookmark className="h-5 w-5 text-gray-600" />
              </button> */}

              <a
                href="/editor"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
              >
                Write a blog
              </a>

              <PopOver
                title={""}
                titlestyle="bg-white"
                body={
                  <div className="w-64 py-2">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {session.user.name?.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {session.user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="py-2">
                      <a
                        href="/analysis"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {/* <DocumentTextIcon className="h-4 w-4 mr-3 text-gray-400" /> */}
                        <IoDocumentTextOutline className="h-4 w-4 mr-1 text-gray-700" />
                        Blogs Analysis
                      </a>
                      <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {/* <CogIcon className="h-4 w-4 mr-3 text-gray-400" /> */}
                        <MdOutlineContactSupport className="h-4 w-4 mr-1 text-gray-700" />
                        <ContactBody />
                      </div>
                    </div>

                    {/* Logout Button */}
                    <div className="px-4 py-2 border-t">
                      {/* <button 
                        onClick={() => signOut()}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <LogoutIcon className="h-4 w-4 mr-3" />
                        
                        Sign out
                      </button> */}

                      <SignOut />
                    </div>
                  </div>
                }
                icon={<span data-test-id="Profile"><User className="h-5 w-5 text-gray-600" /></span>}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - More Dynamic */}
      <div
        className="relative overflow-hidden bg-white"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-24">
            <div className="relative z-10">
              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover
                <span className="text-blue-600"> stories </span>
                that matter
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Join our community of writers and readers. Share your thoughts,
                experiences, and expertise with the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Posts - Card Layout */}
      <Recommend />

      {/* Topics Section - More Interactive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Explore Blogs with Tags
        </h2>
        <Tags />
      </div>

      {/* Footer - Personal Project */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <CardAbout />
      </footer>
    </div>
  );
};

export default BlogHomepage;
