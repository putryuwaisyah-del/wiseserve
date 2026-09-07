// src/components/layout/Header.jsx
export const Header = ({
  title,
  user = "Store Manager",
  theme = "light",
  onThemeToggle,
  language = "en",
  setLanguage,
}) => {
  const isDark = theme === "dark";
  const isBM = language === "bm";

  return (
    <header
      className={`h-20 border-b px-6 md:px-8 flex items-center justify-between backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-slate-800 bg-slate-900/70"
          : "border-slate-200/80 bg-white/70"
      }`}
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">
          {isBM ? "Operasi" : "Operations"}
        </p>
        <h1
          className={`text-2xl font-semibold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
        >
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`inline-flex items-center gap-1 rounded-2xl border p-1 ${
            isDark
              ? "border-slate-700 bg-slate-800"
              : "border-slate-200 bg-slate-100"
          }`}
        >
          {[
            { code: "en", label: "ENG" },
            { code: "bm", label: "BM" },
          ].map((option) => (
            <button
              key={option.code}
              type="button"
              onClick={() => setLanguage && setLanguage(option.code)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-semibold tracking-[0.18em] transition-all ${
                language === option.code
                  ? isDark
                    ? "bg-slate-100 text-slate-900"
                    : "bg-slate-900 text-white"
                  : isDark
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onThemeToggle}
          className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl border transition-all duration-200 ${
            isDark
              ? "border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
              : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
          aria-label="Toggle light and dark mode"
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl border shadow-sm ${
            isDark
              ? "bg-slate-800/90 border-slate-700"
              : "bg-slate-100/90 border-slate-200"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe] text-[#1d4ed8] text-xs flex items-center justify-center font-semibold shadow-inner">
            {user.charAt(0)}
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
              {isBM ? "Pengguna" : "User"}
            </span>
            <span
              className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}
            >
              {user}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
