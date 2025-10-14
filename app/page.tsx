import HomeBanner from "@/components/HomeBanner";
import FindYourPerfect from "@/components/FindYourPerfect/FindYourPerfect";
import OurMission from "@/components/OurMission/OurMission";
import NavBar from "@/components/NavBar";
import ConnectingProfessionals from "@/components/ConnectingProfessionals/ConnectingProfessionals";
import Community from "@/components/Community/Community";

export default function Page() {
  return (
    <div>
      <NavBar></NavBar>
      <HomeBanner></HomeBanner>
      <FindYourPerfect />
      <OurMission />
      <ConnectingProfessionals/>
      <Community/>
    </div>
  );
}
