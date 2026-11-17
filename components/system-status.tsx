"use client";

import { useEffect, useState } from "react";

type Status = "checking" | "operational" | "unavailable";

export function SystemStatus() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/health", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Health check failed.");
        return response.json();
      })
      .then((result: { status?: string }) => {
        setStatus(result.status === "ok" ? "operational" : "unavailable");
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setStatus("unavailable");
      });

    return () => controller.abort();
  }, []);

  const label = {
    checking: "Checking systems",
    operational: "All systems operational",
    unavailable: "System status unavailable",
  }[status];

  return (
    <span className={`footer-status footer-status--${status}`} role="status">
      <i aria-hidden="true" /> {label}
    </span>
  );
}
