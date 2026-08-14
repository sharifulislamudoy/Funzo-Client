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
        className={`absolute ${placement} top-0 flex h-full w-[min(90vw,420px)] flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : closedPosition
        }`}
      >
        <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-zinc-200 px-5 sm:h-[76px] sm:px-6">
          <h2 className="text-lg font-black tracking-tight text-[#141414]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            aria-label={`Close ${title}`}
            className="grid size-10 place-items-center rounded-full border border-zinc-200 text-[#141414] transition duration-300 hover:rotate-90 hover:border-[#141414] hover:bg-[#141414] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
          >
            <X aria-hidden="true" size={19} strokeWidth={2.4} />
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}
