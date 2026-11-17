import {
  Activity, ArrowUpRight, BarChart3, Blocks, Fingerprint,
  Gauge, LockKeyhole, Workflow,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const features = [
  { icon: Workflow, color: "violet", title: "Everything, connected", description: "Bring your tools, databases, and cloud apps into one reliable data layer. No more scattered spreadsheets." },
  { icon: BarChart3, color: "cyan", title: "Clarity at a glance", description: "Build live dashboards that turn complex metrics into a story your whole team can understand." },
  { icon: Activity, color: "blue", title: "Insights that move", description: "Spot trends, catch anomalies, and surface meaningful changes before they become missed opportunities." },
  { icon: Gauge, color: "orange", title: "Built for real-time", description: "Keep your numbers fresh with automated syncs and transparent pipeline health, all in one place." },
  { icon: Fingerprint, color: "pink", title: "Your data, protected", description: "Stay in control with granular access, secure connections, and clear visibility into your workspace." },
  { icon: Blocks, color: "green", title: "Fits your workflow", description: "Start with the stack you have and expand when you need to. Your setup stays flexible as you grow." },
];

export function Features() {
  return (
    <section className="section features-section" id="platform">
      <div className="container">
        <Reveal><SectionHeading eyebrow="THE LOOPDATA ADVANTAGE" title="From scattered data to" highlight="clear direction." description="Everything your team needs to connect the dots, understand the big picture, and make confident decisions." /></Reveal>
        <div className="features-grid">
          {features.map(({ icon: Icon, color, title, description }, index) => (
            <Reveal key={title} delay={index * 65} className="feature-reveal">
              <article className="feature-card">
                <div className={`feature-icon feature-icon--${color}`}><Icon size={21} strokeWidth={1.8} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="feature-arrow"><ArrowUpRight size={16} /></span>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="feature-note-wrap">
          <div className="feature-note"><span className="feature-note-icon"><LockKeyhole size={16} /></span><span><b>Designed for trust from day one.</b> Your data stays yours. We connect the dots, never take ownership.</span><a href="#contact">Learn about security <ArrowUpRight size={14} /></a></div>
        </Reveal>
      </div>
    </section>
  );
}
