import React from 'react'
import SectionHeader from '../shared/SectionHeader/SectionHeader'

export default function Faq() {

interface Faq {
  heading:string,
  description:string
};


const faq:Faq[]=[
  {
    heading:"How do I apply",
    description:"You can apply through our website by submitting your resume and filling out the application form."
  },
  {
    heading:"What types of jobs?",
    description:"We offer various roles in health and beauty sectors."
  },
  {
    heading:"What is the application process?",
    description:"The application process involves submitting your resume and attending an interview."
  },
  {
    heading:"How can I improve my profile?",
    description:"Enhance your profile by adding certifications and relevant experience."
  },

  {
    heading:"Are there remote positions available?",
    description:"Yes, we have remote positions available for qualified candidates in various specialties."
  }
]

  return (
    <div className='lg:flex justify-between max-w-7xl mx-auto mt-20'>


    <section className='flex-1'>

   <div className='mt-16 text-center lg:text-left flex justify-center'>
       <SectionHeader title="Job Opportunities" description="" align="left" />
   </div>

      
    </section>
    <section className='px-8 sm:px-24 lg:px-4 flex-1'>

      {
        faq.map((faq, idx)=>(
          <div key={idx} className='bg-[#f8f8e6] py-8 my-8 rounded  px-4'>

            <strong className='text-xl'>{faq.heading}</strong>
             <p className="text-base  text-gray-600  mt-2 w-full md:w-9/12">
       {faq?.description}


      </p>


          </div>
        ))
      }

      
    </section>
    </div>
  )
}
