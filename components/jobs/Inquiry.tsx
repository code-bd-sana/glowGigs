import React from 'react'
import SectionHeader from '../shared/SectionHeader/SectionHeader'
import image from '../../public/jobs/inquiry.jpg'
import Image from 'next/image'
import SecondaryButton from '../shared/SecondaryButton'

export default function Inquiry() {
  return (
    <div className='mt-24 max-w-7xl mx-auto min-h-screen'>

        {/* heading */}
         <SectionHeader title="Land your dream job todays" description="" align="center" />
            <p className="text-base text-center flex mx-auto justify-center text-gray-600 mt-2 w-full md:w-9/12">
     Connect with top health and beauty professionals now.


      </p>



 <div className='lg:flex relative mt-16'>

<section className='hidden lg:block flex-1'>

</section>

          <section className=" flex-1 bg-[#ffe5d9] px-8 lg:w-1/2 z-5 lg:ml-16 mx-8 sm:mx-36  lg:absolute py-4 rounded-2xl">

            {/* title */}
          

            {/* form area */}
            <form className="w-full mt-[50px]">
                <div className="flex-row items-center gap-[20px]">
                    <div className="flex flex-col gap-[5px]  w-full">
                        <label className="relative">
                            <h4>Your Name</h4>
                            <input type="text"
                            placeholder='Enter Your Full Name'
                                   className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 bg-white dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] w-full focus:border-[#27292b] transition-colors duration-300"
                            />
                           
                        </label>
                    </div>

                    <div className="flex flex-col gap-[5px]  mt-8 w-full">
                        <h4>Email Adress*</h4>
                        <label className="relative">
                            <input type="email"
                            placeholder='Enter Your Email Adress'
                                   className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 bg-white dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] w-full focus:border-[#27292b] transition-colors duration-300"
                            />
                     
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                    <h4>Message*</h4>
                    <label className="relative w-full">
                                            <textarea
                                            placeholder='Type Your Message Here'
                                                className="peer bg-white min-h-[200px] border-[#e5eaf2] border rounded-md outline-none  dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                            ></textarea>
                     
                    </label>
                </div>


                    <SecondaryButton type="button" text="Submit Your Inquiry"/>

            </form>



        </section>


        <section className='flex-1 px-8 sm:px-0'>
            <Image src={image} alt='image' className='rounded-3xl   mt-16 mx-auto sm:w-[60%] lg:w-full lg:h-[500px]'/>
        </section>
 </div>
        
    </div>
  )
}
