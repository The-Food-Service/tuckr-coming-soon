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

export default function TermsPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms and Conditions</h1>
            <p className="text-xl opacity-90">Last Updated: {currentDate}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="prose prose-lg max-w-none space-y-12">
            {/* Introduction */}
            <section className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                Welcome to Tuckr ("we," "us," or "our"). These Terms and Conditions ("Terms") govern your use of our mobile applications, Tuckr (for users, "User App") and Tuckr Partner (for vendors, "Vendor App"), and our related services (collectively, the "Services").
              </p>
              <p className="font-semibold text-gray-900">
                By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not use our Services.
              </p>
            </section>

            {/* Section 1 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">1. Description of Service</h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>Tuckr provides a technology platform that connects users ("Users") with college food outlets ("Vendors") to allow Users to pre-order food and beverages.</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Users use the Tuckr app to browse menus, place orders, and pay.</li>
                  <li>Vendors use the Tuckr Partner app to manage their outlet profile, upload menu items, and receive orders.</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">2. Accounts</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                To use our Services, you must register for an account and provide accurate information, such as your name, phone number, and email. You are responsible for safeguarding your account and for all activities that occur under it. You must notify us immediately of any breach of security.
              </p>
            </section>

            {/* Section 3 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">3. Terms for Users (Tuckr App)</h2>
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Placing Orders:</h3>
                  <p>When you place an order, you agree to pay for all items in that order.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">No Cancellations:</h3>
                  <p>Once an order is placed and payment is confirmed, it cannot be cancelled.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Disputes & Food Quality:</h3>
                  <p>Tuckr is a technology platform. We are not a restaurant or food preparation entity. The Vendor is solely responsible for the quality, preparation, temperature, and accuracy of your food order. Any disputes regarding the food (e.g., "cold food," "incorrect item prepared") must be resolved directly with the Vendor.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">User Error:</h3>
                  <p>We are not responsible for user error (e.g., ordering the wrong item or quantity) and refunds will not be issued for such errors.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Complaints:</h3>
                  <p>While we do not handle refunds for food, you may log a complaint about a Vendor by contacting us at hello@tuckr.in. We reserve the right to review the complaint and take appropriate action against the Vendor, but this does not guarantee you a refund.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">4. Terms for Vendors (Tuckr Partner App)</h2>
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Vendor Content:</h3>
                  <p>As a Vendor, you may create and upload content, including your outlet name, menu items, descriptions, prices, and photos ("Vendor Content").</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">License Grant:</h3>
                  <p>You grant Tuckr a non-exclusive, worldwide, royalty-free license to display, use, and distribute your Vendor Content within our Services.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Responsibility:</h3>
                  <p>You are solely responsible for your Vendor Content. You warrant that you have all necessary rights to your Vendor Content and that it is accurate, complete, and does not violate any laws. You are also solely responsible for the quality and preparation of all food items you sell.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Subscriptions & Free Trials:</h3>
                  <p>We may offer subscription plans or "deals" for our Services. Free trials may be offered on a case-by-case basis by contacting us at tuckr.in/contact.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">5. Prohibited Activities</h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p className="mb-4">You agree not to engage in any of the following prohibited activities:</p>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Spamming other users or Vendors with requests or messages.</li>
                    <li>Attempting to reverse-engineer, decompile, or discover the source code of our applications.</li>
                    <li>Intentionally abusing or attempting to break our API endpoints.</li>
                    <li>Posting or uploading any illegal, harassing, defamatory, or obscene content, including photos.</li>
                    <li>Using the Services for any illegal purpose or in violation of any local, state, national, or international law.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">6. Intellectual Property</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                The Services and their original content (excluding Vendor Content), features, and functionality are and will remain the exclusive property of Tuckr.
              </p>
            </section>

            {/* Section 7 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">7. Termination</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                We may terminate or suspend your account immediately, without prior notice, for any reason, including, without limitation, if you breach these Terms.
              </p>
            </section>

            {/* Section 8 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">8. Disclaimer and Limitation of Liability</h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <p className="font-semibold">The Services are provided "AS IS." Tuckr makes no warranties regarding the Services or the food provided by Vendors.</p>
                <p>In no event shall Tuckr be liable for any indirect, incidental, or special damages, including disputes, losses, or injuries arising from the conduct of Users or the quality of food provided by Vendors.</p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">9. Contact Us</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                If you have any questions about these Terms, please contact us:
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
