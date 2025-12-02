import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { QuickOrder } from "@/components/QuickOrder";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Hero />
        <Services />
        <HowItWorks />
        <QuickOrder />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
