"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const plans = [
  {
    name: "Starter", description: "For curious teams getting started.", monthly: 0, yearly: 0, suffix: "forever", featured: false,
    features: ["3 data source connections", "2 dashboards", "Daily data refresh", "Basic visualizations", "Community support"],
    unavailable: ["Team collaboration", "Advanced analytics"],
    cta: "Get started free",
  },
  {
    name: "Growth", description: "For teams ready to move faster.", monthly: 49, yearly: 39, suffix: "/ user / month", featured: true,
    features: ["Unlimited data connections", "Unlimited dashboards", "Hourly data refresh", "Advanced visualizations", "Team collaboration", "Priority support"],
    unavailable: [],
    cta: "Start 14-day trial",
  },
  {
    name: "Scale", description: "For organizations going all in.", monthly: 149, yearly: 119, suffix: "/ user / month", featured: false,
    features: ["Everything in Growth", "Real-time data refresh", "Custom data pipelines", "Advanced permissions", "Dedicated success manager", "Custom onboarding"],
    unavailable: [],
    cta: "Talk to our team",
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <Reveal><SectionHeading eyebrow="SIMPLE, TRANSPARENT PRICING" title="Room to grow." highlight="No surprises." description="Start small, scale when you're ready. Every plan comes with the tools to turn data into direction." /></Reveal>
        <Reveal className="billing-row" delay={70}>
          <span className={!annual ? "billing-active" : ""}>Monthly</span>
          <button className={`billing-toggle${annual ? " is-annual" : ""}`} type="button" role="switch" aria-checked={annual} aria-label="Toggle annual billing" onClick={() => setAnnual((value) => !value)}><span /></button>
          <span className={annual ? "billing-active" : ""}>Yearly</span><span className="save-pill">Save 20%</span>
        </Reveal>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 90} className="pricing-reveal">
              <article className={`pricing-card${plan.featured ? " pricing-card--featured" : ""}`}>
                {plan.featured && <div className="popular-tag">MOST POPULAR</div>}
                <div className="plan-name-row"><h3>{plan.name}</h3>{plan.featured && <span className="plan-spark">✳</span>}</div>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price"><strong>{plan.monthly === 0 ? "$0" : `$${annual ? plan.yearly : plan.monthly}`}</strong><span>{plan.suffix}</span></div>
                {plan.monthly !== 0 && <p className="billing-caption">{annual ? "Billed annually" : "Billed monthly"}</p>}
                <a className={`button ${plan.featured ? "button--primary" : "button--outline"} plan-cta`} href="#contact">{plan.cta}<ArrowUpRight size={15} /></a>
                <div className="plan-divider" />
                <span className="plan-includes">WHAT&apos;S INCLUDED</span>
                <ul className="plan-features">{plan.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}{plan.unavailable.map((feature) => <li className="muted-feature" key={feature}><Minus size={15} />{feature}</li>)}</ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal><p className="pricing-footnote">Need something more tailored? <a href="#contact">Let&apos;s talk about an Enterprise plan <ArrowUpRight size={13} /></a></p></Reveal>
      </div>
    </section>
  );
}
