// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="footer bg-black sm:footer-horizontal text-base-content p-10">
//       <nav>
//         <h6 className="footer-title">Services</h6>
//         <a className="link link-hover">Branding</a>
//         <a className="link link-hover">Design</a>
//         <a className="link link-hover">Marketing</a>
//         <a className="link link-hover">Advertisement</a>
//       </nav>
//       <nav>
//         <h6 className="footer-title">Company</h6>
//         <a className="link link-hover">About us</a>
//         <a className="link link-hover">Contact</a>
//         <a className="link link-hover">Jobs</a>
//         <a className="link link-hover">Press kit</a>
//       </nav>
//       <nav>
//         <h6 className="footer-title">Legal</h6>
//         <a className="link link-hover">Terms of use</a>
//         <a className="link link-hover">Privacy policy</a>
//         <a className="link link-hover">Cookie policy</a>
//       </nav>
//       <form>
//         <h6 className="footer-title">Newsletter</h6>
//         <fieldset className="w-80">
//           <label>Enter your email address</label>
//           <div className="">
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               className="input join-item bg-white text-gray-600"
//             />
//             <button className="bg-[rgb(65,107,215)] hover:bg-[#686df3] hover:bg- px-8 py-3 my-6 rounded-full">
//               Submit Application
//             </button>
//           </div>
//         </fieldset>
//       </form>
//     </footer>
//   );
// };

// export default Footer;

// components/Footer.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.includes("/dashboard")) {
    return null;
  }

  return (
    <footer className='bg-black text-white px-6 py-12'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6 md:gap-12'>
        {/* Connect Section */}
        <div>
          <p className='text-2xl font-semibold mb-3'>Connect</p>
          <p className='text-gray-300 mb-6 leading-relaxed'>
            Bridging health and beauty professionals with employers.
          </p>
          <div className='flex gap-5 text-xl mb-6'>
            <Link
              target='_blank'
              href='https://www.facebook.com/share/1GQ1KSyyds/?mibextid=wwXIfr'>
              <FaFacebookF className='cursor-pointer hover:text-blue-500' />
            </Link>
            <Link
              target='_blank'
              href='https://www.instagram.com/glowgigs?igsh=cDJrdnAyMDk2NTZl'>
              <FaInstagram className='cursor-pointer hover:text-pink-500' />
            </Link>
            {/* <FaTiktok className='cursor-pointer hover:text-gray-400' />
            <FaXTwitter className='cursor-pointer hover:text-gray-400' /> */}
          </div>
          <p className='text-sm mt-20'>© 2025. All rights reserved.</p>
        </div>

        <div className='flex flex-col md:flex-row gap-6 md:gap-16'>
          {/* Contact Section */}
          <div>
            <p className='font-semibold mb-3'>CONTACT</p>
            {/* <p className="text-gray-300 mb-1">+1-800-555-0199</p> */}
            <p className='text-gray-300'>info@glowgigs.com</p>
          </div>
          {/* Follow Section */}
          {/* <div>
            <p className='font-semibold mb-3'>FOLLOW</p>
            <label className='block mb-1'>Your Name</label>
            <input
              type='text'
              placeholder='Enter your full name'
              className='w-full p-2 md:p-4 rounded  md:rounded-xl text-black bg-white mb-3'
            />
            <button className='bg-[rgb(65,107,215)]  hover:bg-[#686df3] text-white px-5 py-2 md:px-7 md:py-3 rounded-full text-sm md:text-base'>
              Submit Application
            </button>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
