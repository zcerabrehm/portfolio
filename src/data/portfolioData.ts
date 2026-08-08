export interface NavLink {
  id: string;
  label: string;
  href: string;
  shortcut?: string;
}

export interface StackItem {
  id: string;
  name: string;
  category: "runtime" | "cloud" | "ops" | "crm" | "data" | "lowcode" | "hardware";
  level: number;
  note: string;
}

export interface SpecRow {
  id: string;
  index: string;
  domain: string;
  capability: string;
  stack: string;
  maturity: "PROD" | "BETA" | "R&D";
  throughput: string;
  notes: string;
}

export interface GalleryCard {
  id: string;
  title: string;
  tag: string;
  image: string;
  year: string;
}

export interface ProjectChallenge {
  title: string;
  detail: string;
}

export interface Project {
  id: string;
  code: string;
  title: string;
  year: string;
  status: "PROD" | "BETA" | "ARCHIVED";
  role: string;
  summary: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  challenges: ProjectChallenge[];
  architecture: string[];
  image?: string;
  images?: string[];
  posterLabel?: string;
  links?: { label: string; href: string }[];
}

export interface ExperienceItem {
  id: string;
  org: string;
  role: string;
  period: string;
  detail: string;
}

export interface CommandItem {
  id: string;
  group: "navigate" | "project" | "action";
  label: string;
  hint: string;
  keywords: string[];
  action: "scroll" | "project" | "copy-email" | "external";
  payload: string;
}

export interface SiteMeta {
  name: string;
  shortName: string;
  handle: string;
  brand: string;
  role: string;
  education: string;
  location: string;
  email: string;
  availability: string;
  statusCode: string;
  latencyMs: number;
  version: string;
  discord: { label: string; href: string; handle: string };
  github: { label: string; href: string; handle: string };
  socials: { label: string; href: string }[];
}

export interface CtaContent {
  badge: string;
  headline: string;
  headlineMute: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  copiedLabel: string;
  mailSubject: string;
  stats: { label: string; value: string }[];
}

export const SITE: SiteMeta = {
  name: "Jino Alen A. Guiwan",
  shortName: "Alen",
  handle: "alenguiwan.dev",
  brand: "ALENGUIWAN.DEV",
  role: "Full Stack Developer & UI/UX Designer",
  education: "Computer Science graduate, City College of Angeles",
  location: "Philippines · UTC+8",
  email: "alenguiwan@gmail.com",
  availability: "Open for work",
  statusCode: "200 OK",
  latencyMs: 42,
  version: "v6.0.0",
  discord: {
    label: "Discord",
    href: "https://discord.com/users/688631280656580679",
    handle: "09002",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/JT-028/GENTA",
    handle: "JT-028/GENTA",
  },
  socials: [],
};

export const NAV_LINKS: NavLink[] = [
  { id: "about", label: "About", href: "#about", shortcut: "01" },
  { id: "work", label: "Work", href: "#work", shortcut: "02" },
  { id: "specs", label: "Skills", href: "#specs", shortcut: "03" },
  { id: "engage", label: "Hire", href: "#engage", shortcut: "04" },
  { id: "contact", label: "Contact", href: "#contact", shortcut: "05" },
];

export const ABOUT = {
  kicker: "01 · About",
  title: "A bit about me",
  body: [
    "Hey, I'm Alen. I like building things people can actually click, use, and trust. Some days that is a clean landing page. Other days it is a full app, a CRM flow, or even a little ESP32 box talking to the cloud.",
    "I work as a web developer, and on the side I take on projects that need both design sense and real code. I am easy to talk to, quick to reply, and happiest when the work ships.",
  ],
  image: "/projects/about/portrait.jpg",
  imageLabel: "Photo coming soon",
  facts: [
    { label: "Based", value: "Philippines" },
    { label: "Focus", value: "Full stack + UI/UX" },
    { label: "Also into", value: "PC builds · audio gear" },
  ],
};

export const CTA: CtaContent = {
  badge: "Let's talk",
  headline: "Let's work together",
  headlineMute: "Real systems. Real constraints.",
  body: "I help teams ship full stack builds, clean UI, and the messy middle between low code platforms and custom code. Currently a web developer by day. Open to freelance and remote collabs. I reply fast.",
  primaryLabel: "Email me",
  secondaryLabel: "Copy email",
  copiedLabel: "Copied",
  mailSubject: "Project inquiry from alenguiwan.dev",
  stats: [
    { label: "Reply", value: "<24h" },
    { label: "Work", value: "Remote" },
    { label: "Based", value: "PH" },
  ],
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "webdev-current",
    org: "Web developer",
    role: "Full time",
    period: "Current",
    detail:
      "Day job building and shipping web products. I move between low code platforms and custom stacks depending on what the project actually needs.",
  },
  {
    id: "freelance-past",
    org: "Freelance & client work",
    role: "Landing pages & CRM",
    period: "Ongoing",
    detail:
      "Marketing sites, automation funnels, and CRM wiring on tools like GoHighLevel and WordPress when campaigns need clean capture and follow up.",
  },
];

