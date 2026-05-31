// ---------------------------------------------------------
// PORTFOLIO DATA CONFIGURATION
// ---------------------------------------------------------

export const profile = {
  name: "Jugal Kishore Reddy Thangella",
  role: "Full-Stack Developer & Systems Engineer",
  tagline: "Building robust systems from Go backends to Next.js frontends, with a strict adherence to human-centered UI/UX principles.",
  bio: "I am a computer science student bridging the gap between low-level systems engineering and high-fidelity user experiences. Whether I am structuring a polyglot monorepo with Go and Next.js, applying Fitts's Law to interface design, or researching device-free human sensing using Wi-Fi Channel State Information, I approach software as a craft.",
  systemStatus: "Currently maintaining a 6-day PPL split while writing Go backends. Ready to connect on engineering roles or academic collaborations.",
  location: "Gainesville / Hyderabad",
  github: "github.com/tjkreddy",
  linkedin: "linkedin.com/in/jugal-kishore-reddy-thangella",
  instagram: "instagram.com/jugal_kishore_reddy_thangella"
};

export const stats = [
  { label: "Core Projects", value: "3" },
  { label: "Day PPL Split", value: "6" },
  { label: "Vim User", value: "100%" }
];

export const details = [
  { key: "Full Name", value: "Jugal Kishore Reddy Thangella" },
  { key: "Education", value: "Computer Science — Mahindra University & University of Florida (Exchange)" },
  { key: "Focus", value: "Polyglot monorepos, systems architecture, Gestalt design principles" },
  { key: "Interests", value: "Terminal workflows, Hypertrophy training, Spicy Indian Cuisine" }
];

export const skills = {
  languages: [
    { name: "Go", proficiency: 90 },
    { name: "TypeScript", proficiency: 88 },
    { name: "SQL", proficiency: 85 },
    { name: "Bash Scripting", proficiency: 75 }
  ],
  frameworks: [
    { name: "Next.js", proficiency: 92 },
    { name: "PostgreSQL", proficiency: 85 },
    { name: "tRPC", proficiency: 80 },
    { name: "React", proficiency: 85 }
  ],
  infrastructure: [
    { name: "Vim Workflow", proficiency: 95 },
    { name: "Git / Version Control", proficiency: 90 },
    { name: "Monorepo Architecture", proficiency: 85 }
  ],
  design: [
    "Gestalt Principles",
    "Fitts's Law Applications",
    "SQUACK Feedback Method",
    "High-Contrast Typography"
  ]
};

export const projects = [
  {
    id: "eatwise",
    title: "EatWise.exe",
    type: "Full-Stack Application",
    description: "A smart kitchen and pantry management ecosystem engineered to monitor inventory and actively reduce household food waste.",
    tags: ["Next.js", "Go", "PostgreSQL", "Monorepo"]
  },
  {
    id: "mahindra-placement",
    title: "Mahindra Placement Portal",
    type: "Web Infrastructure",
    description: "Comprehensive university placement tracking system built on a modern Next.js web application monorepo setup.",
    tags: ["Next.js", "tRPC", "TypeScript"]
  },
  {
    id: "wifi-sensing",
    title: "Wi-Fi Human Sensing",
    type: "Research & Systems",
    description: "Academic research and implementation leveraging Wi-Fi Channel State Information (CSI) for device-free motion detection.",
    tags: ["Research", "Networking", "Hardware"]
  },
  {
    id: "godavari-flood",
    title: "Godavari Flood Detection",
    type: "Technical Architecture",
    description: "Technical implementation of a localized early-warning flood detection system.",
    tags: ["Systems", "Data"]
  },
  {
    id: "event-horizon",
    title: "Event_Horizon",
    type: "Systems / Math",
    description: "Custom gravity physics simulation engine built entirely for raw computational performance.",
    tags: ["Golang", "Math"]
  }
];

export const experience = [
  {
    id: "uf-exchange",
    date: "Fall 2026",
    company: "University of Florida",
    role: "Exchange Student — CISE Department",
    description: "Selected for an international exchange program within the Computer & Information Science & Engineering department, expanding expertise in global computing standards and networking architectures.",
    tags: ["Academics", "International Exchange"]
  },
  {
    id: "mahindra-student",
    date: "Current",
    company: "Mahindra University",
    role: "Student — Computer Science & Engineering",
    description: "Pursuing a comprehensive degree in CSE, bridging theoretical algorithms with practical full-stack application development.",
    tags: []
  }
];
