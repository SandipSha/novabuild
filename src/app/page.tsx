import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import TransformShowcase from "@/components/TransformShowcase";
import CaseStudies from "@/components/CaseStudies";
import Performance from "@/components/Performance";
import Calculator from "@/components/Calculator";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Services />
        <TransformShowcase />
        <CaseStudies />
        <Performance />
        <Calculator />
        <Testimonials />
        <Process />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

