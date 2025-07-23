"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Code2, Menu, X } from "lucide-react";
import Link from "next/link";

const DashboardNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className='bg-black text-white'>
      <header className='border-b border-gray-800/50 backdrop-blur-sm bg-black/80 sticky top-0 z-50'>
        <div className='container mx-auto px-6 py-4 flex items-center justify-between'>
          <Link href={"/dashboard"}>
            <div className='flex items-center space-x-3'>
              <div className='relative'>
                <Code2 className='h-8 w-8 text-emerald-400' />
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse' />
              </div>
              <span className='text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                FitItFast
              </span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link href={"/dashboard/challenge/singleplayer"}>
              <Button className='bg-emerald-500 hover:bg-emerald-600 text-black font-semibold'>
                Start a SinglePlayer Challenge
              </Button>
            </Link>
            <Button className='bg-emerald-500 hover:bg-emerald-600 text-black font-semibold'>
              Start a Multiplayer Challenge
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-gray-300 hover:text-white'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden border-t border-gray-800/50 bg-black/95 backdrop-blur-sm'>
            <div className='container mx-auto px-6 py-4 space-y-4'>
              {" "}
              <Link href={"/dashboard/challenge/singleplayer"}>
                <Button className='w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold'>
                  Start a SinglePlayer Challenge
                </Button>
              </Link>
              <Button className='w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold'>
                Start a Multiplayer Challenge
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default DashboardNavbar;
