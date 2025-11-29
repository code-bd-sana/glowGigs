'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';


const NavBar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);


  if(pathname.includes('/dashboard')){
    return null;
  }


  const getLinkClassName = (path: string) => {
    const base =
      'text-[16px] font-medium text-black relative w-fit after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-300';
    const active = pathname === path ? 'after:w-full' : 'after:w-0 hover:after:w-full';
    return `${base} ${active}`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg py-[8px] px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
         <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"        
            alt="GlowGigs Logo"
            width={70}             
            height={40}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 items-center">
          <Link href="/" className={getLinkClassName('/')}>Home</Link>
          <Link href="/jobs" className={getLinkClassName('/jobs')}>Jobs</Link>
          <Link href="/plans-pricing" className={getLinkClassName('/plans-pricing')}>Plans & Pricing</Link>
          <Link href="/business" className={getLinkClassName('/business')}>List Your Business</Link>
          <Link href="/professionals" className={getLinkClassName('/professionals')}>Professionals</Link>
          <Link href="/showcase" className={getLinkClassName('/showcase')}>Showcase</Link>
          <Link href="/dashboard">
           <div className='text-black'>
             <FaUserCircle size={24} />
           </div>
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link href="/dashboard">
             <div className='text-black'>
             <FaUserCircle size={24} />
           </div>
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <div className='text-black'><RxCross2 size={24} /></div> : <div className='text-black'><RxHamburgerMenu size={24} /></div> }
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-4 mt-6 items-end text-right">
          <Link href="/" onClick={() => setMenuOpen(false)} className={getLinkClassName('/')}>Home</Link>
          <Link href="/jobs" onClick={() => setMenuOpen(false)} className={getLinkClassName('/jobs')}>Jobs</Link>
          <Link href="/plans-pricing" onClick={() => setMenuOpen(false)} className={getLinkClassName('/plans-pricing')}>Plans & Pricing</Link>
          <Link href="/business" onClick={() => setMenuOpen(false)} className={getLinkClassName('/business')}>List Your Business</Link>
          <Link href="/professionals" onClick={() => setMenuOpen(false)} className={getLinkClassName('/professionals')}>Professionals</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
