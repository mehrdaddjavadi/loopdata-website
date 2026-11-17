import { ArrowUpRight, Plus, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const integrations = [
  { name: "Google Sheets", type: "Spreadsheets", mark: "▦", className: "integration-google" },
  { name: "PostgreSQL", type: "Database", mark: "◉", className: "integration-postgres" },
  { name: "Stripe", type: "Payments", mark: "S", className: "integration-stripe" },
  { name: "HubSpot", type: "CRM", mark: "h", className: "integration-hubspot" },
  { name: "Salesforce", type: "CRM", mark: "☁", className: "integration-salesforce" },
  { name: "BigQuery", type: "Cloud data", mark: "◈", className: "integration-bigquery" },
  { name: "Notion", type: "Workspace", mark: "N", className: "integration-notion" },
  { name: "Shopify", type: "Commerce", mark: "S", className: "integration-shopify" },
];

export function Integrations() {
  return (
    <section className="section integrations-section" id="integrations">
      <div className="container integrations-layout">
        <Reveal className="integrations-copy">
          <SectionHeading align="left" eyebrow="PLAYS WELL WITH YOUR STACK" title="Your tools have data." highlight="Now they talk." description="Connect the platforms you already use. Loopdata brings every signal into one shared source of truth." />
          <div className="integration-stats"><div><strong>100+</strong><span>Ways to connect</span></div><i /><div><strong>1-click</strong><span>Guided setup</span></div></div>
          <a className="text-link" href="#contact">Explore all integrations <ArrowUpRight size={15} /></a>
        </Reveal>
        <Reveal className="integration-visual" delay={100}>
          <div className="integration-orbit integration-orbit--one" /><div className="integration-orbit integration-orbit--two" />
          <div className="integration-center"><div><Workflow size={26} /></div><b>LOOPDATA</b><span>Unified data layer</span></div>
          {integrations.map((item, index) => (
            <div className={`integration-tile integration-tile--${index + 1}`} key={item.name}>
              <span className={`integration-mark ${item.className}`}>{item.mark}</span>
              <span><b>{item.name}</b><small>{item.type}</small></span>
              <i className="integration-connected" />
            </div>
          ))}
          <div className="integration-more"><Plus size={15} /> And many more</div>
        </Reveal>
      </div>
    </section>
  );
}
