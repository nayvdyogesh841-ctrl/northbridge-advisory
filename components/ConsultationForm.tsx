"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { advisor, services } from "@/lib/content";
import { easePremium } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { LiquidLight } from "./LiquidLight";
import { Button } from "./Button";
import { ArrowRight, Check } from "./Icons";

const fieldClass =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 transition-all duration-300 ease-premium hover:border-ink/25 focus:border-ink/50 focus:outline-none focus:ring-4 focus:ring-ink/[0.06]";

const labelClass = "text-sm font-medium text-ink";

export function ConsultationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Client-side demo submission. Wire to an API route / CRM in production.
    setStatus("submitting");
    window.setTimeout(() => setStatus("done"), 700);
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easePremium }}
        className="glass flex flex-col items-center justify-center rounded-card p-10 text-center"
      >
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easePremium }}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-fg"
        >
          <Check className="h-7 w-7" />
        </motion.span>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
          Request received
        </h3>
        <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-muted">
          Thank you. {advisor.name} will personally review your details and reach out
          within one business day to schedule your consultation.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="liquid glass rounded-card p-7 sm:p-8"
      noValidate
    >
      <LiquidLight variant="panel" />
      <div className="liquid-content">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Priya Nair"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="priya@company.com"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="service" className={labelClass}>
            Service needed
          </label>
          <select id="service" name="service" className={cn(fieldClass, "appearance-none")}>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
            <option value="other">Something else</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us a little about your business and what you need..."
          className={cn(fieldClass, "resize-none")}
        />
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ink-muted">
          We reply within one business day. Your details stay private.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? "Sending..." : "Request consultation"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      </div>
    </form>
  );
}
