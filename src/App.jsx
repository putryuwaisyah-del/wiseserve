// src/App.jsx
import { useState } from "react";
import { AppLayout } from "./components/layout/AppLayout";
import { Login } from "./components/pages/Login";
import { Dashboard } from "./components/pages/Dashboard";
import { DailyLog } from "./components/pages/DailyLog";
import { MenuManager } from "./components/pages/MenuManager";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      pageTitles: {
        dashboard: "Analytics Dashboard",
        dailylog: "Daily Operational Log",
        menu: "Menu Management",
      },
      sidebar: {
        dashboard: "Analytics",
        dailylog: "Daily Log",
        menu: "Menu Manager",
      },
      header: {
        operations: "Operations",
        user: "User",
      },
    },
    bm: {
      pageTitles: {
        dashboard: "Papan Pemuka Analitik",
        dailylog: "Log Operasi Harian",
        menu: "Pengurusan Menu",
      },
      sidebar: {
        dashboard: "Analitik",
        dailylog: "Log Harian",
        menu: "Pengurus Menu",
      },
      header: {
        operations: "Operasi",
        user: "Pengguna",
      },
    },
  };

  const t = translations[language];

  if (!isAuthenticated) {
    return (
      <Login
        onLogin={() => setIsAuthenticated(true)}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <AppLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      title={t.pageTitles[activeTab]}
      theme={theme}
      setTheme={setTheme}
      language={language}
      setLanguage={setLanguage}
      translations={t}
    >
      {activeTab === "dashboard" && (
        <Dashboard theme={theme} language={language} />
      )}
      {activeTab === "dailylog" && (
        <DailyLog theme={theme} language={language} />
      )}
      {activeTab === "menu" && (
        <MenuManager theme={theme} language={language} />
      )}
    </AppLayout>
  );
}
