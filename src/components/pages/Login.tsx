import type { Dispatch, SetStateAction } from "react";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

type Theme = "light" | "dark";

interface LoginProps {
  onLogin: () => void;
  theme?: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const Login = ({ onLogin, theme = "light", setTheme }: LoginProps) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDark
          ? "bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#111827_40%,_#020817_100%)]"
          : "bg-[radial-gradient(circle_at_top,_#f8fbff_0%,_#eef4ff_35%,_#f5f7fb_100%)]"
      }`}
    >
      <div className="absolute right-6 top-6">
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl border transition-all duration-200 ${
            isDark
              ? "border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
          }`}
          aria-label="Toggle light and dark mode"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>

      <Card
        theme={theme}
        className="w-full max-w-md p-8 flex flex-col gap-6 text-center border-slate-200/80 shadow-[0_30px_80px_rgba(15,23,42,0.08)]"
      >
        <div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1d74f5] to-[#0f172a] flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-[0_18px_30px_rgba(29,116,245,0.24)]">
            🍃
          </div>
          <h2
            className={`text-3xl font-bold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
          >
            EcoBite F&B
          </h2>
          <p
            className={`text-sm mt-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            Sign in to access operational analytics
          </p>
        </div>

        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onLogin();
          }}
          className="flex flex-col gap-4 text-left"
        >
          <Input
            theme={theme}
            label="Email"
            type="email"
            placeholder="manager@restaurant.com"
            required
          />
          <Input
            theme={theme}
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />
          <div
            className={`flex items-center justify-between text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>
            <span className="text-blue-500 font-medium">Forgot password?</span>
          </div>
          <Button
            theme={theme}
            type="submit"
            className="w-full mt-2 py-3 text-base"
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};
