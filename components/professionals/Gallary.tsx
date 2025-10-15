import React from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import banner from '@/public/professionals/banner.jpg'
import image1 from '@/public/professionals/image1.jpg'
import image2 from '@/public/professionals/image2.jpg'
import image3 from '@/public/professionals/image3.jpg'
import image4 from '@/public/professionals/image4.jpg'
import image5 from '@/public/professionals/image5.jpg'
import Image from "next/image";
import { StaticImageData } from "next/image";

export default function Gallary() {
  
  
  interface Images {
    image: StaticImageData;
   
  }

  const images: Images[] = [
    {
      image:image1,
    },
    {
      image:image2,
    },
    {
      image:image3,
    },
    {
      image:image4,
    },
    {
      image:image5,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
   
      <section>
        <SectionHeader title="Professionals" description="" align="center" />
        <p className="text-base text-center flex mx-auto justify-center text-gray-600 mt-2 w-full md:w-9/12">
          Showcasing our specialists and their work.
        </p>
      </section>

      {/* gallary */}


      <section>

        <div className="text-center mx-auto flex justify-center mt-16 ">
            <Image   src={banner} alt="banner" className="rounded-2xl w-full"/>
        </div>


      </section>


      {/* image */}

      <section className="grid grid-cols-1 justify-center mx-auto gap-3 lg:grid-cols-5 mt-4">

{
  images?.map((img, idx)=>(
   
<Image key={idx} src={img.image} alt="image" className="rounded-2xl justify-center my-4 lg:my-0 text-center mx-auto w-full"/>
   
  ))
}

     

      </section>
    </div>
  );
}
