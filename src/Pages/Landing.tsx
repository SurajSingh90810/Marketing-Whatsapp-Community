import { useEffect } from "react";
import { Network, Banknote, Wallet, Fingerprint } from "lucide-react";

// 1. Import your images from the assets folder here:
import desktopImg from "../assets/desktop.png";
import mobileImg from "../assets/mobile.png";
import arrow from "../assets/arrow.webp";

declare global {
  interface Window {
    fbq?: (event: string, eventName: string, ...args: unknown[]) => void;
  }
}

// Updated Features / Roadmap Data matching the GreenGold theme
const roadmapData = [
  {
    phase: "PHASE 01",
    title: "Community Foundation",
    description:
      "Foster a high-trust community environment where valuable, verified insights are shared instantly among members.",
    icon: <Network className="w-5 h-5 md:w-6 md:h-6" />,
    theme: "green",
  },
  {
    phase: "PHASE 02",
    title: "Informed Intelligence",
    description:
      "Access a robust, unified data platform that analyzes key market signals and provides clear information to support safer decisions.",
    icon: <Banknote className="w-5 h-5 md:w-6 md:h-6" />,
    theme: "gold",
  },
  {
    phase: "PHASE 03",
    title: "Ecosystem Sustainability",
    description:
      "Collaborate on tools and strategies designed for balanced and sustainable portfolio management, enhancing the value of the shared ecosystem for all members.",
    icon: <Wallet className="w-5 h-5 md:w-6 md:h-6" />,
    theme: "green",
  },
];

