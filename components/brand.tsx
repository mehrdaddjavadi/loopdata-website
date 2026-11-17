import { Orbit } from "lucide-react";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`brand${footer ? " brand--footer" : ""}`} href="#top" aria-label="Loopdata home">
      <span className="brand-mark"><Orbit size={21} strokeWidth={2.2} /></span>
      <span className="brand-word">LOOP<span>DATA</span></span>
    </a>
  );
}
