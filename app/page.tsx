import HomeBanner from "@/components/HomeBanner";
import FindYourPerfect from "@/components/FindYourPerfect/FindYourPerfect";
import OurMission from "@/components/OurMission/OurMission";
import NavBar from "@/components/NavBar";
import Testimonials from "@/components/Testimonila/Testimonial";
import Footer from "@/components/Footer/Footer";
import ConnectingProfessionals from "@/components/ConnectingProfessionals/ConnectingProfessionals";
import Community from "@/components/Community/Community";

export default function Page() {
  return (
    <div>
      <NavBar></NavBar>
      <HomeBanner></HomeBanner>
      <FindYourPerfect />
      <OurMission />
      <Testimonials/>
      <Footer/>
      <ConnectingProfessionals/>
      <Community/>
    </div>
  );
}
