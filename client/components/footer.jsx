"use client"
import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">

          <div className="mr-2">
                    <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 22V12H15V22"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
             <span className="text-xl font-semibold">Estate</span>
          </div>
          <div className="text-sm text-gray-300 space-y-1">
            <p>+1-800-555-1234</p>
            <p>estatte@gmal.com</p>
            <p>123 Serenity Boulevard, Greenwood Heights, NY 11222, United States</p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-end justify-between h-full">
          <div className="flex space-x-3 mb-3">
            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full">
              <FaFacebookF size={16} />
            </a>
            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full">
              <FaLinkedinIn size={16} />
            </a>
            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full">
              <FaYoutube size={16} />
            </a>
          </div>
          <p className="text-xs text-gray-400 text-right">
            © Copyright 2025. All Rights Reserved by oldshen
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
