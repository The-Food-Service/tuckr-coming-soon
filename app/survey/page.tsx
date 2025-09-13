'use client';
import { useEffect } from 'react';
import Head from 'next/head';

export default function SurveyPage() {
  useEffect(() => {
    // Redirect to Google Form after a short delay
    const timer = setTimeout(() => {
      window.location.href = 'https://forms.gle/6kXqyJLhFaBUra3u7';
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Tuckr Survey | Help Us Build the Perfect Pick & Go Experience</title>
        <meta name="description" content="Take our quick survey to help us build Tuckr - the ultimate Pick & Go food solution for college students. Your feedback shapes our app!" />
        <meta name="keywords" content="Tuckr Survey, Food App Survey, College Food Survey, Pick & Go Survey, BITS Hyderabad, Student Feedback" />
        
        {/* Open Graph for WhatsApp and Facebook */}
        <meta property="og:title" content="Tuckr Survey | Help Us Build the Perfect Pick & Go Experience" />
        <meta property="og:description" content="Take our quick survey to help us build Tuckr - the ultimate Pick & Go food solution for college students. Your feedback shapes our app!" />
        <meta property="og:url" content="https://tuckr.in/survey" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tuckr" />
        <meta property="og:image" content="https://tuckr.in/tuckr-survey-og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Tuckr Survey - Help us build the perfect Pick & Go experience" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tuckr Survey | Help Us Build the Perfect Pick & Go Experience" />
        <meta name="twitter:description" content="Take our quick survey to help us build Tuckr - the ultimate Pick & Go food solution for college students. Your feedback shapes our app!" />
        <meta name="twitter:image" content="https://tuckr.in/tuckr-survey-og.png" />
        <meta name="twitter:site" content="@tuckrfoods" />
        <meta name="twitter:creator" content="@tuckrfoods" />
        
        {/* WhatsApp specific */}
        <meta property="og:locale" content="en_US" />
        <meta name="theme-color" content="#6FC06E" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Tuckr Foods" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-[#6FC06E] font-sans relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-8">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 font-[var(--font-poppins)]">
              Help Us Build
            </h1>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 font-[var(--font-poppins)]">
              The Perfect Tuckr
            </h2>
            <p className="text-lg sm:text-xl mb-8 font-[var(--font-poppins)] opacity-90">
              Your feedback shapes our Pick & Go experience. Take our quick survey and help us create something amazing for college students!
            </p>
          </div>
          
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-lg font-[var(--font-poppins)] mb-6">
              Redirecting to survey...
            </p>
          </div>
          
          <div className="space-y-4">
            <a 
              href="https://forms.gle/6kXqyJLhFaBUra3u7" 
              className="inline-block px-8 py-4 bg-white text-[#6FC06E] font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-[var(--font-poppins)] shadow-lg"
            >
              Take Survey Now
            </a>
            <p className="text-sm font-[var(--font-poppins)] opacity-75">
              Takes only 2-3 minutes
            </p>
          </div>
          
          <div className="mt-12 text-sm font-[var(--font-poppins)] opacity-75">
            <p>📍 BITS Hyderabad • 🍕 Pick & Go • 📱 Coming Soon</p>
          </div>
        </div>
      </div>
    </>
  );
}
