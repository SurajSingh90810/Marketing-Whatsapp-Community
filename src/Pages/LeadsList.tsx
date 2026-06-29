import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const LeadsList = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const q = query(
          collection(db, "marketing"),
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);
        const leadsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Data:", leadsData); // 👈 This will print your data in the console!
        setLeads(leadsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leads: ", error);
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const copyToClipboard = (mobile: string, id: string) => {
    navigator.clipboard.writeText(mobile);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ✅ IMPROVED: Safely format dates to prevent app crashes
  const formatDateTime = (timestamp: any) => {
    if (!timestamp) return "N/A";
    try {
      // Check if it's a Firestore Timestamp, otherwise try standard Date
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] p-4 sm:p-8 text-white relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-20 z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[400px] h-[400px] bg-teal-500/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10">
        <h1 className="text-3xl font-extrabold mb-8 text-teal-400 text-center tracking-wide uppercase">
          Users List
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <svg
              className="animate-spin h-8 w-8 text-teal-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              ></circle>
              <path
                fill="currentColor"
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center text-slate-400 mt-10 glass p-10 max-w-md mx-auto rounded-2xl border border-teal-500/20">
            <p className="text-xl font-bold text-white mb-2">No Data Found</p>
            <p>Go submit the form first to see data here!</p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Desktop Table: Hidden on small screens */}
            <div className="hidden md:block overflow-x-auto glass rounded-2xl border border-teal-500/30 p-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-teal-500/10 text-center text-teal-400 uppercase text-sm tracking-wider">
                    <th className="p-4 border-b border-teal-500/20">Name</th>
                    <th className="p-4 border-b border-teal-500/20">
                      Mobile Number
                    </th>
                    <th className="p-4 border-b border-teal-500/20">
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-white/5 transition-colors text-center border-b border-teal-500/10 last:border-0"
                    >
                      <td className="p-4 font-medium text-white">
                        {lead.name}
                      </td>
                      <td className="p-4 flex items-center justify-center gap-3">
                        <a
                          href={`tel:${lead.mobile}`}
                          className="text-slate-300 hover:text-teal-300 transition-colors"
                        >
                          {lead.mobile}
                        </a>
                        <button
                          onClick={() => copyToClipboard(lead.mobile, lead.id)}
                          className={`text-xs px-3 py-1.5 rounded transition-all font-bold ${
                            copiedId === lead.id
                              ? "bg-teal-500 text-white"
                              : "bg-teal-500/20 text-teal-400 hover:bg-teal-500/40"
                          }`}
                        >
                          {copiedId === lead.id ? "Copied!" : "Copy"}
                        </button>
                      </td>
                      <td className="p-4 text-sm text-slate-400">
                        {formatDateTime(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View: Hidden on desktop */}
            <div className="md:hidden space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="glass p-5 rounded-2xl border border-teal-500/20 bg-[#0f172a]/80 backdrop-blur-md"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-teal-400 font-bold text-lg">
                      {lead.name}
                    </span>
                    <span className="text-xs text-slate-300 font-medium bg-white/5 px-2 py-1 rounded border border-white/10">
                      {formatDateTime(lead.createdAt)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <a
                      href={`tel:${lead.mobile}`}
                      className="text-white font-mono text-xl tracking-wider"
                    >
                      {lead.mobile}
                    </a>
                    <button
                      onClick={() => copyToClipboard(lead.mobile, lead.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        copiedId === lead.id
                          ? "bg-teal-500 text-white shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                          : "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                      }`}
                    >
                      {copiedId === lead.id ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsList;
