import { ArrowRight, Cable, PieChart, Sparkles, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const steps = [
  { number: "01", icon: Cable, title: "Connect your world", description: "Choose from your favorite tools and data sources. Our guided setup gets you connected without the heavy lifting." },
  { number: "02", icon: Workflow, title: "Bring it all together", description: "Loopdata organizes and syncs your information, creating one consistent view across your business." },
  { number: "03", icon: PieChart, title: "See the bigger picture", description: "Build dashboards, share insights, and know exactly where to focus next." },
];

export function HowItWorks() {
  return (
    <section className="section process-section" id="how-it-works">
      <div className="container">
        <Reveal><SectionHeading eyebrow="A BETTER WAY TO WORK WITH DATA" title="Three steps to" highlight="seeing clearly." description="No complicated setup. No endless exports. Just a simpler path from raw data to real understanding." /></Reveal>
        <div className="steps-grid">
          <div className="steps-connector" aria-hidden="true"><span /><span /></div>
          {steps.map(({ number, icon: Icon, title, description }, index) => (
            <Reveal key={number} delay={index * 100}>
              <article className={`step-card step-card--${index + 1}`}>
                <div className="step-top"><span className="step-number">{number}</span><span className="step-icon"><Icon size={21} /></span></div>
                <h3>{title}</h3><p>{description}</p>
                {index === 2 ? <div className="step-result"><Sparkles size={14} /> More clarity. Better moves.</div> : <span className="step-next"><ArrowRight size={16} /></span>}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
