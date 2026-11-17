"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, Mail, MessageSquareText, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";

type FormState = "idle" | "submitting" | "success" | "error";
type ApiResponse = {
  message?: string;
  error?: {
    message?: string;
    fields?: Record<string, string[]>;
  };
};

export function DemoForm() {
  const [status, setStatus] = useState<FormState>("idle");
  const [selectedPlan, setSelectedPlan] = useState("Growth");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const result = (await response.json()) as ApiResponse;

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result.error?.message ?? "We couldn't send your request. Please try again.");
        setFieldErrors(result.error?.fields ?? {});
        return;
      }

      setStatus("success");
      form.reset();
      setSelectedPlan("Growth");
    } catch {
      setStatus("error");
      setErrorMessage("Unable to reach the server. Please try again.");
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <Reveal className="contact-copy">
          <div className="section-eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h2>Make room for<br /><span className="gradient-text">better decisions.</span></h2>
          <p>See what your data can do when everything works together. Tell us a little about your team and we&apos;ll help you find your starting point.</p>
          <div className="contact-points"><div><span><CheckCircle2 size={16} /></span><b>A real conversation, not a sales script</b></div><div><span><CheckCircle2 size={16} /></span><b>A walkthrough built around your goals</b></div><div><span><CheckCircle2 size={16} /></span><b>Clear answers on setup and pricing</b></div></div>
          <div className="contact-direct"><div className="contact-direct-icon"><Mail size={17} /></div><div><small>Prefer email?</small><a href="mailto:hello@loopdata.example">hello@loopdata.example</a></div></div>
        </Reveal>
        <Reveal className="contact-form-reveal" delay={100}>
          <div className="contact-form-card">
            {status === "success" ? (
              <div className="form-success" role="status"><div className="success-icon"><CheckCircle2 size={30} /></div><h3>You&apos;re on the list.</h3><p>Thanks for reaching out. We&apos;ll be in touch to arrange your personal demo.</p><button className="button button--outline" type="button" onClick={() => setStatus("idle")}>Send another request</button></div>
            ) : (
              <>
                <div className="form-card-heading"><span className="form-kicker"><Sparkles size={13} /> LET&apos;S TALK</span><h3>Get your personal demo</h3><p>We&apos;ll be in touch to make it happen.</p></div>
                <form className="demo-form" onSubmit={handleSubmit}>
                  {status === "error" && <p className="form-error" role="alert">{errorMessage}</p>}
                  <div className="form-row"><label>Full name<input name="name" type="text" placeholder="Jamie Davis" autoComplete="name" required minLength={2} maxLength={100} aria-invalid={Boolean(fieldErrors.name)} />{fieldErrors.name?.[0] && <span className="field-error">{fieldErrors.name[0]}</span>}</label><label>Work email<input name="email" type="email" placeholder="jamie@company.com" autoComplete="email" required maxLength={254} aria-invalid={Boolean(fieldErrors.email)} />{fieldErrors.email?.[0] && <span className="field-error">{fieldErrors.email[0]}</span>}</label></div>
                  <label>Company name<input name="company" type="text" placeholder="Your company" autoComplete="organization" required maxLength={120} aria-invalid={Boolean(fieldErrors.company)} />{fieldErrors.company?.[0] && <span className="field-error">{fieldErrors.company[0]}</span>}</label>
                  <div className="form-row"><label>Team size<select name="teamSize" defaultValue="2–10 people" aria-invalid={Boolean(fieldErrors.teamSize)}><option>Just me</option><option>2–10 people</option><option>11–50 people</option><option>51–200 people</option><option>201+ people</option></select>{fieldErrors.teamSize?.[0] && <span className="field-error">{fieldErrors.teamSize[0]}</span>}</label><label>Interested in<select name="plan" value={selectedPlan} onChange={(event) => setSelectedPlan(event.target.value)} aria-invalid={Boolean(fieldErrors.plan)}><option>Starter</option><option>Growth</option><option>Scale</option><option>Enterprise</option></select>{fieldErrors.plan?.[0] && <span className="field-error">{fieldErrors.plan[0]}</span>}</label></div>
                  <label>What would you like to solve? <span className="optional-label">OPTIONAL</span><textarea name="message" rows={3} placeholder="Tell us about your data goals..." maxLength={2000} aria-invalid={Boolean(fieldErrors.message)} />{fieldErrors.message?.[0] && <span className="field-error">{fieldErrors.message[0]}</span>}</label>
                  <button className="button button--primary button--large form-submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? <>Sending request <LoaderCircle size={17} className="spin" /></> : <>Request my demo <ArrowRight size={17} /></>}</button>
                  <p className="form-privacy"><MessageSquareText size={13} /> By submitting, you agree to be contacted about Loopdata. No spam, ever.</p>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
