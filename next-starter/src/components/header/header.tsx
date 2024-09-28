"use client";

import Link from "next/link";
import React, { useState } from "react";

import { ThemeToggle } from "@/components/header/components/themeToggle";

import Sidebar from "./components/Sidebar";
import AuthButton from "./components/authButton";

//import SignUpButton from "./components/signUpButton";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex h-14 max-w-4xl items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={toggleSidebar} className="text-2xl md:hidden">
                ☰
              </button>
              <Link
                href="/"
                className="keychainify-checked flex items-center space-x-2"
              >
                <span className="font-bold">Logo</span>
              </Link>
            </div>
            <div className="hidden items-center space-x-4 md:flex">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              {/* Add more menu items here as needed */}
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <AuthButton />
              {/* <SignUpButton /> */}
            </div>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
