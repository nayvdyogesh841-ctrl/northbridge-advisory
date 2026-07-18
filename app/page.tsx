import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { Navbar } from "@/components/Navbar";
import { Advisor } from "@/sections/Advisor";
import { Consultation } from "@/sections/Consultation";
import { FAQ } from "@/sections/FAQ";
import { Hero } from "@/sections/Hero";
import { Process } from "@/sections/Process";
import { Services } from "@/sections/Services";
import { Testimonials } from "@/sections/Testimonials";
import { TrustBar } from "@/sections/TrustBar";
import { TrustedBy } from "@/sections/TrustedBy";
import { WhyUs } from "@/sections/WhyUs";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Advisor />
        <TrustedBy />
        <Services />
        <Process />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <Consultation />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
