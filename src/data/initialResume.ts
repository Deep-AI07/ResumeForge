import { ResumeData, Theme } from '../types/resume';

export const DEFAULT_RESUME_DATA: ResumeData = {
  personal: {
    fullName: "Alex Morgan",
    headline: "Full-Stack Software Engineer | Node.js, Express & React Specialist",
    email: "alex.morgan.dev@gmail.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    githubUrl: "https://github.com/alexmorgan-dev",
    linkedinUrl: "https://linkedin.com/in/alexmorgandev",
    portfolioUrl: "https://alexmorgan.io",
    summary: "High-performance Full-Stack Engineer with 4+ years of experience designing robust RESTful microservices and reactive web applications. Specialized in scalable backend architecture with Express.js, TypeScript, and PostgreSQL alongside reactive UI development in React. Decreased database query latency by 42% across core transactional services and authored end-to-end CI/CD workflows."
  },
  skills: [
    {
      id: "sk-1",
      category: "Languages & Frameworks",
      items: ["JavaScript (ES6+)", "TypeScript", "Node.js", "Express.js", "React.js", "Python", "HTML5/CSS3"]
    },
    {
      id: "sk-2",
      category: "Databases & Cloud",
      items: ["PostgreSQL", "MySQL", "Redis", "Docker", "AWS (S3, EC2)", "Sequelize ORM"]
    },
    {
      id: "sk-3",
      category: "Architecture & DevOps",
      items: ["RESTful APIs", "Microservices", "Git / GitHub Actions", "Jest", "JWT Auth", "Postman"]
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Nexus Cloud Systems",
      role: "Senior Backend Developer",
      location: "San Francisco, CA",
      startDate: "2024-01",
      endDate: "Present",
      current: true,
      highlights: [
        "Architected and deployed high-throughput Node.js microservices processing over 1.2M daily API transactions with 99.98% uptime.",
        "Engineered distributed Redis caching layers that reduced PostgreSQL round-trip latency by 42% for critical billing workflows.",
        "Refactored monolithic legacy controllers into modular, decoupled service layers using Express middleware and strict Joi schema validations."
      ]
    },
    {
      id: "exp-2",
      company: "Aether Dynamics",
      role: "Full-Stack Software Engineer",
      location: "Austin, TX (Remote)",
      startDate: "2022-06",
      endDate: "2023-12",
      current: false,
      highlights: [
        "Constructed an interactive operational dashboard using React, Tailwind CSS, and TanStack Query, accelerating analytics data retrieval by 35%.",
        "Streamlined automated CI/CD deployment pipelines on GitHub Actions, cutting release deployment cycles from 45 minutes to 8 minutes.",
        "Authored comprehensive unit and integration test suites with Jest and Supertest, expanding automated test coverage from 58% to 92%."
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "DataStream: Real-time Analytics Engine",
      techStack: ["Node.js", "Express", "React", "PostgreSQL", "WebSocket"],
      liveUrl: "https://datastream-analytics.demo",
      repoUrl: "https://github.com/alexmorgan-dev/datastream-engine",
      highlights: [
        "Constructed a high-throughput event processing platform capable of ingesting 25,000 events/sec via WebSocket connections.",
        "Designed responsive real-time metric visualizers in React, handling dynamic window filtering without frame drops.",
        "Built automated database partitioned archiving in PostgreSQL, preventing index degradation for datasets exceeding 10M records."
      ]
    },
    {
      id: "proj-2",
      title: "CloudVault: Encrypted Credential Manager",
      techStack: ["TypeScript", "Express", "Redis", "Docker", "Tailwind CSS"],
      liveUrl: "https://cloudvault-demo.app",
      repoUrl: "https://github.com/alexmorgan-dev/cloudvault-core",
      highlights: [
        "Implemented AES-256 GCM encryption algorithms for zero-knowledge client secret storage with strict multi-tenant authorization.",
        "Configured Redis token rate-limiting to defend REST endpoints against brute-force attacks and volumetric API abuse."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "State University of Technology",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science & Engineering",
      startYear: "2018",
      endYear: "2022",
      score: "3.85 / 4.00 GPA"
    }
  ]
};

export const PRESET_THEMES: Theme[] = [
  {
    id: "classic",
    name: "Classic ATS",
    fontFamily: "font-serif",
    primaryColor: "#1e293b",
    accentColor: "#334155",
    headerBg: "transparent",
    layoutStyle: "classic",
    headerAlignment: "center",
    dividerStyle: "solid",
    density: "normal"
  },
  {
    id: "modern",
    name: "Modern Tech",
    fontFamily: "font-sans",
    primaryColor: "#0f172a",
    accentColor: "#4f46e5",
    headerBg: "transparent",
    layoutStyle: "modern",
    headerAlignment: "left",
    dividerStyle: "thick-accent",
    density: "normal"
  },
  {
    id: "clean-mono",
    name: "Clean Mono",
    fontFamily: "font-mono",
    primaryColor: "#18181b",
    accentColor: "#059669",
    headerBg: "transparent",
    layoutStyle: "minimal",
    headerAlignment: "left",
    dividerStyle: "dashed",
    density: "compact"
  },
  {
    id: "executive",
    name: "Executive Serif",
    fontFamily: "font-serif",
    primaryColor: "#292524",
    accentColor: "#b45309",
    headerBg: "transparent",
    layoutStyle: "classic",
    headerAlignment: "center",
    dividerStyle: "double",
    density: "spacious"
  },
  {
    id: "minimal-navy",
    name: "Minimal Navy",
    fontFamily: "font-sans",
    primaryColor: "#0369a1",
    accentColor: "#0284c7",
    headerBg: "transparent",
    layoutStyle: "modern",
    headerAlignment: "left",
    dividerStyle: "solid",
    density: "compact"
  }
];

export const DEFAULT_CUSTOM_THEME: Theme = {
  id: "custom",
  name: "Custom Theme",
  fontFamily: "font-sans",
  primaryColor: "#2563eb",
  accentColor: "#1d4ed8",
  headerAlignment: "left",
  dividerStyle: "solid",
  density: "normal",
  sectionHeadingTransform: "uppercase",
  borderRadius: "rounded-md"
};
