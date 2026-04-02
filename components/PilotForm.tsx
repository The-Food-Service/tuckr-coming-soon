"use client";

import { FormEvent, useState } from "react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_PILOT_ID;

export function PilotForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const organization = String(fd.get("organization") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (FORMSPREE_ID) {
      setStatus("sending");
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          setStatus("sent");
          form.reset();
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
      return;
    }

    const subject = encodeURIComponent(`Pilot inquiry: ${organization || "Tuckr"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nOrganization / campus: ${organization}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
    );
    window.location.href = `mailto:hello@tuckr.in?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-left"
      noValidate
    >
      {FORMSPREE_ID ? <input type="hidden" name="_subject" value="Tuckr pilot inquiry" /> : null}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-[#1e4a1d]">
          Name
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className="rounded-xl border border-[#6FC06E]/40 bg-white px-4 py-3 text-base text-neutral-900 outline-none ring-[#6FC06E]/30 transition focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-[#1e4a1d]">
          Organization / campus
          <input
            required
            name="organization"
            type="text"
            autoComplete="organization"
            placeholder="e.g. university or outlet group"
            className="rounded-xl border border-[#6FC06E]/40 bg-white px-4 py-3 text-base text-neutral-900 outline-none ring-[#6FC06E]/30 transition focus:ring-2"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-[#1e4a1d]">
          Work email
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="rounded-xl border border-[#6FC06E]/40 bg-white px-4 py-3 text-base text-neutral-900 outline-none ring-[#6FC06E]/30 transition focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-[#1e4a1d]">
          Phone <span className="font-normal text-[#2d5a2c]/70">(optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="rounded-xl border border-[#6FC06E]/40 bg-white px-4 py-3 text-base text-neutral-900 outline-none ring-[#6FC06E]/30 transition focus:ring-2"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-[#1e4a1d]">
        Tell us about outlets, footfall, and timeline
        <textarea
          required
          name="message"
          rows={4}
          className="resize-y rounded-xl border border-[#6FC06E]/40 bg-white px-4 py-3 text-base text-neutral-900 outline-none ring-[#6FC06E]/30 transition focus:ring-2"
          placeholder="Number of canteens or stalls, city, preferred pilot window…"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="font-display mt-2 inline-flex items-center justify-center rounded-full bg-[#6FC06E] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#2d5a2c]/15 transition hover:bg-[#5cb05b] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a pilot"}
      </button>
      {status === "sent" && FORMSPREE_ID && (
        <p className="text-sm font-medium text-[#1e4a1d]" role="status">
          Thanks — we&apos;ll get back to you shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-700" role="alert">
          Something went wrong. Email{" "}
          <a href="mailto:hello@tuckr.in" className="underline">
            hello@tuckr.in
          </a>{" "}
          directly.
        </p>
      )}
    </form>
  );
}
