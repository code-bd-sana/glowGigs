import React from 'react'
import InquiryForm from '../InquiryForm/InquiryForm'

export default function GetInTouch() {
  return (
    <div
     className="min-h-screen flex flex-col pt-20 mt-16"
      style={{
        background: "linear-gradient(135deg, #f0efca, #83a7dc)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
   <div className={`text-center mx-auto text-white`}>
      <h2
        className={`text-2xl md:text-4xl lg:text-5xl font-medium mb-2 ${
    ""
        }`}
      >
Get in Touch
      </h2>
  
        <p
          className={`text-base  md:text-lg lg:text-xl  font-medium my-6 ${
        ""
          } `}
        >
     
        </p>

      <p className="text-base my-6 w-full mx-auto ">
Connect with us for your career opportunities today.
      </p>
    </div>



<InquiryForm hidden={true}/>
    </div>
  )
}
