import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Mail } from "@/components/ui/icons";
import { site } from "@/content/site";

export type EmailAction = {
  /** Button label. Say what the message is for, not "Email us". */
  label: string;
  /** Prefilled subject line, in plain text — encoded here. */
  subject: string;
  variant?: "primary" | "secondary" | "onDark" | "light";
};

/**
 * A row of mailto: buttons that says out loud what it does.
 *
 * Each button still opens a prefilled message, because that is the fastest path
 * for the majority who do have a mail client. What changes is that the row is
 * labelled as opening an email app and prints the address underneath, so a
 * visitor whose browser swallows the click can still see where to write. See
 * CopyEmail for why that matters.
 */
export function EmailActions({
  actions,
  tone = "light",
  className = "",
  note = "These open a pre-addressed email.",
}: {
  actions: EmailAction[];
  tone?: "light" | "dark";
  className?: string;
  /** Sentence before the address. Pass "" to show the address alone. */
  note?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Button
            // Label alone is not unique: two actions may reasonably share a
            // label and differ only in subject, which React would reconcile as
            // one node. The pair is what identifies an action here.
            key={`${action.label}:${action.subject}`}
            href={`mailto:${site.email}?subject=${encodeURIComponent(action.subject)}`}
            variant={action.variant ?? "primary"}
            icon={<Mail className="size-4" />}
          >
            {action.label}
          </Button>
        ))}
      </div>
      <CopyEmail tone={tone} className="mt-4" label={note} />
    </div>
  );
}
