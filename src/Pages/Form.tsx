import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "mobile" && value !== "" && !/^\d+$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", mobile: "" };

    if (!formData.name.trim()) {
      newErrors.name = "कृपया अपना पूरा नाम दर्ज करें।";
      isValid = false;
    }

    const mobileRegex = /^[0-9]{12}$/;
    if (!formData.mobile) {
      newErrors.mobile = "मोबाइल नंबर दर्ज करना आवश्यक है।";
      isValid = false;
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "कृपया सही अंकों का मोबाइल नंबर दर्ज करें।";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const leadData = {
      name: formData.name,
      mobile: formData.mobile,
      createdAt: serverTimestamp(),
    };

    try {
      console.log("⏳ Saving data to Firebase...");

      // 1. Await the Firebase save completely
      const docRef = await addDoc(collection(db, "marketing"), leadData);

      // 2. ONLY run this if save was successful
      console.groupCollapsed(
        "🔥 FIREBASE SUCCESS: DATA SAVED 🔥 (Click to expand)",
      );
      console.log("✅ Data successfully saved to Firestore!");
      console.log("📂 Collection Name: 'marketing'");
      console.log("📄 Document ID:", docRef.id);

      // This will neatly print your data into a table in the console!
      console.table({
        Name: formData.name,
        Mobile: formData.mobile,
      });
      console.groupEnd();

      setIsSubmitting(false);
      setIsSubmitted(true);

      // 3. Wait slightly so the user sees "Success" before redirecting
      console.log("🔄 Redirecting to WhatsApp...");
      setTimeout(() => {
        // ✅ EXACT LINK YOU REQUESTED:
        window.location.href =
          "https://api.whatsapp.com/send/?phone=447412812865&text&type=phone_number&app_absent=0&wame_ctl=1";
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      console.group("❌ FIREBASE ERROR ❌");
      console.error("Data failed to save. Check Firestore Security Rules.");
      console.error("Error details:", error);
      console.groupEnd();
      alert("Error saving data. Please check console.");
    }
  };

  const isLocked = isSubmitting || isSubmitted;
  const isFormIncomplete =
    !formData.name.trim() || formData.mobile.length !== 12;
  const isButtonDisabled = isLocked || isFormIncomplete;

  return (
    <div className="min-h-screen bg-[#0B1120] relative flex items-center justify-center p-4 overflow-hidden">
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-20 z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-teal-500/20 blur-[120px] md:blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-5%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-600/10 blur-[100px] md:blur-[130px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass p-8 sm:p-10 rounded-[24px] sm:rounded-[32px] border border-teal-500/30 shadow-[0_10px_40px_rgba(45,212,191,0.15)] bg-[#0f172a]/60 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              हमारे <span className="text-teal-400">नेटवर्क</span> से जुड़ें
            </h2>
            <p className="text-slate-400 text-sm">
              GOALDEX से जुड़ने और फॉर्म सबमिट करने के लिए, नीचे दी गई सभी
              डिटेल्स भरना अनिवार्य है।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-teal-400 text-[15px] sm:text-sm font-bold tracking-widest uppercase block mb-2">
                पूरा नाम *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="अपना पूरा नाम लिखें"
                className={`w-full bg-[#0B1120]/50 border ${
                  errors.name ? "border-red-500" : "border-teal-500/30"
                } rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all ${
                  isLocked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-teal-400 text-[15px] sm:text-sm font-bold tracking-widest uppercase block mb-2">
                मोबाइल नंबर *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="अंकों में मोबाइल नंबर लिखें"
                maxLength={12}
                className={`w-full bg-[#0B1120]/50 border ${
                  errors.mobile ? "border-red-500" : "border-teal-500/30"
                } rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all ${
                  isLocked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1.5">{errors.mobile}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`relative w-full group overflow-hidden px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitted
                    ? "bg-emerald-500 text-white cursor-default shadow-emerald-500/40"
                    : isFormIncomplete
                      ? "bg-teal-500/30 text-white/40 cursor-not-allowed border border-teal-500/20"
                      : "bg-teal-500 text-white hover:bg-teal-400 active:scale-95 hover:scale-[1.02] shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                } ${isSubmitting ? "opacity-90 cursor-wait" : ""}`}
              >
                {!isLocked && !isFormIncomplete && (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0"></div>
                )}

                <span className="text-sm md:text-base font-bold uppercase tracking-wider relative z-10 leading-tight flex items-center justify-center gap-2">
                  {isSubmitting
                    ? "प्रक्रिया चल रही है..."
                    : isSubmitted
                      ? "सबमिट हो गया!"
                      : "सबमिट करें"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
