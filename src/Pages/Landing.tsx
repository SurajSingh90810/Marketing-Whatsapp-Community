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
            {/* Center Vertical Line (Always Centered now on Mobile & Desktop) */}
            <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-[#152417] -translate-x-1/2 z-0"></div>

            <div className="flex flex-col gap-16 md:gap-20 w-full mt-6 md:mt-0">
              {roadmapData.map((item, index) => {
                const isEven = index % 2 === 0;
                const isGold = item.theme === "gold";

                return (
                  <div
                    key={index}
                    className={`relative flex flex-col items-center w-full reveal-on-scroll opacity-0 translate-y-16 transition-all duration-700 ease-out 
                    ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Timeline Icon - Centered directly on Mobile, positioned perfectly on Desktop */}
                    <div
                      className={`absolute left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#080d09] flex items-center justify-center border z-20 transition-all duration-300
                        ${
                          isGold
                            ? "border-yellow-500/40 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.15)]"
                            : "border-green-500/40 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                        }`}
                    >
                      {item.icon}
                    </div>

                    {/* Content Side Wrapper */}
                    <div
                      className={`w-full md:w-1/2 flex justify-center pt-10 md:pt-0 relative z-10
                      ${isEven ? "md:justify-end md:pr-12 lg:pr-16" : "md:justify-start md:pl-12 lg:pl-16"}`}
                    >
                      {/* Card Content - Centered text on mobile, left/right aligned on desktop */}
                      <div
                        className={`w-full max-w-[420px] rounded-2xl bg-[#0a120c] border border-[#152417] p-5 sm:p-6 md:p-8 flex flex-col items-center text-center transition-colors duration-300
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
          <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[#0a120c] border border-[#152417] shadow-2xl transition-colors duration-500 hover:border-green-500/30 group/cta">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.08),transparent_60%)]"></div>

            <div className="relative z-10 p-8 sm:p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-10">
              {/* Text Area */}
              <div className="w-full flex-1 text-center md:text-left overflow-hidden">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-4 text-white leading-tight">
                  Get More Info With Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-500 block sm:inline mt-1 sm:mt-0">
                    Growth!
                  </span>
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm md:text-base font-light">
                  Access our site for complete insights and premium tools.
                </p>
              </div>

              {/* Dynamic Responsive Arrow */}
              <div className="flex flex-shrink-0 items-center justify-center px-4 my-2 md:my-0">
                <img
                  src={arrow}
                  alt="Arrow Direction"
                  className="w-12 sm:w-16 md:w-20 lg:w-24 h-auto opacity-40 invert group-hover/cta:opacity-70 group-hover/cta:animate-pulse transition-opacity duration-300 rotate-90 md:rotate-0"
                  loading="lazy"
                />
              </div>

              {/* Advanced Green Contact Button */}
              <div className="w-full md:w-auto flex-shrink-0 flex justify-center mt-2 md:mt-0 relative z-20">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="relative w-full sm:w-auto cursor-pointer group block"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {/* Glowing Background Blur */}
                  <div className="absolute -inset-1 bg-green-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

                  {/* Inner Styled Green Button */}
                  <div className="relative w-full sm:w-auto bg-gradient-to-r from-green-600 to-[#16a34a] border border-green-400/50 px-6 sm:px-10 py-3 sm:py-4 md:py-5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 group-hover:from-green-500 group-hover:to-green-400 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] group-active:scale-95 overflow-hidden">
                    {/* Subtle internal shine effect */}
                    <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></div>

                    <Fingerprint className="text-white group-hover:scale-110 transition-transform duration-300 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 z-10" />
                    <span className="text-[15px] sm:text-[16px] md:text-lg font-bold tracking-wide text-white transition-all z-10 drop-shadow-sm">
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

      {/* Optional Custom Keyframes required for the button shine */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shine {
          100% {
            left: 200%;
          }
        }
      `,
        }}
      />
    </div>
  );
}

export default Landing;
