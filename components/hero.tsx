import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-pulse" /> THE DATA PLATFORM FOR WHAT'S NEXT</div>
          <h1>Make your data<br />work <span className="gradient-text">in sync.</span></h1>
          <p className="hero-description">
            Bring every source together. Find the signal in the noise.
            Turn scattered information into your next smart move.
          </p>
          <div className="hero-actions">
            <a className="button button--primary button--large" href="#contact">
              Start for free <ArrowUpRight size={17} />
            </a>
            <a className="button button--text button--large" href="#platform">
              Explore the platform <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span className="avatar avatar--a">JD</span>
              <span className="avatar avatar--b">MK</span>
              <span className="avatar avatar--c">AL</span>
              <span className="avatar avatar--d">RS</span>
            </div>
            <div className="proof-copy">
              <div className="proof-stars">★★★★★ <span>4.9/5</span></div>
              <span>Built for teams that move with data</span>
            </div>
          </div>
          <div className="hero-assurance"><Check size={14} /> No credit card required <span /> Free 14-day trial</div>
        </div>

        <div className="hero-art" aria-label="Abstract illustration of connected data streams">
          <div className="hero-orbit hero-orbit--outer" />
          <div className="hero-orbit hero-orbit--inner" />
          <div className="hero-glow" />
          <div className="data-node data-node--top"><span className="node-icon node-icon--violet">↗</span><span><b>Sources synced</b><small>All systems go</small></span><i /></div>
          <div className="data-node data-node--right"><span className="node-icon node-icon--cyan">⌁</span><span><b>Live processing</b><small>2.4k events / sec</small></span><i /></div>
          <div className="data-node data-node--bottom"><span className="node-icon node-icon--blue">◫</span><span><b>Insights ready</b><small>Updated just now</small></span><i /></div>
          <div className="hero-core">
            <div className="core-ring core-ring--one" />
            <div className="core-ring core-ring--two" />
            <div className="core-logo"><Sparkles size={34} strokeWidth={1.5} /></div>
            <span>ONE CLEAR VIEW</span>
          </div>
          <div className="orbit-dot orbit-dot--one" />
          <div className="orbit-dot orbit-dot--two" />
          <div className="orbit-dot orbit-dot--three" />
          <div className="hero-floating-label"><span className="mini-wave">⌁</span> Data, in motion</div>
        </div>
      </div>
      <div className="hero-bottom container">
        <span>ONE WORKSPACE. EVERY SIGNAL.</span>
        <div className="hero-bottom-line" />
        <span className="hero-bottom-note">Less busywork. Better decisions.</span>
      </div>
    </section>
  );
}