function Landing() {
  const whatsappLink = "https://wa.me/6355976841"; // <-- Replace with your actual WhatsApp number

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined") {
      const win = window;
      if (win.fbq) {
        win.fbq("track", "Lead");
      }
    }
  };

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
    <div className="w-full min-h-screen bg-[#050806] relative overflow-x-hidden font-sans">
      {/* Background Elements */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* Ambient Glows */}
      <div className="fixed top-[-10%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <main className="relative z-10 overflow-x-hidden bg-transparent w-full">
        {/* Hero Section */}
        <section className="w-full flex justify-center bg-[#050806]">
          <div className="relative w-full max-w-full leading-none text-[0]">
            {/* Desktop Hero */}
            <div className="hidden md:block relative w-full">
              <img
                alt="Hero Image Desktop"
                className="w-full h-auto object-cover"
                src={desktopImg}
                fetchPriority="high"
              />
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="absolute cursor-pointer z-30 bg-transparent hover:bg-white/10 active:bg-white/20 transition-colors duration-200 rounded-2xl"
                style={{
                  top: "83%",
                  left: "1.7%",
                  width: "24%",
                  height: "11%",
                }}
                aria-label="Contact on WhatsApp"
              ></a>
            </div>

            {/* Mobile Hero */}
            <div className="block md:hidden relative w-full">
              <img
                alt="Hero Image Mobile"
                className="w-full h-auto object-cover"
                src={mobileImg}
                fetchPriority="high"
              />
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="absolute cursor-pointer z-30 bg-transparent hover:bg-white/10 active:bg-white/30 transition-colors duration-200 rounded-xl"
                style={{ top: "46%", left: "8%", width: "48%", height: "7%" }}
                aria-label="Go to WhatsApp"
              ></a>
            </div>
          </div>
        </section>

        {/* --- STRATEGIC ROADMAP TIMELINE SECTION --- */}
        <section className="container mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-20 md:pb-24 relative z-20">
          <div className="text-center mb-12 md:mb-24 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 text-white tracking-tight">
              Strategic{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                Roadmap
              </span>{" "}
              2026
            </h2>
            <p className="text-slate-400 text-xs sm:text-base px-2">
              Our trajectory towards becoming the premier intelligence hub in
              the ecosystem.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Center Vertical Line */}
            <div className="absolute left-[28px] sm:left-[40px] md:left-1/2 top-4 bottom-4 w-[1px] bg-[#152417] md:-translate-x-1/2 z-0"></div>

            <div className="flex flex-col gap-8 sm:gap-10 md:gap-20 w-full">
              {roadmapData.map((item, index) => {
                const isEven = index % 2 === 0;
                const isGold = item.theme === "gold";

                return (
                  <div
                    key={index}
                    className={`relative flex flex-col items-start md:items-center w-full reveal-on-scroll opacity-0 translate-y-16 transition-all duration-700 ease-out 
                    ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Timeline Icon */}
                    <div
                      className={`absolute left-[28px] sm:left-[40px] md:left-1/2 top-[24px] md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#080d09] flex items-center justify-center border z-10 transition-all duration-300
                        ${
                          isGold
                            ? "border-yellow-500/40 text-yellow-500"
                            : "border-green-500/40 text-green-500"
                        }`}
                    >
                      {item.icon}
                    </div>

                    {/* Content Side Wrapper */}
                    <div
                      className={`w-full md:w-1/2 flex pl-[64px] sm:pl-[90px] md:pl-0 
                      ${isEven ? "md:justify-end md:pr-12 lg:pr-16" : "md:justify-start md:pl-12 lg:pl-16"}`}
                    >
                      {/* Card Content */}
                      <div
                        className={`w-full max-w-[420px] rounded-2xl bg-[#0a120c] border border-[#152417] p-5 sm:p-6 md:p-8 flex flex-col transition-colors duration-300
                          ${isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"}
                          ${
                            isGold
                              ? "hover:border-yellow-500/30"
                              : "hover:border-green-500/30"
                          }`}
                      >
                        <span
                          className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-2 sm:mb-3 
                            ${isGold ? "text-yellow-500" : "text-green-500"}`}
                        >
                          {item.phase}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-4 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Desktop Empty Spacer */}
                    <div className="hidden md:block w-1/2"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 relative z-20">
          <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[#0a120c] border border-[#152417] shadow-lg transition-colors duration-500 hover:border-green-500/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.05),transparent_60%)]"></div>

            <div className="relative z-10 p-6 sm:p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
              <div className="w-full flex-1 text-center lg:text-left overflow-hidden">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-4 text-white leading-tight">
                  Get More Info With Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-500 block sm:inline mt-1 sm:mt-0">
                    Growth!
                  </span>
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm md:text-base font-light">
                  Access our site for complete insights.
                </p>
              </div>

              <div className="hidden lg:flex flex-shrink-0 items-center justify-center px-4">
                <img
                  src={arrow}
                  alt="Arrow Direction"
                  className="w-16 xl:w-28 h-auto opacity-50 invert animate-pulse"
                  loading="lazy"
                />
              </div>

              <div className="w-full lg:w-auto flex-shrink-0 flex justify-center lg:justify-end mt-4 lg:mt-0">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="relative w-full sm:w-auto cursor-pointer group block"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <div className="relative z-10 w-full sm:w-auto bg-[#16a34a] text-white hover:bg-[#15803d] px-6 sm:px-10 py-3 sm:py-4 md:py-5 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-transform transform group-hover:scale-[1.02] active:scale-95 overflow-hidden">
                    <Fingerprint className="text-xl md:text-3xl w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 relative z-10" />
                    <span className="text-[15px] sm:text-[16px] md:text-lg font-semibold tracking-wide whitespace-nowrap relative z-10 leading-tight text-white">
                      Contact Us
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#152417] py-6 md:py-8 bg-[#050806]/90 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[10px] sm:text-xs font-semibold text-slate-500 tracking-widest uppercase">
            <a className="hover:text-green-500 transition-colors" href="#">
              Privacy
            </a>
            <a className="hover:text-green-500 transition-colors" href="#">
              Terms
            </a>
            <a className="hover:text-green-500 transition-colors" href="#">
              Contact
            </a>
          </div>
          <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm text-center">
            Copyright © 2026 All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
