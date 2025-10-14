import HomeBanner from "@/components/HomeBanner";
import Button from "@/components/shared/Button";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import FindYourPerfect from "@/components/FindYourPerfect/FindYourPerfect";
import OurMission from "@/components/OurMission/OurMission";
import NavBar from "@/components/NavBar";
import Testimonials from "@/components/Testimonila/Testimonial";
import Footer from "@/components/Footer/Footer";

export default function Page() {
  return (
    <div>
      <NavBar></NavBar>
      <HomeBanner></HomeBanner>
      <FindYourPerfect />
      <OurMission />
      <Testimonials/>
      <Footer/>
    </div>
  );
}
