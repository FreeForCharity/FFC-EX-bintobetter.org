"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { site, MIN_UNSUPERVISED_AGE } from "@/content/site";

/**
 * Interstitial for links that leave the site and collect personal information
 * (Google Forms, Discord). COPPA turns on whether we collect from under-13s
 * without verifiable parental consent; a sentence of body copy asking nicely is
 * not a control, so this makes the confirmation an explicit, blocking step and
 * routes anyone under the age limit to a guardian-completed path instead.
 *
 * This is a self-attestation, not verification — nothing client-side can be. It
 * is a genuine gate rather than a notice, which is the difference between the
 * two branches below, and it is deliberately not remembered between clicks.
 *
 * Native <dialog> rather than a modal library: showModal() brings the focus
 * trap, Esc handling, inertness of the page behind, and the ::backdrop with it,
 * and this site has no other need for a dialog primitive.
 */
export function FormGate({
  href,
  children,
  className,
  what = "this form",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Named in the prompt, e.g. "the chapter application". */
  what?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [underage, setUnderage] = useState(false);
  const titleId = useId();

  function open(e: React.MouseEvent<HTMLAnchorElement>) {
    // Let modified clicks (new tab, download, middle click) through untouched —
    // intercepting them breaks expected browser behaviour, and the gate is
    // about informed intent rather than about preventing navigation.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setUnderage(false);
    ref.current?.showModal();
  }

  function proceed() {
    ref.current?.close();
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={open}
        className={className}
      >
        {children}
      </a>

      <dialog
        ref={ref}
        aria-labelledby={titleId}
        onClose={() => setUnderage(false)}
        className="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-[4px] bg-paper p-0 text-ink backdrop:bg-canvas/70 open:animate-none"
      >
        <div className="p-7">
          <h2 id={titleId} className="font-display text-2xl font-bold text-ink">
            {underage ? "Ask a parent or guardian" : "Before you continue"}
          </h2>

          {underage ? (
            <>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                We are not able to accept {what} directly from someone under{" "}
                {MIN_UNSUPERVISED_AGE}. Ask a parent or guardian to complete it
                for you, or have them email us and we will take it from there.
                You are still very welcome at our events — this is only about who
                fills in the form.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Parent or guardian inquiry")}`}
                  className="inline-flex items-center rounded-[3px] bg-court px-4 py-2 text-sm font-medium text-ink transition-[filter] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Email us with a guardian
                </a>
                <button
                  type="button"
                  onClick={() => ref.current?.close()}
                  className="inline-flex items-center rounded-[3px] border border-ink/25 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                {what.charAt(0).toUpperCase() + what.slice(1)} is hosted outside
                this website and will ask you for personal information under its
                provider&rsquo;s own privacy policy. Because we work with
                students, we have to ask first.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Are you {MIN_UNSUPERVISED_AGE} or older, or a parent or guardian
                completing this on a student&rsquo;s behalf?
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={proceed}
                  className="inline-flex items-center rounded-[3px] bg-court px-4 py-2 text-sm font-medium text-ink transition-[filter] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Yes, continue
                </button>
                <button
                  type="button"
                  onClick={() => setUnderage(true)}
                  className="inline-flex items-center rounded-[3px] border border-ink/25 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  No, I am under {MIN_UNSUPERVISED_AGE}
                </button>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-ink/50">
                What we do with what you send is set out in our{" "}
                <Link
                  href="/privacy-policy/"
                  className="underline underline-offset-4 hover:text-ink"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