export const HERO_LINES: readonly string[] = [
  "$ whoami",
  "hey, i'm alen",
  "full stack + ui/ux · philippines",
  "$ day_job",
  "web developer · shipping live work",
  "$ after_hours",
  "pc tuning · audio gear · side builds",
  `$ status · open for collabs`,
];

/** Lifestyle gallery: things I enjoy outside (and around) the day job */
export const GALLERY_ROW_A: GalleryCard[] = [
  {
    id: "g1",
    title: "PC builds",
    tag: "HARDWARE",
    year: "Enjoy",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g2",
    title: "Desk setups",
    tag: "WORKSPACE",
    year: "Enjoy",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g3",
    title: "Mechanical keys",
    tag: "GEAR",
    year: "Enjoy",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g4",
    title: "Night coding",
    tag: "FOCUS",
    year: "Enjoy",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g5",
    title: "Clean UI craft",
    tag: "DESIGN",
    year: "Enjoy",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80",
  },
];

export const GALLERY_ROW_B: GalleryCard[] = [
  {
    id: "g6",
    title: "Hi-fi audio",
    tag: "SOUND",
    year: "Enjoy",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g7",
    title: "DAC and amp",
    tag: "AUDIO",
    year: "Enjoy",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g8",
    title: "City nights",
    tag: "VIBES",
    year: "Enjoy",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g9",
    title: "Coffee fuel",
    tag: "RITUAL",
    year: "Enjoy",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g10",
    title: "Tiny hardware",
    tag: "MAKER",
    year: "Enjoy",
    image:
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=1400&q=80",
  },
];

export const STACK_ITEMS: StackItem[] = [
  { id: "react", name: "React", category: "runtime", level: 92, note: "SPAs and product UI" },
  { id: "vue", name: "Vue", category: "runtime", level: 86, note: "Client web apps" },
  { id: "node", name: "Node.js", category: "runtime", level: 88, note: "APIs and tooling" },
  { id: "php", name: "PHP", category: "runtime", level: 90, note: "Server side apps" },
  { id: "laravel", name: "Laravel", category: "runtime", level: 88, note: "Custom backends" },
  { id: "cake", name: "CakePHP", category: "runtime", level: 88, note: "MVC product work" },
  { id: "python", name: "Python", category: "runtime", level: 84, note: "Scripts and services" },
  { id: "java", name: "Java", category: "runtime", level: 80, note: "Core CS foundation" },
  { id: "cpp", name: "C++", category: "runtime", level: 78, note: "Systems coursework" },
  { id: "wp", name: "WordPress", category: "lowcode", level: 90, note: "Sites and funnels" },
  { id: "ghl", name: "GoHighLevel", category: "lowcode", level: 90, note: "CRM and automation" },
  { id: "shopify", name: "Shopify", category: "lowcode", level: 84, note: "Store builds" },
  { id: "wix", name: "Wix", category: "lowcode", level: 82, note: "Fast launches" },
  { id: "esp", name: "ESP32", category: "hardware", level: 86, note: "Device + cloud link" },
  { id: "arduino", name: "Arduino", category: "hardware", level: 84, note: "Prototyping" },
];

