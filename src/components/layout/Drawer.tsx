"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

type DrawerProps = {
  open: boolean;
  side: "left" | "right";
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Drawer({ open, side, title, onClose, children }: DrawerProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  const closedPosition = side === "left" ? "-translate-x-full" : "translate-x-full";
  const placement = side === "left" ? "left-0" : "right-0";

  return (
    <div
      className={`fixed inset-0 z-[80] transition-[visibility] duration-300 ${
        open ? "visible" : "invisible delay-300"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label={`Close ${title}`}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={`absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute ${placement} top-0 flex h-full w-[min(90vw,420px)] flex-col border-white/10 bg-[#0b0e0c] text-[#f4f7ef] shadow-[0_0_80px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : closedPosition
        } ${side === "left" ? "border-r" : "border-l"}`}
      >
        <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-white/10 px-5 sm:h-[76px] sm:px-6">
          <h2 className="text-lg font-black tracking-tight text-[#f4f7ef]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            aria-label={`Close ${title}`}
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-[#f4f7ef] transition duration-300 hover:rotate-90 hover:border-[#bdff11] hover:bg-[#bdff11] hover:text-[#070908] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bdff11]"
          >
            <X aria-hidden="true" size={19} strokeWidth={2.4} />
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}
