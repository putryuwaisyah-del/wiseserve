import type { Dispatch, SetStateAction } from "react";

type Theme = "light" | "dark";
type Language = "en" | "bm";
type Tab = "dashboard" | "dailylog" | "menu";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
  theme?: Theme;
  language?: Language;
}

export const Sidebar = ({
  activeTab,
  setActiveTab,
  theme = "light",
  language = "en",
}: SidebarProps) => {
  const isDark = theme === "dark";
  const labels: Record<Language, Record<Tab, string>> = {
    en: {
      dashboard: "Analytics",
      dailylog: "Daily Log",
      menu: "Menu Manager",
    },
    bm: {
      dashboard: "Analitik",
      dailylog: "Log Harian",
      menu: "Pengurus Menu",
    },
  };

  const menuItems: { id: Tab; label: string }[] = [
    { id: "dashboard", label: labels[language].dashboard },
    { id: "dailylog", label: labels[language].dailylog },
    { id: "menu", label: labels[language].menu },
  ];

  return (
    <aside
      className={`w-72 h-screen border-r p-5 flex flex-col justify-between shadow-[inset_-1px_0_0_rgba(148,163,184,0.1)] backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-slate-800 bg-slate-900/80"
          : "border-slate-200/80 bg-white/70"
      }`}
    >
      <div>
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1d74f5] to-[#0f172a] flex items-center justify-center text-xl shadow-[0_12px_24px_rgba(29,116,245,0.2)]">
            🍃
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">
              F&B
            </p>
            <span
              className={`font-bold text-xl tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
            >
              EcoBite
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? isDark
                    ? "bg-slate-100 text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.4)]"
                    : "bg-slate-900 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)]"
                  : isDark
                    ? "text-slate-400 hover:text-slate-100 hover:bg-slate-800/80"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div
        className={`rounded-2xl px-3 py-2 text-xs border ${
          isDark
            ? "bg-slate-800/80 text-slate-300 border-slate-700"
            : "bg-slate-100/80 text-slate-500 border-slate-200/80"
        }`}
      >
        F&B Waste Prevention v1.0
      </div>
    </aside>
  );
};
