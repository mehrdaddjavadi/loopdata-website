import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { DashboardPreview } from "@/components/dashboard-preview";
import { Features } from "@/components/features";
import { Integrations } from "@/components/integrations";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { DemoForm } from "@/components/demo-form";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  return (
    <main>
      <div className="ambient ambient--one" aria-hidden="true" />
      <div className="ambient ambient--two" aria-hidden="true" />
      <Navbar />
      <Hero />
      <section className="dashboard-section" aria-label="Product dashboard preview">
        <Reveal className="container dashboard-reveal">
          <DashboardPreview />
        </Reveal>
      </section>
      <Features />
      <Integrations />
      <HowItWorks />
      <Pricing />
      <DemoForm />
      <Footer />
    </main>
  );
}
