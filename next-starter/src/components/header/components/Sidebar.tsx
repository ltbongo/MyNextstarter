"use client";

import Link from "next/link";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-background shadow-lg ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
      >
        <div className="flex h-full flex-col bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={onClose} className="text-2xl">
              &times;
            </button>
          </div>
          <nav className="flex-grow p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block rounded px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block rounded px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block rounded px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