export const SPEC_ROWS: SpecRow[] = [
  {
    id: "s01",
    index: "01",
    domain: "FULL CODE",
    capability: "Custom web architectures",
    stack: "React · Vue · Node · Laravel · CakePHP · PHP",
    maturity: "PROD",
    throughput: "Production",
    notes: "Custom apps when a template will not cut it. Auth, data models, APIs, and UI that stay maintainable.",
  },
  {
    id: "s02",
    index: "02",
    domain: "LOW CODE",
    capability: "Rapid platform delivery",
    stack: "WordPress · Wix · Shopify · GoHighLevel",
    maturity: "PROD",
    throughput: "Fast ship",
    notes: "Launch marketing sites, stores, and CRM funnels quickly, then harden the parts that need real code.",
  },
  {
    id: "s03",
    index: "03",
    domain: "BRIDGE",
    capability: "Low code meets full code",
    stack: "GHL · WP · Vue · Laravel · CakePHP",
    maturity: "PROD",
    throughput: "Hybrid",
    notes: "Pair platform speed with custom systems that scale when a template hits its ceiling.",
  },
  {
    id: "s04",
    index: "04",
    domain: "HARDWARE",
    capability: "ESP32 and Arduino builds",
    stack: "ESP32 · Arduino · GCP · Audio I/O",
    maturity: "PROD",
    throughput: "Device ready",
    notes: "Physical products that talk to the cloud. Mic layouts, manuals, and firmware paths that students can use.",
  },
  {
    id: "s05",
    index: "05",
    domain: "VOICE + AI",
    capability: "Speech in, model, speech out",
    stack: "STT · Gemini 2.5 Flash · TTS · GCP",
    maturity: "PROD",
    throughput: "Live loop",
    notes: "Classroom grade voice loops: capture, transcribe, reason, speak back on hardware without losing the thread.",
  },
  {
    id: "s06",
    index: "06",
    domain: "UI/UX",
    capability: "Product design and interface",
    stack: "Figma minded process · React · Tailwind",
    maturity: "PROD",
    throughput: "Clear",
    notes: "Design and ship in the same motion. Teacher panels, landing pages, and product screens that stay readable.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "genta",
    code: "GT-01",
    title: "GENTA",
    year: "2025",
    status: "PROD",
    role: "Full stack · Voice pipeline · Hardware link",
    summary:
      "Generative learning tool for Grade 3 students. ESP32 hardware plus teacher web panel, with STT, Gemini, and TTS in one loop.",
    description:
      "GENTA is a generative language model learning tool built for Grade 3 classrooms. Students speak into a custom ESP32 device. Audio goes to Google Cloud for speech to text, the transcript is fed to Gemini 2.5 Flash, then text to speech returns audio the ESP32 plays back. I own the connection path from device to GCP and the STT to Gemini to TTS loop. Teachers use a separate website and panel for classroom control. The hardware side includes a 4 page foldable booklet manual and a custom front panel microphone layout so the product is usable in real lessons, not just a lab demo.",
    stack: [
      "ESP32",
      "Arduino",
      "Google Cloud",
      "Speech to text",
      "Gemini 2.5 Flash",
      "Text to speech",
      "CakePHP",
      "PHP",
    ],
    metrics: [
      { label: "Grade", value: "3" },
      { label: "Model", value: "Gemini 2.5" },
      { label: "Device", value: "ESP32" },
    ],
    challenges: [
      {
        title: "Keep the voice loop alive on small hardware",
        detail:
          "ESP32 has tight memory and network limits. Audio has to go up for STT, wait on Gemini, then come back as TTS without feeling broken in class.",
      },
      {
        title: "Design for kids and teachers at once",
        detail:
          "Students stay on the device path. Teachers get the web panel only. Roles stay split so classroom control does not leak into the student experience.",
      },
      {
        title: "Hardware that a school can actually hold",
        detail:
          "Custom front panel mic layout and a 4 page foldable booklet so setup and use are clear outside the engineering room.",
      },
    ],
    architecture: [
      "ESP32 captures student speech on a custom mic panel",
      "GCP speech to text produces the transcript",
      "Gemini 2.5 Flash generates the learning reply",
      "GCP text to speech returns audio for ESP32 playback",
      "Teacher only website and panel for classroom control",
      "Physical kit includes a 4 page foldable booklet manual",
    ],
    image: "/projects/genta/dashboard.png",
    images: [
      "/projects/genta/dashboard.png",
      "/projects/genta/student-assessment.png",
      "/projects/genta/logo-mascot.png",
    ],
    posterLabel: "01 · GENTA",
    links: [{ label: "GitHub", href: "https://github.com/JT-028/GENTA" }],
  },
];

export const COMMANDS: CommandItem[] = [
  {
    id: "nav-top",
    group: "navigate",
    label: "Go to top",
    hint: "Jump",
    keywords: ["home", "top", "hero"],
    action: "scroll",
    payload: "top",
  },
  {
    id: "nav-about",
    group: "navigate",
    label: "Go to About",
    hint: "Jump",
    keywords: ["about", "me", "bio"],
    action: "scroll",
    payload: "about",
  },
  {
    id: "nav-work",
    group: "navigate",
    label: "Go to Work",
    hint: "Jump",
    keywords: ["work", "projects", "genta"],
    action: "scroll",
    payload: "work",
  },
  {
    id: "nav-specs",
    group: "navigate",
    label: "Go to Skills",
    hint: "Jump",
    keywords: ["specs", "stack", "skills", "capabilities"],
    action: "scroll",
    payload: "specs",
  },
  {
    id: "nav-engage",
    group: "navigate",
    label: "Go to Hire",
    hint: "Jump",
    keywords: ["engage", "hire", "cta", "work with"],
    action: "scroll",
    payload: "engage",
  },
  {
    id: "nav-contact",
    group: "navigate",
    label: "Go to Contact",
    hint: "Jump",
    keywords: ["contact", "email"],
    action: "scroll",
    payload: "contact",
  },
  ...PROJECTS.map(
    (p): CommandItem => ({
      id: `proj-${p.id}`,
      group: "project",
      label: p.title,
      hint: p.code,
      keywords: [p.title, p.code, ...p.stack].map((s) => s.toLowerCase()),
      action: "project",
      payload: p.id,
    }),
  ),
  {
    id: "act-email",
    group: "action",
    label: "Copy email",
    hint: SITE.email,
    keywords: ["email", "copy", "contact"],
    action: "copy-email",
    payload: SITE.email,
  },
  {
    id: "act-discord",
    group: "action",
    label: "Open Discord",
    hint: SITE.discord.handle,
    keywords: ["discord", "chat"],
    action: "external",
    payload: SITE.discord.href,
  },
];
