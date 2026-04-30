import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { Specialties } from "@/components/sections/Specialties";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { DoctorsGrid } from "@/components/sections/DoctorsGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { AppDownload } from "@/components/sections/AppDownload";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "طهور — استشارات طبية أونلاين في المملكة العربية السعودية" },
      { name: "description", content: "احجز استشارة طبية فورية مع نخبة الأطباء المعتمدين في السعودية. تخصصات متعددة، حجز سهل، ورعاية صحية موثوقة على مدار الساعة." },
      { property: "og:title", content: "طهور — رعاية صحية رقمية في السعودية" },
      { property: "og:description", content: "نرعاك بعلم، نهتم بقلب — احجز استشارتك الطبية الآن." },
    ],
  }),
  component: Index,
});

function Index() {
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
