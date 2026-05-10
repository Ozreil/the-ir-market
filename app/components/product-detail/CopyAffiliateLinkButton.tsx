"use client";

import { useEffect, useState } from "react";

type ToastState = {
  message: string;
  tone: "success" | "error";
};

export function CopyAffiliateLinkButton({ url }: { url: string }) {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setToast(null);
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, [toast]);

  async function handleCopy() {
    try {
      await copyToClipboard(url);
      setToast({
        message: "Affiliate link copied.",
        tone: "success",
      });
    } catch {
      setToast({
        message: "Could not copy link.",
        tone: "error",
      });
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-14 w-full items-center justify-center border border-[#121212] px-6 text-xs font-bold uppercase tracking-[0.18em] transition hover:border-gold hover:text-[#8f741f]"
      >
        Copy Link
      </button>

      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className={`absolute left-1/2 top-[calc(100%+0.75rem)] z-30 w-max max-w-[min(82vw,20rem)] -translate-x-1/2 border px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] shadow-[0_18px_45px_rgba(0,0,0,0.18)] ${
            toast.tone === "success"
              ? "border-gold/40 bg-[#121212] text-white"
              : "border-red-200 bg-white text-red-700"
          }`}
        >
          {toast.message}
        </div>
      ) : null}
    </div>
  );
}

async function copyToClipboard(value: string) {
  if (!value) {
    throw new Error("Missing link");
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const copied = document.execCommand("copy");

    if (!copied) {
      throw new Error("Copy command failed");
    }
  } finally {
    document.body.removeChild(textarea);
  }
}
