import HomeBanner from "@/components/HomeBanner";
import FindYourPerfect from "@/components/FindYourPerfect/FindYourPerfect";
import OurMission from "@/components/OurMission/OurMission";
import Testimonials from "@/components/Testimonila/Testimonial";
import Footer from "@/components/Footer/Footer";
import ConnectingProfessionals from "@/components/ConnectingProfessionals/ConnectingProfessionals";
import Community from "@/components/Community/Community";

export default function Page() {
  return (
    <div>
      <HomeBanner/>
      <FindYourPerfect />
      <OurMission />
      <ConnectingProfessionals />
      <Community />
      <Testimonials/>
      <Footer/>
    </div>
  );
}
