import { site, fiscalSponsor, MIN_UNSUPERVISED_AGE } from "@/content/site";

/**
 * Copy for /privacy-policy and /terms-of-service.
 *
 * Route names are deliberately the long forms. The Free For Charity post-deploy
 * smoke (post-deploy-smoke.yml) asserts the footer links `/privacy-policy` and
 * `/terms-of-service|/tos`; `/privacy` alone fails that check. The old path is
 * kept alive as a meta-refresh stub in public/privacy/.
 */

export type LegalSection = { heading: string; body: string[] };

/**
 * The cookie claim below is only true while the site ships no analytics, no
 * pixels, and no third-party embeds. Adding any of those — GA, Clarity, Meta,
 * an iframed form or map — makes this section false and very likely requires a
 * consent mechanism. Treat it as a tripwire, not boilerplate.
 */
export const cookiePolicy: LegalSection = {
  heading: "Cookies and tracking",
  body: [
    `This website sets no cookies. It is a static site with no analytics, no advertising or social pixels, no session tracking, and no embedded third-party frames. Nothing here follows you between visits or across other sites, so there is no consent banner to dismiss and nothing to opt out of.`,
    `Links that leave this site are a different matter. Google Forms, Discord, GitHub, Google Photos, and donation platforms each set their own cookies once you arrive on them, under their own policies rather than ours. Those links are labelled so you can decide before you click.`,
    `Your browser may still store ordinary technical data such as cache entries. That is standard browser behaviour and is not something this site reads or transmits.`,
  ],
};

export const privacySections: LegalSection[] = [
  {
    heading: "What we collect",
    body: [
      `We collect nothing on this website itself. It has no forms, no accounts, and no server that could receive a submission.`,
      `We do receive information you choose to send us: what you type into one of our linked Google Forms, what you email to ${site.email}, and what you post if you join our Discord. That is the whole of it.`,
    ],
  },
  {
    heading: "How we use it",
    body: [
      `To reply to you, to coordinate events and volunteer shifts, and to report program impact in aggregate. We do not sell, rent, or trade personal information, and we do not share it with anyone outside Bin to Better except the form and messaging providers that carry it.`,
    ],
  },
  {
    heading: "Young people",
    body: [
      `Bin to Better is student-led and works with students. If you are under ${MIN_UNSUPERVISED_AGE}, a parent or guardian must complete any form on your behalf — we ask you to confirm this before we send you to a form, and we delete submissions that appear to come from a child directly.`,
      `Discord is for participants aged ${MIN_UNSUPERVISED_AGE} and over only, which is Discord's own requirement as well as ours.`,
      `We collect no more youth data than an activity needs, and never publish a student's contact details. A parent or guardian may ask us what we hold about their child and require us to delete it, at any time and without giving a reason.`,
    ],
  },
  {
    heading: "Photographs",
    body: [
      `We photograph events and sometimes publish those photographs. If you or your child appear in one and you would rather not, email ${site.email} with enough detail to identify the image and we will remove it. We do not ask why.`,
    ],
  },
  cookiePolicy,
  {
    heading: "Your choices",
    body: [
      `Write to ${site.email} to ask what we hold about you, correct it, delete it, unsubscribe from updates, or remove a photograph. One address covers all of it.`,
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      `Bin to Better is a student-led environmental initiative operating under the fiscal sponsorship of ${fiscalSponsor.name} (EIN ${fiscalSponsor.ein}). Donations are received and receipted by ${fiscalSponsor.name}; verify our tax-exempt status using that EIN.`,
    ],
  },
  {
    heading: "Using this site",
    body: [
      `The site is offered as-is for information about our programs. You may read, quote, and link to it freely. Our name, logo, and program branding stay ours — please ask before using them to represent a project we are not part of.`,
    ],
  },
  {
    heading: "Programs and donated materials",
    body: [
      `Participation in a collection, workshop, or chapter is voluntary. Materials you donate become the property of Bin to Better and we cannot return them or guarantee a particular use for any specific item. We do not accept hazardous material, and we cannot value a donation for tax purposes.`,
      `Wipe your own devices before donating them. We route everything through certified recycling partners and take reasonable care, but we cannot be responsible for data left on hardware handed to us.`,
    ],
  },
  {
    heading: "Services we link to",
    body: [
      `Google Forms, Discord, GitHub, Google Photos, and donation platforms are operated by other companies under their own terms and privacy policies. We choose them carefully but do not control them, and we are not responsible for what they do with what you give them.`,
    ],
  },
  {
    heading: "Accuracy and liability",
    body: [
      `Impact figures, event details, and partner listings are kept current to the best of a volunteer team's ability and may be out of date or wrong. Nothing here is a warranty. To the extent the law allows, Bin to Better is not liable for loss arising from use of this website.`,
    ],
  },
  {
    heading: "Questions",
    body: [`Email ${site.email} and a person will read it.`],
  },
];
