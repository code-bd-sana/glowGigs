import HomeBanner from "@/components/HomeBanner";
import FindYourPerfect from "@/components/FindYourPerfect/FindYourPerfect";
import OurMission from "@/components/OurMission/OurMission";
import Testimonials from "@/components/Testimonial/Testimonial";
import Footer from "@/components/Footer/Footer";
import ConnectingProfessionals from "@/components/ConnectingProfessionals/ConnectingProfessionals";
import Community from "@/components/Community/Community";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <HomeBanner/>
      <FindYourPerfect />
      <OurMission />
      <ConnectingProfessionals />
      <Community />
      <Testimonials backgroundImage="/Home/testi2.webp">
        <div className="grid md:grid-cols-2 gap-10 text-center">
          {/* Testimonial 1 */}
          <div>
            <p className="text-white text-xl mb-3">★★★★★</p>
            <p className="mb-6 text-lg">
              Glowgigs helped me find my dream job in the beauty industry
              quickly and easily!
            </p>
            <div className="flex flex-col items-center">
              <Image
                src="https://i.ibb.co.com/92vzcF2/adventure-1850178-1280.jpg"
                alt="Emily"
                width={50}
                height={50}
                className="rounded-full w-8 h-8 object-cover border-2 border-white"
              />
              <p className="mt-2 text-sm font-medium">Emily R.</p>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div>
            <p className="text-white text-xl mb-3">★★★★★</p>
            <p className="mb-6 text-lg">
              The platform connects me with top professionals, making hiring a
              breeze.
            </p>
            <div className="flex flex-col items-center">
              <Image
                src="https://i.ibb.co.com/nM2hxfx/pexels-latronico-709188.jpg"
                alt="Mark"
                width={50}
                height={50}
                className="rounded-full w-8 h-8 object-cover border-2 border-white"
              />
              <p className="mt-2 text-sm font-medium">Mark T.</p>
            </div>
          </div>
        </div>
      </Testimonials>
      <Footer />
    </div>
  );
}
