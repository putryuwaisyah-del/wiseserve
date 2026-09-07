// src/components/layout/AppLayout.jsx
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const AppLayout = ({
  children,
  activeTab,
  setActiveTab,
  title,
  theme,
  setTheme,
}) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`flex h-screen font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',sans-serif] transition-colors duration-300 ${
        isDark
          ? "bg-[radial-gradient(circle_at_top_left,_#0f172a_0%,_#111827_30%,_#020817_100%)] text-slate-100"
          : "bg-[radial-gradient(circle_at_top_left,_#f8fbff_0%,_#f3f5f9_30%,_#eef2f7_100%)] text-slate-800"
      }`}
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={title}
          theme={theme}
          onThemeToggle={() => setTheme(isDark ? "light" : "dark")}
        />
        <main
          className={`flex-1 overflow-y-auto p-6 md:p-8 ${isDark ? "bg-slate-950/40" : "bg-transparent"}`}
        >
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};
