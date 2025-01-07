import React from 'react';
import { Bookmark, User, Search as SearchIcon } from 'lucide-react';
import { SignOut } from '@/lib/auth/signout-button';
import { SignIn } from '@/lib/auth/signin-button';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Recommend from '@/lib/recommenddata';
import Search from '@/lib/search';

const BlogHomepage = async () => {
  const session = await auth()

  if(!session?.user){
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation - Modern and Sticky */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Blogger
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:block w-72">
                <Search />
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bookmark className="h-5 w-5 text-gray-600" />
              </button>
              
              <a 
                href="/home"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
              >
                Write a blog
              </a>
              
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="h-5 w-5 text-gray-600" />
              </button>
              
              <SignOut />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - More Dynamic */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-24">
            <div className="relative z-10">
              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover
                <span className="text-blue-600"> stories </span>
                that matter
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Join our community of writers and readers. Share your thoughts, experiences, and expertise with the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Posts - Card Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Posts
        </h2>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Recommend />
        </div>
      </div>

      {/* Topics Section - More Interactive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Explore Topics
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            'Technology',
            'Design',
            'Development',
            'Writing',
            'Business',
            'Lifestyle',
            'Art',
            'Science'
          ].map((topic) => (
            <button
              key={topic}
              className="px-6 py-3 rounded-full border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors text-gray-700 font-medium"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Footer - Modern and Clean */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: 'About',
                links: ['About Us', 'Careers', 'Contact']
              },
              {
                title: 'Help',
                links: ['FAQs', 'Guidelines', 'Support']
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Cookie Policy']
              },
              {
                title: 'Follow',
                links: ['Twitter', 'Facebook', 'Instagram']
              }
            ].map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
            © 2025 Blogger. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogHomepage;