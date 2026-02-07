import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import SolutionsSection from "@/components/SolutionsSection";
import ProcessSection from "@/components/ProcessSection";
import WarrantySection from "@/components/WarrantySection";
import DealerMap from "@/components/DealerMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-dark-bg text-white selection:bg-primary-blue selection:text-white">
      <Header />
      <Hero />
      <WhySection />
      <SolutionsSection />
      <ProcessSection />
      <WarrantySection />
      {/*DealerMap />*/}
      <ContactForm />
      <Footer />
    </main>
  );
}
