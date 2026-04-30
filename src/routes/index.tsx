import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { Specialties } from "@/components/sections/Specialties";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { DoctorsGrid } from "@/components/sections/DoctorsGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { AppDownload } from "@/components/sections/AppDownload";

export default function Index() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Specialties />
      <Features />
      <HowItWorks />
      <ConsultationCTA />
      <DoctorsGrid />
      <Testimonials />
      <AppDownload />
    </>
  );
}
