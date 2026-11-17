"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Integrations", href: "#integrations" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header" id="top">
      <div className="container nav-shell">
        <Brand />
        <nav className={`nav-links${open ? " nav-links--open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <div className="mobile-nav-actions">
            <a className="button button--ghost button--small" href="#contact" onClick={closeMenu}>Log in</a>
            <a className="button button--primary button--small" href="#contact" onClick={closeMenu}>Start free <ArrowUpRight size={15} /></a>
          </div>
        </nav>
        <div className="nav-actions">
          <a className="nav-login" href="#contact">Log in</a>
          <a className="button button--primary button--small" href="#contact">Start free <ArrowUpRight size={15} /></a>
        </div>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}
