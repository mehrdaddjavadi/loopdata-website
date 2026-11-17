"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

type ApiResponse = {
  message?: string;
  error?: {
    message?: string;
    fields?: Record<string, string[]>;
  };
};

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const result = (await response.json()) as ApiResponse;

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error?.fields?.email?.[0] ?? result.error?.message ?? "We couldn't subscribe you. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(result.message ?? "You're subscribed.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Unable to reach the server. Please try again.");
    }
  }

  return (
    <>
      {status === "success" ? (
        <p className="newsletter-message" role="status">
          <CheckCircle2 size={13} /> {message}
        </p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="newsletter-email">Email address</label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
            maxLength={254}
            aria-describedby={status === "error" ? "newsletter-message" : undefined}
          />
          <button type="submit" aria-label="Subscribe to the newsletter" disabled={status === "submitting"}>
            {status === "submitting" ? <LoaderCircle size={14} className="spin" /> : <ArrowRight size={14} />}
          </button>
        </form>
      )}
      {status === "error" && <p className="newsletter-message newsletter-message--error" id="newsletter-message" role="alert">{message}</p>}
    </>
  );
}
