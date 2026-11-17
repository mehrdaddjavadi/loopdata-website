import { ArrowUpRight, Github, Linkedin, Orbit } from "lucide-react";
import { Brand } from "@/components/brand";
import { NewsletterForm } from "@/components/newsletter-form";
import { SystemStatus } from "@/components/system-status";

const footerLinks = [
  { title: "PRODUCT", links: [{ label: "Platform", href: "#platform" }, { label: "Integrations", href: "#integrations" }, { label: "Pricing", href: "#pricing" }, { label: "Changelog", href: "#top" }] },
  { title: "COMPANY", links: [{ label: "About us", href: "#top" }, { label: "Careers", href: "#contact" }, { label: "Contact", href: "#contact" }, { label: "Book a demo", href: "#contact" }] },
  { title: "RESOURCES", links: [{ label: "Documentation", href: "#contact" }, { label: "Help center", href: "#contact" }, { label: "Privacy policy", href: "#top" }, { label: "Terms of service", href: "#top" }] },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand-column"><Brand footer /><p>Make sense of all your data.<br />Make moves that matter.</p><div className="footer-socials"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a></div></div>
          {footerLinks.map((group) => <div className="footer-link-group" key={group.title}><h4>{group.title}</h4>{group.links.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}</div>)}
          <div className="footer-newsletter"><div className="footer-newsletter-icon"><Orbit size={17} /></div><h4>Stay in the loop.</h4><p>Fresh thinking on data, analytics, and what&apos;s next.</p><NewsletterForm /></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Loopdata. All rights reserved.</span><span className="footer-made">Made for clarity <i>✳</i></span><SystemStatus /></div>
      </div>
    </footer>
  );
}
