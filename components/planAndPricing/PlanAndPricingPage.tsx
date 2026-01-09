import React from 'react'
import Pricing from './Pricing'
import UserFeedback from './UserFeedback'
import InquiryForm from '../InquiryForm/InquiryForm'
import Testimonials from "@/components/Testimonial/Testimonial";

export default function PlanAndPricingPage() {
  return (
    <div>
      
      <Pricing/>
      <UserFeedback/>
       <Testimonials backgroundImage="/Home/bbb.jpg">
          <InquiryForm/>
      </Testimonials>
    </div>
  )
}
