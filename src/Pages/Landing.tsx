import { useEffect, useState } from "react";
import {
  Network,
  Banknote,
  Wallet,
  LayoutDashboard,
  UserCog,
  Globe,
  Fingerprint,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// 1. Import your images from the assets folder here:
import desktopImg from "../assets/desktop.png";
import mobileImg from "../assets/mobile.png";
import arrow from "../assets/arrow.webp";

import logo1 from "../assets/19.png";
import logo2 from "../assets/20.png";
import logo3 from "../assets/21.png";
import logo4 from "../assets/22.png";
import logo5 from "../assets/23.png";

const logoSlides = [logo1, logo2, logo3, logo4, logo5];

// MLM Features Data
const mlmFeatures = [
  {
    title: "स्ट्रेटेजिक मार्केटिंग प्लानिंग",
    description:
      "आपके बिज़नेस की ग्रोथ और लक्ष्यों को हासिल करने के लिए एक डेटा-आधारित और कस्टमाइज़्ड मार्केटिंग रणनीति तैयार करना।",
    icon: <Network className="w-8 h-8" />,
  },
  {
    title: "टार्गेटेड एडवरटाइजिंग",
    description:
      "सही ऑडियंस (ग्राहकों) तक सही समय पर विज्ञापन पहुँचाकर आपके बिज़नेस के लिए बेहतरीन ROI (रिटर्न ऑन इन्वेस्टमेंट) सुनिश्चित करना।",
    icon: <Banknote className="w-8 h-8" />,
  },
  {
    title: "सोशल मीडिया मैनेजमेंट",
    description:
      "विभिन्न सोशल मीडिया प्लेटफॉर्म्स पर आपके ब्रांड की ऑनलाइन प्रेजेंस को मजबूत करना और कस्टमर एंगेजमेंट बढ़ाना।",
    icon: <Wallet className="w-8 h-8" />,
  },
  {
    title: "एसईओ और कंटेंट क्रिएशन",
    description:
      "वैल्युएबल कंटेंट और सर्च इंजन ऑप्टिमाइजेशन (SEO) तकनीक के जरिए गूगल पर आपकी वेबसाइट की रैंकिंग और ऑर्गेनिक ट्रैफिक बढ़ाना।",
    icon: <LayoutDashboard className="w-8 h-8" />,
  },
  {
    title: "डेटा एनालिटिक्स और रिपोर्टिंग",
    description:
      "सभी मार्केटिंग कैंपेन्स की परफॉरमेंस को ट्रैक करना और डेटा के आधार पर पारदर्शी (Transparent) रिजल्ट्स की रिपोर्ट देना।",
    icon: <UserCog className="w-8 h-8" />,
  },
  {
    title: "ब्रांड डेवलपमेंट",
    description:
      "आपके बिज़नेस को एक यूनीक पहचान देना ताकि वह मार्केट में एक भरोसेमंद और जाना-माना ब्रांड बन सके।",
    icon: <Globe className="w-8 h-8" />,
  },
];

function Landing() {
  // --- Logo Carousel State & Logic ---
  const [currentLogoSlide, setCurrentLogoSlide] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(2);

  // Handle Responsive layout for Logo Carousel
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth >= 768 ? 3 : 2);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation Handlers for Arrows
  const nextSlide = () => {
    setCurrentLogoSlide((prev) =>
      prev >= logoSlides.length - itemsToShow ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentLogoSlide((prev) =>
      prev <= 0 ? logoSlides.length - itemsToShow : prev - 1,
    );
  };

  // --- NEW: Auto-slide logic for the logo carousel ---
  useEffect(() => {
    const logoInterval = setInterval(() => {
      setCurrentLogoSlide((prev) =>
        prev >= logoSlides.length - itemsToShow ? 0 : prev + 1,
      );
    }, 3000); // 3000ms = 3 seconds per slide

    return () => clearInterval(logoInterval); // Cleanup interval on unmount
  }, [itemsToShow]);

  // --- Tracking Logic for WhatsApp Clicks ---
  const handleWhatsAppClick = () => {
    // We removed e.preventDefault() so the <a> tag naturally opens the WhatsApp link
    if (typeof window !== "undefined") {
      const win = window as Window & {
        fbq?: (action: string, eventName: string) => void;
      };

      if (win.fbq) {
        win.fbq("track", "Lead");
      }
    }
  };

  // Scroll animation logic for roadmap boxes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-16");
          } else {
            entry.target.classList.remove("opacity-100", "translate-y-0");
            entry.target.classList.add("opacity-0", "translate-y-16");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0B1120] relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-20 z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-teal-500/20 blur-[120px] md:blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-5%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-600/10 blur-[100px] md:blur-[130px] rounded-full pointer-events-none z-0"></div>

      {/* Main Container */}
      <main className="relative z-10 overflow-x-hidden bg-transparent">
        {/* Hero Section */}
        <section className="w-full">
          <div className="relative w-full flex flex-col items-center overflow-hidden">
            <img
              alt="Hero Image Desktop"
              className="w-full h-auto object-cover hidden md:block"
              src={desktopImg}
              fetchPriority="high"
            />
            <a
              href="https://wa.me/447412812865"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="absolute hidden md:block cursor-pointer z-30 bg-transparent hover:bg-white/10 transition-colors rounded-2xl"
              style={{ top: "80%", left: "1.7%", width: "35%", height: "13%" }}
              aria-label="Contact on WhatsApp"
            ></a>

            <img
              alt="Hero Image Mobile"
              className="w-full h-auto object-cover block md:hidden"
              src={mobileImg}
              fetchPriority="high"
            />
            <a
              href="https://wa.me/447412812865"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="absolute block md:hidden cursor-pointer z-30 bg-transparent hover:bg-white/10 transition-colors rounded-2xl"
              style={{ top: "42%", left: "15%", width: "70%", height: "9%" }}
              aria-label="Contact on WhatsApp"
            ></a>
          </div>
        </section>

        {/* --- PARTNERS / LOGO CAROUSEL SECTION (WITH ARROWS) --- */}
        <section className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 relative z-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-sm sm:text-base font-bold text-slate-400 uppercase tracking-widest">
              Featured In & Trusted By
            </h3>
          </div>

          <div className="max-w-6xl mx-auto relative px-6 sm:px-12">
            <button
              onClick={prevSlide}
              className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-30 bg-slate-800/80 hover:bg-teal-500 text-teal-400 hover:text-slate-900 p-1.5 sm:p-2 rounded-full border border-teal-500/30 hover:border-teal-400 transition-all duration-300 shadow-md backdrop-blur-sm group"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentLogoSlide * (100 / itemsToShow)
                  }%)`,
                }}
              >
                {logoSlides.map((logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-2 sm:px-4"
                    style={{ width: `${100 / itemsToShow}%` }}
                  >
                    <div className="bg-white rounded-2xl p-2 sm:p-5 lg:p-8 flex items-center justify-center h-28 sm:h-40 md:h-48 lg:h-56 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_20px_rgba(45,212,191,0.3)] transition-shadow duration-300">
                      <img
                        src={logo}
                        alt={`Partner ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-30 bg-slate-800/80 hover:bg-teal-500 text-teal-400 hover:text-slate-900 p-1.5 sm:p-2 rounded-full border border-teal-500/30 hover:border-teal-400 transition-all duration-300 shadow-md backdrop-blur-sm group"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>

        {/* --- MLM FEATURES CARD SECTION --- */}
        <section className="container mx-auto px-4 sm:px-6 pt-12 pb-16 relative z-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 font-display text-white tracking-tight">
              मार्केटिंग{" "}
              <span className="text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">
                फीचर्स
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {mlmFeatures.map((feature, index) => (
              <div
                key={index}
                className="glass p-6 sm:p-8 rounded-[24px] border border-teal-500/20 hover:border-teal-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(45,212,191,0.15)] bg-[#0f172a]/60 backdrop-blur-xl flex flex-col items-center text-center group"
              >
                <div className="bg-teal-500/10 p-4 rounded-2xl text-teal-400 mb-5 sm:mb-6 group-hover:bg-teal-400 group-hover:text-slate-900 transition-colors duration-300 shadow-[0_0_15px_rgba(45,212,191,0.1)] group-hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto pt-16 pb-24 sm:pb-32 px-4 sm:px-6 relative z-20">
          <div className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-[#0f172a] border border-teal-500/20 shadow-2xl backdrop-blur-3xl group transition-all duration-500 hover:border-teal-500/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.15),transparent_50%)]"></div>

            <div className="relative z-10 p-6 sm:p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              {/* Text Content */}
              <div className="w-full flex-1 text-center lg:text-left overflow-hidden">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-3 md:mb-4 text-white leading-tight whitespace-normal md:whitespace-nowrap">
                  Get More Info With Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 block sm:inline mt-1 sm:mt-0">
                    Growth!
                  </span>
                </h2>
                <p className="text-slate-400 text-sm sm:text-base font-light italic">
                  "Then access our site for complete insights."
                </p>
              </div>

              {/* Centered Arrow Container (Hidden on mobile) */}
              <div className="hidden lg:flex flex-shrink-0 items-center justify-center px-4">
                <img
                  src={arrow}
                  alt="Arrow Direction"
                  className="w-24 xl:w-32 h-auto opacity-70 invert drop-shadow-[0_0_15px_rgba(45,212,191,0.4)] animate-arrow-flow"
                  loading="lazy"
                />
              </div>

              {/* CTA BUTTON AREA */}
              <div className="w-full lg:w-auto flex-shrink-0 flex justify-center lg:justify-end mt-2 lg:mt-0">
                <a
                  href="https://wa.me/447412812865"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="relative w-full sm:w-auto cursor-pointer group block"
                >
                  <div className="absolute -inset-5 z-0 rounded-[2rem]"></div>
                  <div className="relative z-10 w-full sm:w-auto bg-teal-500 text-white hover:bg-teal-400 px-6 sm:px-10 py-4 sm:py-5 rounded-full flex items-center justify-center gap-3 transition-all transform group-hover:scale-[1.03] active:scale-95 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0"></div>
                    <Fingerprint className="text-2xl md:text-3xl w-6 h-6 sm:w-8 sm:h-8 shrink-0 group-hover:-rotate-12 transition-transform relative z-10" />
                    <span className="text-[14px] sm:text-[16px] md:text-lg font-bold uppercase tracking-wider whitespace-nowrap relative z-10 leading-tight">
                      Whatsapp Channel
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-teal-500/20 py-6 md:py-8 bg-[#0B1120]/90 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] md:text-xs font-bold text-slate-500 tracking-widest uppercase">
            <a className="hover:text-teal-400 transition-colors" href="#">
              Privacy
            </a>
            <a className="hover:text-teal-400 transition-colors" href="#">
              Terms
            </a>
            <a className="hover:text-teal-400 transition-colors" href="#">
              Contact
            </a>
          </div>
          <p className="text-slate-600 text-[10px] md:text-sm text-center">
            Copyright © 2026 All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
