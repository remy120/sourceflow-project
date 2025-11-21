'use client';

import { useIntl } from "react-intl";
import CompanyLogos from "@/src/components/Home/CompanyLogos/CompanyLogos";
import Header from "@/src/components/Home/Header/Header";
import Footer from "@/src/components/Home/Footer/Footer";
import HeroSection from "@/src/components/Home/HeroSection/HeroSection";
import LatestJobsSection from "@/src/components/Home/LatestJobsSection/LatestJobsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Who We Work With Section */}
      <CompanyLogos />

      {/* Latest Jobs Section */}
      <LatestJobsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}