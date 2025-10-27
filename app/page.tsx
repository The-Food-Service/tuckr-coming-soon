'use client';
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaApple, FaGooglePlay } from "react-icons/fa";
import { useEffect, useRef } from "react";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0, t: 0 });
  const lastSpeed = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let isHovering = false;

    const moveCursor = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dt = now - lastPos.current.t || 16;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;
      lastSpeed.current = speed;
      lastPos.current = { x: e.clientX, y: e.clientY, t: now };
      const scale = isHovering ? 1.5 : Math.max(1, Math.min(2.5, 1 + speed * 2));
      cursor.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0) scale(${scale})`;
      cursor.style.background = isHovering ? "#fff" : "#fff";
      cursor.style.mixBlendMode = isHovering ? "normal" : "difference";
      cursor.style.opacity = isHovering ? "0.7" : "1";
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button, a, input, textarea, select, [role=button]")) {
        isHovering = true;
        cursor.style.background = "#fff";
        cursor.style.mixBlendMode = "normal";
        cursor.style.opacity = "0.7";
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button, a, input, textarea, select, [role=button]")) {
        isHovering = false;
        cursor.style.background = "#fff";
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

  return <div ref={cursorRef} className="custom-cursor" />;
}

export default function Home() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen flex items-center justify-center bg-[#6FC06E] font-sans relative overflow-hidden">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-20">
          <div className="flex flex-col items-start">
            <span className="text-white text-3xl md:text-5xl font-bold font-[var(--font-poppins)]">Tuckr</span>
            <span className="text-white text-xs sm:text-xl font-semibold font-[var(--font-poppins)]">Your One Stop Pick & Go Solution</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 shadow-md backdrop-blur-sm">
            <FaApple className="text-white text-2xl" title="Apple Store" />
            <FaGooglePlay className="text-white text-2xl" title="Google Play Store" />
            <span className="text-white text-base font-medium font-[var(--font-poppins)] hidden sm:inline">Coming soon</span>
          </div>
        </div>

        {/* Pineapple as background behind text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <div className="relative w-[22rem] h-[22rem] sm:w-[28rem] sm:h-[28rem] opacity-75 scale-175 -z-10 -top-10 md:-top-20">
            <Image
              src="/pineapple.png"
              alt="Pineapple"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>

        {/* Main Text (centered, above pineapple) */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <h1 className="font-extrabold text-white mb-2 font-[var(--font-poppins)] text-5xl sm:text-[8rem] leading-none tracking-tighter">Coming Soon.</h1>
          <h2 className="text-xl sm:text-3xl font-semibold text-white mb-8 mt-2 px-8 md:w-1/2 font-[var(--font-poppins)]">Tuckr is under development and will soon be available for you to download on Apple Store & Google Play Store.</h2>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between items-end px-8 py-6 z-20">
          <div className="flex flex-row items-center gap-2">
            <FaMapMarkerAlt className="text-white text-3xl sm:text-4xl font-extrabold font-sans drop-shadow-lg" />
            <div className="text-white text-3xl sm:text-4xl font-extrabold font-[var(--font-poppins)] drop-shadow-lg">
              17.5451° N, 78.5724° E
            </div>
          </div>
          {/* Social Icons - bottom right */}
          <div className="flex gap-6 items-center">
            <a href="https://www.linkedin.com/company/tuckr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn className="text-white text-4xl sm:text-5xl hover:text-neutral-200 transition" />
            </a>
            <a href="https://www.instagram.com/tuckrfoods/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-white text-4xl sm:text-5xl hover:text-neutral-200 transition" />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8 z-20 hidden sm:block">
          <div className="flex items-center gap-6 text-white text-sm">
            <Link href="/privacy" className="hover:text-gray-200 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/50">•</span>
            <Link href="/refund" className="hover:text-gray-200 transition-colors">
              Refund Policy
            </Link>
            <span className="text-white/50">•</span>
            <Link href="/terms" className="hover:text-gray-200 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
