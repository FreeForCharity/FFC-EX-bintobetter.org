"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Check, Copy } from "@/components/ui/icons";

/**
 * The address, shown in full, with a copy control beside it.
 *
 * Every "contact us" affordance on this site used to be a bare mailto: button.
 * On a machine with no mail client configured — which is most phones' web
 * browsers and most school Chromebooks — clicking one does nothing visible, and
 * the reasonable conclusion is that the site is broken. Printing the address
 * next to the button means the click is never the only way to reach us.
 *
 * The address is rendered as text regardless of whether the clipboard API is
 * available, so the fallback is "select it yourself", never "nothing".
 */
export function CopyEmail({
  tone = "light",
  className = "",
  label = "Prefer to write to us yourself?",
}: {
  tone?: "light" | "dark";
  className?: string;
  /** Leading sentence. Pass "" to render the address on its own. */
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // A pending "Copied" reset must not fire into an unmounted component.
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, permissions, older browser). The
      // address is on screen either way, so there is nothing to recover from.
    }
  }

  const muted = tone === "dark" ? "text-paper/60" : "text-ink/60";
  const strong = tone === "dark" ? "text-paper" : "text-ink";
  const border = tone === "dark" ? "border-paper/25 hover:border-court" : "border-ink/25 hover:border-ink";
  const outline = tone === "dark" ? "focus-visible:outline-paper" : "focus-visible:outline-ink";

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-sm ${muted} ${className}`}>
      {label ? <span>{label}</span> : null}
      <a
        href={`mailto:${site.email}`}
        className={`font-mono text-[0.8125rem] font-medium underline underline-offset-4 ${strong} transition-colors hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 ${outline}`}
      >
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex items-center gap-1.5 rounded-[3px] border ${border} px-2.5 py-1 text-xs font-medium ${strong} transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${outline}`}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? "Copied" : "Copy address"}
      </button>

      {/* The confirmation is announced from here, not from `aria-live` on the
          button itself. A live region on an interactive control is announced
          inconsistently across screen readers, and changing a focused button's
          accessible name mid-interaction is its own confusion. This element is
          visually hidden and exists only to be read aloud. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${site.email} copied to the clipboard` : ""}
      </span>
    </div>
  );
}
