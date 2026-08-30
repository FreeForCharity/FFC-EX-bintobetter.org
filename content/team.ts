export interface TeamMember {
  name: string;
  role: string;
  school: string;
  fact: string;
  photo: string;
  imagePosition?: string;
}

export interface TeamGroup {
  category: string;
  members: TeamMember[];
}

export const teamGroups: TeamGroup[] = [
  {
    category: "Executives",
    members: [
      {
        name: "Lalit Batchu",
        role: "Co-Founder and Co-President",
        school: "American High School; Grade 12",
        fact: "My full name has 6 words!",
        photo: "/members/Lalit Batchu.webp",
      },
      {
        name: "Pradyun Kanuparthi",
        role: "Co-Founder and Co-President",
        school: "Mission San Jose High School; Grade 12",
        fact: "I start for my varsity basketball team.",
        photo: "/members/Pradyun Kanuparthi.webp",
      },
      {
        name: "Hala Amer",
        role: "Vice President",
        school: "American High School; Grade 11",
        fact: "I recently built a 3D printer.",
        photo: "/members/Hala Amer.webp",
        imagePosition: "center 40%",
      },
      {
        name: "Aarush Chavali",
        role: "Vice President",
        school: "American High School; Grade 11",
        fact: "I can type up to 120 words per minute.",
        photo: "/members/Aarush Chavali.webp",
      },
    ],
  },
  {
    category: "Eco-Filament",
    members: [
      {
        name: "Saket Sandru",
        role: "Eco-Filament Director",
        school: "American High School; Grade 11",
        fact: "I broke the bone in the human body that's hardest to heal.",
        photo: "/members/Saket Sandru.webp",
      },
      {
        name: "Nameh Gupta",
        role: "Eco-Filament Officer",
        school: "American High School; Grade 11",
        fact: "I like gardening in my free time.",
        photo: "/members/Nameh Gupta.webp",
      },
      {
        name: "Atiksh Jain",
        role: "Eco-Filament Officer",
        school: "American High School; Grade 10",
        fact: "I have traveled to 15 countries.",
        photo: "/members/Atiksh Jain.webp",
      },
      {
        name: "Cedric Liu",
        role: "Eco-Filament Officer",
        school: "Mission San Jose High School; Grade 11",
        fact: "I like to build stuff",
        photo: "/members/Cedric Liu.webp",
      },
    ],
  },
  {
    category: "Tech to Treasure",
    members: [
      {
        name: "Krishan Ranjan",
        role: "Tech to Treasure Director",
        school: "American High School; Grade 11",
        fact: "I've visited over 15 states in the US",
        photo: "/members/Krishan Ranjan.webp",
      },
      {
        name: "Clovis Zhang",
        role: "Tech to Treasure Officer",
        school: "American High School; Grade 11",
        fact: "I enjoy playing Pokemon Go.",
        photo: "/members/Clovis Zhang.webp",
      },
      {
        name: "Deenadarrshan Sathiyamoorthi",
        role: "Tech to Treasure Officer",
        school: "American High School; Grade 11",
        fact: "I like to play basketball",
        photo: "/members/Deenadarrshan Sathiyamoorthi.webp",
      },
      {
        name: "Arya Marker",
        role: "Tech to Treasure Officer",
        school: "Mission San Jose High School; Grade 12",
        fact: "I've played piano for 5+ years!",
        photo: "/members/Arya Marker.webp",
      },
    ],
  },
  {
    category: "Bounce Back",
    members: [
      {
        name: "Clovis Zhang",
        role: "Bounce Back Director",
        school: "American High School; Grade 11",
        fact: "I enjoy playing Pokemon Go.",
        photo: "/members/Clovis Zhang.webp",
      },
      {
        name: "Thomas Nguyen",
        role: "Bounce Back Officer",
        school: "American High School; Grade 11",
        fact: "I like sleeping",
        photo: "/members/Thomas Nguyen.webp",
      },
      {
        name: "Shlok Patani",
        role: "Bounce Back Officer",
        school: "Mission San Jose High School; Grade 10",
        fact: "I enjoy playing basketball and giving back to the community, beyond Fremont",
        photo: "/members/Shlok Patani.webp",
      },
    ],
  },
  {
    category: "Leadership",
    members: [
      {
        name: "Yuvraj Dar",
        role: "Technical Lead",
        school: "American High School; Grade 12",
        fact: "I am an Eagle Scout.",
        photo: "/members/Yuvraj Dar.webp",
      },
      {
        name: "Ashish Swaminathan",
        role: "Secretary",
        school: "Mission San Jose High School; Grade 12",
        fact: "I am an eclectic person, liking academia while also liking sports and leadership.",
        photo: "/members/Ashish Swaminathan.webp",
        imagePosition: "center 25%",
      },
      {
        name: "Aarnav Sharma",
        role: "Technical",
        school: "Archbishop Mitty High School; Grade 9",
        fact: "I developed this website",
        photo: "",
      },
    ],
  },
  {
    category: "Fundraising",
    members: [
      {
        name: "Vihaan Sanghvi",
        role: "Fundraising Director",
        school: "American High School; Grade 11",
        fact: "I love traveling",
        photo: "/members/Vihaan Sanghvi.webp",
      },
      {
        name: "Abhay Shankar",
        role: "Fundraising Officer",
        school: "Mission San Jose High School; Grade 12",
        fact: "I have a labradoodle named Milo",
        photo: "/members/Abhay Shankar.webp",
      },
      {
        name: "Yuva Chandrachood",
        role: "Fundraising Officer",
        school: "American High School; Grade 11",
        fact: "I am 6 feet 1 inch tall.",
        photo: "/members/Yuva Chandrachood.webp",
        imagePosition: "70% 25%",
      },
    ],
  },
  {
    category: "Outreach",
    members: [
      {
        name: "Deepam Kapadia",
        role: "Outreach Director",
        school: "American High School; Grade 11",
        fact: "I am a top 5% Tetris player.",
        photo: "/members/Deepam.webp",
      },
      {
        name: "Anika Batra",
        role: "Outreach Director",
        school: "American High School; Grade 11",
        fact: "I have never broken a bone.",
        photo: "/members/Anika Batra.webp",
      },
      {
        name: "Sanvi Varute",
        role: "Outreach Officer",
        school: "American High School; Grade 11",
        fact: "I like cars",
        photo: "/members/Sanvi Varute.webp",
        imagePosition: "center 30%",
      },
      {
        name: "Nandini Kumar",
        role: "Outreach Officer",
        school: "American High School; Grade 11",
        fact: "",
        photo: "/members/Nandini Kumar.webp",
        imagePosition: "center 40%",
      },
    ],
  },
];
