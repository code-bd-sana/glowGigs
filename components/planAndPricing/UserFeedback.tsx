import React from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import user1 from '../../public/jobs/user.jpg'
import user2 from '../../public/jobs/user2.jpg'
import Image from "next/image";
const feedbacks = [
  {
    name: "Jessica N.",
    location: "Los Angeles",
    feedback:
      "I found the perfect job through this service. Highly recommend it to anyone looking for new opportunities.",
      image:user1
  },
  {
    name: "John S.",
    location: "New York",
    feedback:
      "This platform helped me connect with great employers quickly, landing me a second job.",
           image:user1
  },
];

export default function UserFeedback() {
  return (
    <div className="mt-24 max-w-7xl  mx-auto">
      {/* Header */}
      <section>
        <SectionHeader title="User Feedback" description="" align="center" />
        <p className="text-base text-center flex mx-auto justify-center text-gray-600 mt-2 w-full md:w-9/12">
          Hear what our customers have to say.
        </p>
      </section>

      {/* Feedback Cards */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6  mx-auto px-4">
        {feedbacks.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#f3f5f8] p-8  shadow-sm flex flex-col justify-between"
          >
            {/* Stars */}
            <div className="flex text-black mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Feedback Text */}
            <p className="text-gray-700 leading-relaxed mb-8 mt-4">{item.feedback}</p>

            {/* User Info */}
            <div className="flex items-center gap-3 mt-8">
           <Image src={item?.image} alt="image" className="rounded-full"/>
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-gray-500 text-sm">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
