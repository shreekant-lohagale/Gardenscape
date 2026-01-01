
import HeroSection from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { GallerySection } from "@/components/sections/gallery-section";

import { Timeline } from "@/components/sections/timeline";
import ContactFooter from "@/components/sections/contact-footer";
import { MobileNav } from "@/components/ui/mobile-nav";

// ... (existing data)

const timelineData = [
  {
    title: "2022",
    content: (
      <div>
        <p className="text-[#CFD1D0] text-xs md:text-sm font-normal mb-8">
          Started Gardenscape with a small team of 3 gardeners in Pune. Local lawn care and maintenance.
        </p>
      </div>
    )
  },
  {
    title: "2023",
    content: (
      <div>
        <p className="text-[#CFD1D0] text-xs md:text-sm font-normal mb-8">
          Expanded to landscaping services and completed 50+ residential projects. Introduced organic fertilizers.
        </p>
      </div>
    )
  },
  {
    title: "2024",
    content: (
      <div>
        <p className="text-[#CFD1D0] text-xs md:text-sm font-normal mb-8">
          Launched commercial maintenance division and integrated smart irrigation systems.
        </p>
      </div>
    )
  },
  {
    title: "2025",
    content: (
      <div>
        <p className="text-[#CFD1D0] text-xs md:text-sm font-normal mb-8">
          Growing into a full-service platform for all outdoor needs. Now serving 500+ satisfied clients.
        </p>
      </div>
    )
  }
];

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background">
      <section id="hero">
        <HeroSection />
      </section>

      <section id="services">
        <ServicesSection />
      </section>

      <section id="gallery">
        <GallerySection />
      </section>

      <section id="about">
        <Timeline data={timelineData} />
      </section>

      <ContactFooter />
      <MobileNav />
    </main>
  );
}
