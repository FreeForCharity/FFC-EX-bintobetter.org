import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterEach, vi } from "vitest";
import { FormGate } from "@/components/ui/FormGate";
import { MIN_UNSUPERVISED_AGE } from "@/content/site";

// jsdom implements <dialog> without showModal/close. Stub them so the
// component's calls work and `open` reflects state for the queries below.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

const FORM = "https://forms.gle/example";

function setup() {
  const open = vi.spyOn(window, "open").mockImplementation(() => null);
  render(
    <FormGate href={FORM} what="the test form">
      Open the form
    </FormGate>
  );
  return { open, trigger: screen.getByRole("link", { name: "Open the form" }) };
}

describe("FormGate", () => {
  it("does not navigate straight to the form on a plain click", () => {
    const { open, trigger } = setup();
    fireEvent.click(trigger);

    expect(open).not.toHaveBeenCalled();
    expect(screen.getByRole("heading", { name: /before you continue/i })).toBeVisible();
  });

  it("opens the form only after the age is confirmed", () => {
    const { open, trigger } = setup();
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("button", { name: /yes, continue/i }));

    expect(open).toHaveBeenCalledWith(FORM, "_blank", "noopener,noreferrer");
  });

  it("routes an under-13 visitor to a guardian instead of the form", () => {
    const { open, trigger } = setup();
    fireEvent.click(trigger);
    fireEvent.click(
      screen.getByRole("button", {
        name: new RegExp(`under ${MIN_UNSUPERVISED_AGE}`, "i"),
      })
    );

    expect(open).not.toHaveBeenCalled();
    expect(screen.getByRole("heading", { name: /parent or guardian/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /email us with a guardian/i }).getAttribute("href")).toMatch(
      /^mailto:/
    );
  });

  it("keeps the raw href so the link still works without JavaScript", () => {
    const { trigger } = setup();
    expect(trigger).toHaveAttribute("href", FORM);
    expect(trigger).toHaveAttribute("rel", "noopener noreferrer");
  });

  // The gate is a per-click confirmation, not a stored preference: on a shared
  // family computer one person's answer must not carry into the next visit.
  it("re-asks on every click rather than remembering the answer", () => {
    const { trigger } = setup();
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("button", { name: /yes, continue/i }));
    fireEvent.click(trigger);

    expect(screen.getByRole("heading", { name: /before you continue/i })).toBeVisible();
  });
});
