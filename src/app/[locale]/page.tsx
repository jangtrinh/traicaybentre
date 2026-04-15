import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProductSection } from "@/components/product-section";
import { ProcessSection } from "@/components/process-section";
import { CalendarSection } from "@/components/calendar-section";
import { CertificationSection } from "@/components/certification-section";
import { DualCtaSection } from "@/components/dual-cta-section";
import { TestimonialSection } from "@/components/testimonial-section";
import { SocialVideoSection } from "@/components/social-video-section";
import { TinTucSection } from "@/components/tin-tuc-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <HeroSection />
      <SectionDivider from="brand" to="brand-cream" />
      <ProductSection />
      <SocialVideoSection />
      <SectionDivider from="brand-cream" to="brand" />
      <ProcessSection />
      <SectionDivider from="brand" to="brand-cream" />
      <CalendarSection />
      <CertificationSection />
      <SectionDivider from="brand-cream" to="brand" />
      <DualCtaSection />
      <TestimonialSection />
      <SectionDivider from="brand" to="brand-cream" />
      <TinTucSection />
      <FaqSection />
      <SectionDivider from="brand-cream" to="brand" />
      <ContactSection />
      <Footer />
    </>
  );
}
