import type { ReactNode } from "react";

type Theme = "light" | "dark";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  theme?: Theme;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  theme = "light",
}: ModalProps) => {
  if (!isOpen) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4">
      <div
        className={`rounded-[20px] border shadow-2xl w-full max-w-md p-6 transition-colors duration-300 ${
          isDark
            ? "bg-slate-900 border-slate-700 text-slate-100"
            : "bg-white border-black/[0.05] text-slate-800"
        }`}
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isDark
                ? "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
