export const stats: { value: string; label: string }[] = [
  { value: "80,000+", label: "Items Repurposed" },
  { value: "15+", label: "Chapters Internationally" },
];

export const programsPreview: {
  slug: string;
  title: string;
  blurb: string;
  href: string;
  /**
   * Link text for the card. All three cards used to read "View More", which
   * tells a search engine nothing about the page being linked and gives screen
   * reader users three links with identical names in one list. Each one now
   * names its destination.
   */
  cta: string;
}[] = [
  {
    slug: "bounce-back",
    title: "Bounce Back",
    blurb:
      "Collects used tennis balls from clubs and repurposes them for schools (chair legs to reduce noise), animal shelters, and assisted living centers (walker feet).",
    href: "/bounce-back",
    cta: "Tennis balls for schools",
  },
  {
    slug: "tech-to-treasure",
    title: "Tech to Treasure",
    blurb:
      "Transforms old devices into educational tools before responsibly recycling remaining parts through e-waste channels.",
    href: "/tech-to-treasure",
    cta: "E-waste workshops",
  },
  {
    slug: "eco-filament",
    title: "Eco-Filament",
    blurb: "Repurposes suitable plastic waste into 3D printer filament for tools and toys.",
    href: "/eco-filament",
    cta: "Plastic to 3D filament",
  },
];

export const testimonials: { quote: string; author: string; role: string }[] = [
  {
    quote:
      "Thank you very much for your donation of 140 gently used tennis balls to my third grade Spanish immersion classroom at Blacow Elementary School. Cutting each individual ball so that it can fit each student leg chair must have been a lot of work! We are so appreciative of your time and effort in giving the tennis balls a new second life instead of throwing them into the landfill. Your donation has been well received by my students. The tennis-ball chair covers are gentler on the waxed floors and are helping prevent scratches. Most importantly, classroom activity transitions are so much quieter as the students get up from or come to sit in their chairs.",
    author: "Andrea MacKenzie",
    role: "3rd grade Spanish Immersion Teacher, Blacow Elementary",
  },
  {
    quote:
      "Thank you so much for dropping off the balls at the doggy day camp! The dogs absolutely love them, and I truly appreciate it as well. Whether they're playing or just need something to chew on when they're feeling stressed, those balls bring them so much joy. Your thoughtful contribution has made a big difference in supporting the pups here. We're incredibly grateful for your kindness and generosity.",
    author: "Allie",
    role: "Owner of Allie's Doggie Day Camp",
  },
  {
    quote:
      "My experience with Bin to Better has been extremely positive. The team was very thoughtful and communicated clearly throughout the entire process. The donated tennis balls have made a noticeable difference in my classroom by significantly reducing noise from chairs/desks. This has helped create a calmer and more focused learning environment where students can concentrate better and transitions are much smoother.",
    author: "Grace Shin",
    role: "Irvington High School Teacher",
  },
  {
    quote:
      "Bin to Better did a great service to my classroom! They personally came to help me install the tennis balls on the chair legs, and now the classroom is much quieter and more productive. The floors are safer and protected from the chairs scraping against them, and the students were so surprised to see how the tennis balls could be repurposed into something new! I would highly recommend them to any classroom.",
    author: "Brandon Lee",
    role: "Oliveira Elementary TK Teacher",
  },
  {
    quote:
      "Adding tennis balls to our chair legs has made an immediate difference in our third-grade classroom. The reduced noise has helped students focus during reading and small-group work, and transitions are smoother because the room stays calm. It’s a simple change with a big impact on learning.",
    author: "Yuji Yang",
    role: "Dual Language English and Mandarin Teacher, Bringhurst Elementary",
  },
];

export const mission: string[] = [
  "At Bin to Better, we believe that waste is not just trash. It is an opportunity. Every year, countless items with value and potential end up in landfills simply because they no longer serve their original purpose. Our mission is to change that narrative.",
  "We’re driven by a simple yet powerful idea: that one person’s excess can be another’s solution. Whether it’s used tennis balls, old electronics, or other overlooked resources, we aim to connect those who have with those who need. By building bridges between individuals, communities, and organizations, we promote a culture of reuse and responsible recycling.",
  "Through education, partnerships, and hands-on initiatives, Bin to Better empowers people to rethink waste and become part of a more sustainable, circular future. Together, we can turn what would have been thrown away into something better for people, communities, and the planet.",
];

export const projectsBlurb =
  "Below are snapshots of our three main projects. Click View More on each card to dive deeper into the details.";

export const contactPara =
  "We would love to hear from you. Whether you have questions, want to donate materials, or are interested in volunteering, please get in touch. We typically respond within a few school days.";
