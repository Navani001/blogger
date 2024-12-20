import React from 'react';
import { Search, Bookmark, User } from 'lucide-react';

const BlogHomepage = () => {
  const featuredPosts = [
    {
      title: "Getting Started with Next.js and TypeScript",
      excerpt: "Learn how to build modern web applications with Next.js and TypeScript",
      author: "Jane Smith",
      date: "Dec 18, 2024",
      category: "Development",
      readTime: "5 min read"
    },
    {
      title: "Mastering Tailwind CSS",
      excerpt: "A comprehensive guide to using Tailwind CSS in your projects",
      author: "John Doe",
      date: "Dec 17, 2024",
      category: "Design",
      readTime: "8 min read"
    }
  ];

  return (
    <div className="w-full h-full bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-800">Blogger</div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bookmark className="h-6 w-6 text-gray-600" />
              </button>
              <a className="p-2 rounded-xl text-black border-1 bg-blue-500" href='/home'>
                write your blog
              </a>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Blogger
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Posts</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-blue-600 font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {post.author}
                      </p>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Topics</h2>
        <div className="flex flex-wrap gap-4">
          {['Technology', 'Design', 'Development', 'Writing', 'Business', 'Lifestyle'].map((topic) => (
            <button
              key={topic}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Help</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Guidelines</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Follow</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Facebook</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogHomepage;