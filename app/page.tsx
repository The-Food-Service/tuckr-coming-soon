"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaApple,
  FaBars,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PilotForm } from "@/components/PilotForm";
import { ScrollReveal } from "@/components/ScrollReveal";

/** Swap these paths for your exported PNG/WebP screenshots (e.g. /screens/outlets.png). */
const SCREEN = {
  outlets: "/placeholders/outlets.svg",
  menu: "/placeholders/menu.svg",
  order: "/placeholders/order.svg",
  vendor: "/placeholders/vendor-dashboard.svg",
} as const;

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let isHovering = false;

    const moveCursor = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dt = now - lastPos.current.t || 16;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;
      lastPos.current = { x: e.clientX, y: e.clientY, t: now };
      const scale = isHovering ? 1.5 : Math.max(1, Math.min(2.5, 1 + speed * 2));
      cursor.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0) scale(${scale})`;
      cursor.style.background = "#fff";
      cursor.style.mixBlendMode = isHovering ? "normal" : "difference";
      cursor.style.opacity = isHovering ? "0.7" : "1";
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button, a, input, textarea, select, [role=button]")) {
        isHovering = true;
        cursor.style.mixBlendMode = "normal";
        cursor.style.opacity = "0.7";
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button, a, input, textarea, select, [role=button]")) {
        isHovering = false;
        cursor.style.mixBlendMode = "difference";
        cursor.style.opacity = "1";
      }
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}

function PhoneShot({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[min(100%,260px)] min-[400px]:max-w-[280px] sm:max-w-[280px]">
      <div className="rounded-[2.25rem] border-[3px] border-white/40 bg-[#143214] p-2 shadow-[0_28px_60px_-14px_rgba(0,0,0,0.45)]">
        <div className="overflow-hidden rounded-[1.85rem] bg-[#0d260d] ring-1 ring-white/10">
          <Image
            src={src}
            alt={alt}
            width={390}
            height={844}
            className="h-auto w-full object-cover object-top"
            unoptimized
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
  className = "",
  onNavigate,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className={`rounded-full px-3 py-1.5 text-sm font-medium text-[#1e4a1d]/90 transition hover:bg-[#6FC06E]/15 hover:text-[#1e4a1d] ${className}`}
    >
      {children}
    </a>
  );
}

