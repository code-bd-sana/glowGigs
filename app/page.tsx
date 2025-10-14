import HomeBanner from "@/components/HomeBanner";
import Button from "@/components/shared/Button";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import FindYourPerfect from "@/components/FindYourPerfect/FindYourPerfect";
import OurMission from "@/components/OurMission/OurMission";

export default function Page() {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <h1 className="heading text-4xl">Welcome to Glow Gigs</h1>
      <p className="text-lg">This paragraph uses Lato font by default.</p>
      <Button text="Get Started" />
      <SectionHeader
        title="our Mission"
        // subtitle="Explore Nature Safely"
        description="We aim to provide a seamless platform for specialists to find rewarding opportunities and for companies to discover exceptional talent."
        align="left"
      />

      <SectionHeader
        title="Join Us Now"
        description="Become a member and get exclusive content about eco-adventures."
        align="center"
      />
      <SectionHeader
        title="Connecting Professionals"
        description="‘We bridge the gap becween health and beauty specialists and top employers."
        // align="center"
      />
      <div>
        <div>
          <SectionHeader
            title="Find your perfect fit"
            description="GlowGigs is your online bridge to connect health and beauty specialists with top employers in the industry."
            // align="center"
          />
          <Button text="" />
        </div>
        <div></div>
      </div>
      <FindYourPerfect />
      <OurMission />
    </div>
  );
}
