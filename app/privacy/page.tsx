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

export default function PrivacyPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl opacity-90 mb-4">Last Updated: {currentDate}</p>
            <p className="text-lg opacity-90 max-w-3xl">
              This Privacy Policy describes how Tuckr ("we," "us," or "our") collects, uses, and discloses your information when you use our mobile applications, Tuckr (for users) and Tuckr Partner (for vendors), and any related services (collectively, the "Services").
            </p>
            <p className="text-base mt-4 opacity-80 max-w-3xl font-semibold">
              By accessing or using our Services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="prose prose-lg max-w-none space-y-12">
            {/* Section 1 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">1. Information We Collect</h2>
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                We collect several different types of information for various purposes to provide and improve our Services to you.
              </p>

              <div className="space-y-6">
                {/* Subsection A */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">A. Information You Provide to Us</h3>
                  <p className="text-lg leading-relaxed mb-4 text-gray-700">
                    When you register for and use our Services, we may ask you to provide us with certain personally identifiable information, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                    <li><strong>Contact Information:</strong> Name, Email ID, and Phone Number.</li>
                    <li><strong>Account Information:</strong> Any other information you provide when you create your account or profile.</li>
                  </ul>
                </div>

                {/* Subsection B */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">B. Information Collected Automatically</h3>
                  <p className="text-lg leading-relaxed mb-4 text-gray-700">
                    When you use our Services, we may automatically collect certain information, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                    <li><strong>Location Data:</strong> We may collect your precise or approximate location through your device's GPS if you grant us the location permission. This is essential for the core functionality of the Services.</li>
                    <li><strong>Usage Data ("User Behaviour"):</strong> This includes information about how you interact with our Services, such as the features you use, the pages you view, the time and date of your visits, and other diagnostic data.</li>
                  </ul>
                </div>

                {/* Subsection C */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">C. Device Permissions</h3>
                  <p className="text-lg leading-relaxed mb-4 text-gray-700">
                    To provide the full functionality of our Services, we may request the following permissions from your mobile device:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                    <li><strong>Location:</strong> To provide location-based services.</li>
                    <li><strong>Notifications:</strong> To send you updates, alerts, and other service-related communications.</li>
                  </ul>
                  <p className="text-lg leading-relaxed mt-4 text-gray-700">
                    You can manage or disable these permissions in your device's settings.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">2. How We Use Your Information</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">We use the collected information for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg text-gray-700">
                <li>To provide, operate, and maintain our Services.</li>
                <li>To create and manage your account.</li>
                <li>To notify you about changes to our Services.</li>
                <li>To understand how our Services are used so we can analyze and improve the user experience.</li>
                <li>To provide customer support and respond to your queries.</li>
                <li>To monitor the usage of our Services and prevent fraud or security issues.</li>
                <li>To send you service-related notifications (if permission is granted).</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">3. How We Share and Disclose Your Information</h2>
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                We do not sell or rent your personal data to third parties. Your data is used exclusively by Tuckr. However, we may share your information in the following limited circumstances:
              </p>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">With Service Providers:</h3>
                  <p className="text-gray-700">
                    We may employ third-party companies and individuals to facilitate our Services ("Service Providers"), perform Service-related tasks, or assist us in analyzing how our Services are used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Analytics:</h3>
                  <p className="text-gray-700">
                    We use Google Analytics to monitor and analyze the use of our Services.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Database & Hosting:</h3>
                  <p className="text-gray-700">
                    Our data is stored and processed using secure database solutions like PostgreSQL and hosted on secure servers.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">For Legal Reasons:</h3>
                  <p className="text-gray-700 mb-3">We may disclose your information if we believe it is necessary to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                    <li>Comply with a legal obligation.</li>
                    <li>Protect and defend the rights or property of Tuckr.</li>
                    <li>Prevent or investigate possible wrongdoing in connection with the Services.</li>
                    <li>Protect the personal safety of users of the Services or the public.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">4. Data Security</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <p className="text-lg leading-relaxed text-gray-700">
                  The security of your data is important to us. We use robust administrative, technical, and physical security measures, including storing data in secure PostgreSQL databases, to protect your personal information. However, remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">5. Children's Privacy</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                Our Services are not directed to anyone under the age of 18 ("Children"), as they involve financial transactions. We do not knowingly collect personally identifiable information from anyone under the age of 18.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we will take steps to remove that information from our servers.
              </p>
            </section>

            {/* Section 6 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">6. Changes to This Privacy Policy</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 font-semibold">
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* Section 7 */}
            <section className="border-l-4 border-[#6FC06E] pl-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">7. Contact Us</h2>
              <p className="text-lg leading-relaxed mb-4 text-gray-700">
                If you have any questions about this Privacy Policy, you can contact us:
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

