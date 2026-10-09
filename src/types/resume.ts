export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  summary: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  score?: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

export interface Theme {
  id: string;
  name: string;
  fontFamily: string;
  primaryColor: string;
  accentColor: string;
  headerBg?: string;
  layoutStyle?: string;
  headerAlignment: 'left' | 'center' | string;
  dividerStyle: 'solid' | 'thick-accent' | 'dashed' | 'double' | string;
  density: 'compact' | 'normal' | 'spacious' | string;
  sectionHeadingTransform?: string;
  borderRadius?: string;
}

export interface ATSCheck {
  title: string;
  passed: boolean;
  score: number;
  max: number;
  note: string;
}

export interface ATSAnalysis {
  score: number;
  checks: ATSCheck[];
}

export type ViewTab = 'editor' | 'preview';