function StoreBadge({ compact }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#6FC06E]/15 font-semibold text-[#1e4a1d] ${
        compact
          ? "max-w-[min(100%,11rem)] shrink-0 px-2 py-1 text-[0.65rem] min-[400px]:max-w-none min-[400px]:text-xs"
          : "px-3 py-1.5 text-xs sm:text-sm"
      }`}
      title="Coming soon on the App Store and Google Play"
    >
      <FaApple className={compact ? "text-sm shrink-0" : "text-lg shrink-0"} aria-hidden />
      <FaGooglePlay className={compact ? "text-sm shrink-0" : "text-lg shrink-0"} aria-hidden />
      <span className="truncate min-[360px]:whitespace-normal">Coming soon</span>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <CustomCursor />
      <header className="fixed top-0 z-50 w-full border-b border-[#6FC06E]/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
          <a
            href="#"
            className="font-display min-w-0 shrink text-lg font-bold tracking-tight text-[#1e4a1d] sm:text-xl md:text-2xl"
          >
            Tuckr
          </a>
          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Primary"
          >
            <NavLink href="#product">App</NavLink>
            <NavLink href="#story">Why Tuckr</NavLink>
            <NavLink href="#venues">Venues</NavLink>
            <NavLink href="#pilot">Pilot</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <StoreBadge />
            </div>
            <div className="md:hidden">
              <StoreBadge compact />
            </div>
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#1e4a1d] transition hover:bg-[#6FC06E]/15 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <FaTimes className="text-xl" aria-hidden /> : <FaBars className="text-xl" aria-hidden />}
            </button>
          </div>
        </div>
        <div
          id="mobile-nav"
          className={`max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto border-t border-[#6FC06E]/10 bg-white md:hidden ${menuOpen ? "block" : "hidden"}`}
        >
          <nav className="flex flex-col px-2 py-2" aria-label="Mobile primary">
            <NavLink
              href="#product"
              onNavigate={closeMenu}
              className="rounded-xl px-4 py-3.5 text-base"
            >
              App
            </NavLink>
            <NavLink
              href="#story"
              onNavigate={closeMenu}
              className="rounded-xl px-4 py-3.5 text-base"
            >
              Why Tuckr
            </NavLink>
            <NavLink
              href="#venues"
              onNavigate={closeMenu}
              className="rounded-xl px-4 py-3.5 text-base"
            >
              Venues
            </NavLink>
            <NavLink
              href="#pilot"
              onNavigate={closeMenu}
              className="rounded-xl px-4 py-3.5 text-base"
            >
              Pilot
            </NavLink>
            <NavLink
              href="#contact"
              onNavigate={closeMenu}
              className="rounded-xl px-4 py-3.5 text-base"
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden bg-[#6FC06E] pb-14 pt-[5.25rem] text-white sm:pb-24 sm:pt-32 md:pt-32"
          aria-labelledby="hero-heading"
        >
          <div
            className="pointer-events-none absolute inset-0 hero-k-drift opacity-30"
            aria-hidden
          >
            <div className="absolute -left-1/4 top-1/4 h-96 w-[150%] rounded-full bg-[#8fd48e]/40 blur-3xl" />
            <div className="absolute -right-1/4 bottom-0 h-80 w-[120%] rounded-full bg-[#4a9e49]/35 blur-3xl" />
          </div>
          <div
            className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent hero-k-line"
            aria-hidden
          />
          <div className="relative z-10 mx-auto grid min-w-0 max-w-6xl gap-10 px-4 sm:gap-16 sm:px-6 lg:grid-cols-[1fr_minmax(0,320px)] lg:items-center lg:gap-10">
            <div className="min-w-0">
              <p className="hero-stagger-1 font-display text-xs font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-sm sm:tracking-[0.2em]">
                Campus pick &amp; go
              </p>
              <h1
                id="hero-heading"
                className="hero-stagger-2 font-display mt-3 text-[clamp(1.85rem,5.5vw+0.6rem,3.75rem)] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              >
                Pre-order food.
                <br />
                Skip the wait.
              </h1>
              <p className="hero-stagger-3 mt-5 max-w-xl text-base font-medium leading-relaxed text-white/95 sm:text-lg sm:text-xl">
                Order from campus outlets, check what&apos;s in stock, and collect when it&apos;s ready. Shorter queues,
                more time for class or a proper break.
              </p>
              <div className="hero-stagger-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#product"
                  className="font-display inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-[#1e4a1d] shadow-lg shadow-black/10 transition hover:bg-[#e8f6e8] sm:w-auto sm:min-h-0"
                >
                  See the app
                </a>
                <a
                  href="#pilot"
                  className="font-display inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:min-h-0"
                >
                  Run a pilot
                </a>
              </div>
            </div>
            <div className="hero-stagger-5 flex min-w-0 justify-center lg:justify-end">
              <PhoneShot src={SCREEN.outlets} alt="Tuckr app: campus outlets (placeholder)" priority />
            </div>
          </div>
        </section>

        {/* Early product strip */}
        <section
          id="product"
          className="scroll-mt-28 border-b border-[#6FC06E]/10 bg-[#e8f6e8] py-16 sm:scroll-mt-32 sm:py-20"
          aria-labelledby="product-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ScrollReveal>
              <h2
                id="product-heading"
                className="font-display text-center text-3xl font-bold tracking-tight text-[#1e4a1d] sm:text-4xl"
              >
                Tuckr in motion
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-base text-[#2d5a2c]/90 sm:text-lg">
                Menus that match the kitchen, a sense of how long things take, and checkout in a few taps.
              </p>
            </ScrollReveal>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <ScrollReveal delayMs={40} className="flex flex-col items-center">
                <PhoneShot src={SCREEN.menu} alt="Tuckr app: live menu (placeholder)" />
                <p className="font-display mt-4 text-center text-sm font-semibold text-[#1e4a1d]">Live menu &amp; availability</p>
              </ScrollReveal>
              <ScrollReveal delayMs={90} className="flex flex-col items-center">
                <PhoneShot src={SCREEN.order} alt="Tuckr app: order and pickup (placeholder)" />
                <p className="font-display mt-4 text-center text-sm font-semibold text-[#1e4a1d]">Order &amp; pickup, your way</p>
              </ScrollReveal>
              <ScrollReveal delayMs={140} className="flex flex-col items-center sm:col-span-2 lg:col-span-1">
                <PhoneShot src={SCREEN.outlets} alt="Tuckr app: outlets list (placeholder)" />
                <p className="font-display mt-4 text-center text-sm font-semibold text-[#1e4a1d]">Your campus, one place</p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Problem / solution */}
        <section
          id="story"
          className="scroll-mt-28 bg-white py-16 sm:scroll-mt-32 sm:py-24"
          aria-labelledby="story-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ScrollReveal>
              <h2 id="story-heading" className="font-display text-3xl font-bold text-[#1e4a1d] sm:text-4xl">
                Built for how campuses actually eat
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-neutral-700">
                Campus eating means lines, guessing what&apos;s on, and tight gaps between lectures. Tuckr is for
                students who want to know before they leave, and for outlets that need a clearer read on demand.
              </p>
            </ScrollReveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Uncertainty",
                  body: "It’s often unclear if a stall is open or if the usual dish is still there. You burn minutes walking over to find out.",
                },
                {
                  title: "Queues",
                  body: "Long lines eat into short breaks. Ordering ahead turns the wait into a fixed pickup time.",
                },
                {
                  title: "Operations",
                  body: "Staffing and stocking are easier with a view of incoming orders, without slowing down the people at the register.",
                },
              ].map((card, i) => (
                <ScrollReveal key={card.title} delayMs={i * 70} className="rounded-2xl border border-[#6FC06E]/20 bg-[#f6fbf6] p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-[#1e4a1d]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">{card.body}</p>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                { title: "Pre-order & skip the queue", body: "Order ahead, pay online or at the counter, and collect when it’s ready." },
                { title: "Live menu & wait insight", body: "See what’s in stock and get prep-time context before you commit." },
                { title: "Venue tools & offers", body: "See order volume and run simple promos without extra hassle at the counter." },
              ].map((card, i) => (
                <ScrollReveal key={card.title} delayMs={i * 80} className="rounded-2xl bg-[#6FC06E] p-6 text-white shadow-md shadow-[#2d5a2c]/20">
                  <h3 className="font-display text-lg font-bold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/95">{card.body}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-[#6FC06E]/10 bg-[#e8f6e8] py-16 sm:py-24" aria-labelledby="how-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ScrollReveal>
              <h2 id="how-heading" className="font-display text-3xl font-bold text-[#1e4a1d] sm:text-4xl">
                How it works for students
              </h2>
            </ScrollReveal>
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                { step: "01", title: "Choose your outlet", body: "Browse campus canteens, food courts, and stalls in one place." },
                { step: "02", title: "Place your order", body: "See availability and rough timing, then pay the way you prefer." },
                { step: "03", title: "Pick up when it’s ready", body: "Walk over when your order is up instead of queueing just to ask." },
              ].map((item, i) => (
                <ScrollReveal key={item.step} delayMs={i * 100} className="relative pl-12 sm:pl-14">
                  <span
                    className="font-display absolute left-0 top-0 text-3xl font-extrabold tabular-nums text-[#6FC06E]"
                    aria-hidden
                  >
                    {item.step}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#1e4a1d]">{item.title}</h3>
                  <p className="mt-2 text-neutral-700">{item.body}</p>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Venues + vendor dashboard */}
        <section
          id="venues"
          className="scroll-mt-28 bg-white py-16 sm:scroll-mt-32 sm:py-24"
          aria-labelledby="venues-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ScrollReveal>
              <h2 id="venues-heading" className="font-display text-3xl font-bold text-[#1e4a1d] sm:text-4xl">
                For colleges, canteens, and food courts
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-neutral-700">
                Hostels, courts with many stalls, kiosks, busy mess halls: anywhere people queue for food, Tuckr spreads
                demand and shortens waits. Outlets see order patterns; students spend less time standing around.
              </p>
            </ScrollReveal>
            <ScrollReveal delayMs={80} className="mt-10 overflow-hidden rounded-2xl border border-[#6FC06E]/25 bg-[#f6fbf6] p-4 shadow-inner sm:p-6">
              <Image
                src={SCREEN.vendor}
                alt="Vendor dashboard (placeholder)"
                width={1200}
                height={700}
                className="h-auto w-full rounded-xl object-cover"
                unoptimized
              />
              <p className="mt-3 text-center text-sm text-[#2d5a2c]/80">
                Replace with your vendor dashboard screenshot (wide aspect works best).
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Pilot */}
        <section
          id="pilot"
          className="scroll-mt-28 border-t border-[#6FC06E]/10 bg-[#e8f6e8] py-16 sm:scroll-mt-32 sm:py-24"
          aria-labelledby="pilot-heading"
        >
          <div className="mx-auto grid min-w-0 max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <ScrollReveal>
              <h2 id="pilot-heading" className="font-display text-3xl font-bold text-[#1e4a1d] sm:text-4xl">
                Pilot with us
              </h2>
              <p className="mt-4 text-lg text-[#2d5a2c]/95">
                We run pilots with campuses and outlet groups: menus live, payments working, then we watch whether queues
                actually shorten. Describe your site and we&apos;ll follow up.
              </p>
              <ul className="mt-6 list-inside list-disc space-y-2 text-[#1e4a1d]/90">
                <li>No big hardware rollout: digital ordering on top of how you already serve</li>
                <li>Training and launch support for outlet teams</li>
                <li>Orders, busy hours, and whether students keep using it</li>
              </ul>
            </ScrollReveal>
            <ScrollReveal delayMs={100}>
              <div className="rounded-2xl border border-[#6FC06E]/30 bg-white p-6 shadow-lg shadow-[#2d5a2c]/5 sm:p-8">
                <h3 className="font-display text-lg font-bold text-[#1e4a1d]">Request a pilot</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  Send a short note. We read each one and reply from{" "}
                  <span className="font-medium text-[#1e4a1d]">hello@tuckr.in</span>.
                </p>
                <div className="mt-6">
                  <PilotForm />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-28 bg-[#6FC06E] py-16 text-white sm:scroll-mt-32 sm:py-20"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ScrollReveal>
              <h2 id="contact-heading" className="font-display text-3xl font-bold sm:text-4xl">
                Contact us
              </h2>
              <p className="mt-3 max-w-xl text-lg text-white/95">
                Press, partners, or students with a question: write to us.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
                <a
                  href="mailto:hello@tuckr.in"
                  className="font-display break-all text-lg font-semibold underline decoration-white/40 underline-offset-4 transition hover:decoration-white sm:break-normal sm:text-xl"
                >
                  hello@tuckr.in
                </a>
                <a
                  href="tel:+919866811241"
                  className="font-display text-xl font-semibold tabular-nums underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
                >
                  +91 98668 11241
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#6FC06E]/15 bg-[#142814] py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p className="font-display text-2xl font-bold">Tuckr</p>
            <p className="mt-1 text-sm text-white/70">Campus food, ordered ahead.</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
              <FaMapMarkerAlt className="shrink-0 text-[#6FC06E]" aria-hidden />
              <span className="tabular-nums">17.5451° N, 78.5724° E</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <div className="flex gap-5 text-2xl">
              <a href="https://www.linkedin.com/company/tuckr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn className="transition hover:text-[#6FC06E]" />
              </a>
              <a href="https://www.instagram.com/tuckrfoods/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="transition hover:text-[#6FC06E]" />
              </a>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/75">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <span className="text-white/40" aria-hidden>
                •
              </span>
              <Link href="/refund" className="hover:text-white">
                Refund Policy
              </Link>
              <span className="text-white/40" aria-hidden>
                •
              </span>
              <Link href="/terms" className="hover:text-white">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
