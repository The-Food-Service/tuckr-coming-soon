'use client';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

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

export default function RefundPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-white font-[var(--font-poppins)] text-gray-900">
        {/* Top navigation */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
            <Link 
              href="/" 
              className="flex items-center gap-3 text-gray-900 hover:text-[#6FC06E] transition-colors font-semibold"
            >
              <FaArrowLeft className="text-xl" />
              <span>Back to Home</span>
            </Link>
            <div className="text-2xl font-bold text-[#6FC06E]">Tuckr</div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#6FC06E] to-[#5CB65B] text-white py-20">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Refund Policy</h1>
            <p className="text-xl opacity-90">Last Updated: {currentDate}</p>
            <p className="text-lg mt-4 opacity-90 max-w-3xl">
              This policy outlines the refund process for purchases made through the Tuckr (User) and Tuckr Partner (Vendor) applications.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="prose prose-lg max-w-none space-y-12">
            {/* For Users Section */}
            <section>
              <h2 className="text-4xl font-bold mb-8 text-gray-900 pb-4 border-b-2 border-[#6FC06E]">
                For Users (Tuckr App - Food Orders)
              </h2>

              <div className="space-y-8 mt-8">
                <div className="border-l-4 border-[#6FC06E] pl-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">1. All Food Orders Are Final</h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Once a food order is placed and payment is confirmed through the Tuckr app, the sale is final.
                  </p>
                </div>

                <div className="border-l-4 border-[#6FC06E] pl-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">2. No Cancellations</h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Orders cannot be cancelled after payment has been successfully processed.
                  </p>
                </div>

                <div className="border-l-4 border-[#6FC06E] pl-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">3. Disputes and Food Quality</h3>
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    Tuckr is a technology platform that facilitates your order with the food outlet ("Vendor"). We do not prepare, handle, or guarantee the quality of the food.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold text-lg mb-2 text-gray-900">Issues with Food:</h4>
                      <p className="text-gray-700">
                        Any issues with your order, such as cold food, incorrect items prepared by the vendor, or poor quality, must be resolved directly with the Vendor.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold text-lg mb-2 text-gray-900">User Error:</h4>
                      <p className="text-gray-700">
                        We do not provide refunds for orders placed by user error (e.g., you ordered the wrong item or wrong quantity).
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold text-lg mb-2 text-gray-900">Complaints:</h4>
                      <p className="text-gray-700">
                        While we do not process refunds for food, you may log a formal complaint about a Vendor's quality or service by contacting us at <a href="mailto:hello@tuckr.in" className="text-[#6FC06E] font-semibold hover:underline">hello@tuckr.in</a>. We will use this information for our internal review of the Vendor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* For Vendors Section */}
            <section>
              <h2 className="text-4xl font-bold mb-8 text-gray-900 pb-4 border-b-2 border-[#6FC06E]">
                For Vendors (Tuckr Partner App - Subscriptions & Deals)
              </h2>

              <div className="space-y-8 mt-8">
                <div className="border-l-4 border-[#6FC06E] pl-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">1. Subscription Fees</h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Any subscription fees, "deals," or service charges paid by a Vendor to Tuckr for use of the Tuckr Partner platform are non-refundable unless otherwise specified.
                  </p>
                </div>

                <div className="border-l-4 border-[#6FC06E] pl-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">2. Free Trials</h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    We may offer free trials to Vendors on a case-by-case basis. To request a free trial, please contact us at <a href="/contact" className="text-[#6FC06E] font-semibold hover:underline">tuckr.in/contact</a>.
                  </p>
                </div>

                <div className="border-l-4 border-[#6FC06E] pl-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">3. Case-by-Case Review</h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Outside of the policies stated above, any other requests for refunds (e.g., a billing error on a subscription) will be reviewed on a case-by-case basis. Please submit your request to <a href="mailto:hello@tuckr.in" className="text-[#6FC06E] font-semibold hover:underline">hello@tuckr.in</a> with all relevant details.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Us Section */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                If you have any questions about this Refund Policy, you can contact us:
              </p>
              <div className="space-y-3 text-lg">
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="text-2xl">📧</span>
                  <span>By email: <a href="mailto:hello@tuckr.in" className="text-[#6FC06E] font-semibold hover:underline transition-colors">hello@tuckr.in</a></span>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="text-2xl">🌐</span>
                  <span>By visiting our contact page: <a href="/contact" className="text-[#6FC06E] font-semibold hover:underline transition-colors">tuckr.in/contact</a></span>
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-lg text-gray-600">
              © {new Date().getFullYear()} Tuckr Foods. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

