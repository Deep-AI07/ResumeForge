import { ResumeData, ATSAnalysis, ATSCheck, Theme } from '../types/resume';

const ACTION_VERBS = [
  'accelerated', 'achieved', 'analyzed', 'architected', 'automated', 'built',
  'centralized', 'championed', 'composed', 'consolidated', 'constructed',
  'created', 'decreased', 'delivered', 'deployed', 'designed', 'developed',
  'devised', 'doubled', 'engineered', 'established', 'executed', 'expanded',
  'formulated', 'generated', 'guided', 'headed', 'identified', 'implemented',
  'improved', 'increased', 'initiated', 'innovated', 'instituted', 'integrated',
  'invented', 'launched', 'led', 'managed', 'maximized', 'mentored', 'minimized',
  'modernized', 'negotiated', 'optimized', 'orchestrated', 'overhauled', 'piloted',
  'pioneered', 'produced', 'programmed', 'reduced', 'refactored', 'resolved',
  'restructured', 'revamped', 'scaled', 'simplified', 'spearheaded', 'standardized',
  'streamlined', 'strengthened', 'structured', 'surpassed', 'systematized',
  'transformed', 'unified', 'upgraded', 'yielded'
];

export function calculateATSScore(
  resumeData: ResumeData,
  theme?: Theme,
  isStrictATS: boolean = false
): ATSAnalysis {
  const checks: ATSCheck[] = [];
  let score = 0;

  // 1. Contact Identifiers (15 points)
  const p = resumeData.personal || ({} as ResumeData['personal']);
  const hasName = Boolean(p.fullName?.trim() && p.fullName.trim().length >= 3);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasValidEmail = Boolean(p.email && emailRegex.test(p.email.trim()));
  const hasPhone = Boolean(p.phone && p.phone.replace(/\D/g, '').length >= 7);
  const hasLocation = Boolean(p.location && p.location.trim().length >= 3);
  const hasLinks = Boolean(
    (p.githubUrl && p.githubUrl.includes('.')) ||
    (p.linkedinUrl && p.linkedinUrl.includes('.')) ||
    (p.portfolioUrl && p.portfolioUrl.includes('.'))
  );

  let contactScore = 0;
  const missingContact: string[] = [];
  if (hasName) contactScore += 4; else missingContact.push('full name');
  if (hasValidEmail) contactScore += 4; else missingContact.push('valid email');
  if (hasPhone) contactScore += 3; else missingContact.push('phone number');
  if (hasLocation) contactScore += 2; else missingContact.push('location (City/State)');
  if (hasLinks) contactScore += 2; else missingContact.push('profile link');

  score += contactScore;
  checks.push({
    title: 'Contact Identifiers',
    passed: contactScore >= 13,
    score: contactScore,
    max: 15,
    note: missingContact.length === 0
      ? 'All essential candidate contact tags (Name, Email, Phone, Location, Web) are present.'
      : `Missing or incomplete: ${missingContact.join(', ')}.`
  });

  // 2. Professional Summary & Discipline Keywords (10 points)
  const summaryWords = p.summary ? p.summary.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = summaryWords.length;
  let summaryScore = 0;
  let summaryNote = '';

  if (wordCount >= 30 && wordCount <= 110) {
    summaryScore += 7;
  } else if (wordCount >= 15 && wordCount <= 150) {
    summaryScore += 4;
  } else if (wordCount > 0) {
    summaryScore += 2;
  }

  const roleKeywordsRegex = /\b(engineer|developer|architect|full\s*stack|frontend|backend|devops|data|analyst|specialist|lead|manager|programmer|consultant)\b/i;
  const hasRoleKeywords = roleKeywordsRegex.test(p.summary || '') || roleKeywordsRegex.test(p.headline || '');
  if (hasRoleKeywords && summaryScore > 0) {
    summaryScore += 3;
    summaryNote = `Optimal length (${wordCount} words) with recognized discipline role keywords.`;
  } else if (summaryScore > 0) {
    summaryScore += 1;
    summaryNote = `Summary length is ${wordCount} words; consider adding target job title keywords.`;
  } else {
    summaryNote = 'No professional summary found. An executive summary gives ATS context for keyword indexing.';
  }

  score += summaryScore;
  checks.push({
    title: 'Professional Summary & Keywords',
    passed: summaryScore >= 8,
    score: summaryScore,
    max: 10,
    note: summaryNote
  });

  // 3. Typography & ATS Font Compatibility (15 points) [THEME-AWARE]
  let fontScore = 15;
  let fontNote = '';
  let fontPassed = true;

  if (isStrictATS) {
    fontScore = 15;
    fontNote = 'Strict Mode active: Standard serif typeface with optimal OCR compliance across all scanners.';
    fontPassed = true;
  } else if (theme) {
    if (theme.fontFamily === 'font-mono' || theme.id === 'clean-mono') {
      fontScore = 6;
      fontPassed = false;
      fontNote = `Monospaced font ('${theme.name}') flagged. Monospaced typefaces cause character spacing and column extraction failures in older ATS parsers (Taleo, iCIMS, Workday). Standard Sans-serif (Arial/Inter) or Serif (Times New Roman) is strongly recommended.`;
    } else if (theme.fontFamily === 'font-serif') {
      fontScore = 14;
      fontNote = `Serif typeface ('${theme.name}') is widely supported by ATS text-parsing engines.`;
    } else {
      fontScore = 15;
      fontNote = `Standard Sans-Serif font ('${theme.name}') provides 100% universal ATS OCR parsing.`;
    }
  } else {
    fontScore = 15;
    fontNote = 'Standard web-safe font profile.';
  }

  score += fontScore;
  checks.push({
    title: 'Typography & Font ATS Compatibility',
    passed: fontPassed,
    score: fontScore,
    max: 15,
    note: fontNote
  });

  // 4. Section Dividers & Visual Hierarchy (10 points) [THEME-AWARE]
  let layoutScore = 10;
  let layoutNote = '';
  let layoutPassed = true;

  if (isStrictATS) {
    layoutScore = 10;
    layoutNote = 'Standard single-line dividers guarantee clear linear section extraction.';
  } else if (theme) {
    if (theme.dividerStyle === 'dashed' || theme.id === 'clean-mono') {
      layoutScore = 5;
      layoutPassed = false;
      layoutNote = `Dashed dividers in '${theme.name}' flagged. Dashed or dotted line characters are often misread as table borders or markdown artifacts by legacy text extractors.`;
    } else if (theme.dividerStyle === 'double') {
      layoutScore = 7;
      layoutPassed = true;
      layoutNote = `Double dividers in '${theme.name}' may slightly confuse optical section boundary detection in legacy parsers.`;
    } else if (theme.dividerStyle === 'thick-accent') {
      layoutScore = 9;
      layoutPassed = true;
      layoutNote = 'Accent dividers provide strong visual hierarchy with minimal parser ambiguity.';
    } else {
      layoutScore = 10;
      layoutPassed = true;
      layoutNote = 'Solid horizontal rules provide clean and reliable section boundary detection.';
    }
  } else {
    layoutScore = 10;
    layoutNote = 'Standard section separation.';
  }

  score += layoutScore;
  checks.push({
    title: 'Layout & Divider Formatting',
    passed: layoutPassed,
    score: layoutScore,
    max: 10,
    note: layoutNote
  });

  // 5. Work Experience Completeness & Dates (15 points)
  let expScore = 0;
  const expList = resumeData.experience || [];
  const expCount = expList.length;

  if (expCount >= 2) expScore += 6;
  else if (expCount === 1) expScore += 4;

  const validRoles = expList.filter(e => e.role?.trim() && e.company?.trim()).length;
  if (validRoles === expCount && expCount > 0) expScore += 3;
  else if (validRoles > 0) expScore += 1;

  const yearRegex = /\b(19|20)\d{2}\b/i;
  const validDates = expList.filter(e => yearRegex.test(e.startDate || '') && (e.current || yearRegex.test(e.endDate || ''))).length;
  if (validDates === expCount && expCount > 0) expScore += 3;
  else if (validDates > 0) expScore += 1;

  const totalExpBullets = expList.reduce((acc, e) => acc + (e.highlights?.length || 0), 0);
  if (totalExpBullets >= expCount * 2 && expCount > 0) expScore += 3;
  else if (totalExpBullets > 0) expScore += 1;

  score += expScore;
  checks.push({
    title: 'Work Experience Structure & Dates',
    passed: expScore >= 12,
    score: expScore,
    max: 15,
    note: expCount === 0
      ? 'No work experience entries recorded.'
      : `${expCount} roles with standard chronologic dates and ${totalExpBullets} total accomplishment bullets.`
  });

  // 6. Action Verbs & Measurable Metrics (15 points)
  const allHighlights = [
    ...(resumeData.experience || []).flatMap(e => e.highlights || []),
    ...(resumeData.projects || []).flatMap(p => p.highlights || [])
  ];

  let actionVerbCount = 0;
  const metricRegex = /\b(\d+%\b|\$\d+|\b\d+\+?\b|\b\d+M\b|\b\d+k\b|\b\d+ms\b|\b\d+x\b)/i;
  let metricCount = 0;

  for (const h of allHighlights) {
    const trimmed = h.trim().toLowerCase();
    const firstWord = trimmed.split(/\s+/)[0]?.replace(/[^a-z]/g, '');
    if (ACTION_VERBS.includes(firstWord) || ACTION_VERBS.some(v => trimmed.includes(` ${v} `))) {
      actionVerbCount++;
    }
    if (metricRegex.test(h)) {
      metricCount++;
    }
  }

  const verbScore = Math.min(7, Math.round((actionVerbCount / Math.max(1, allHighlights.length)) * 7 * 1.3));
  const metricScore = Math.min(8, metricCount * 2);
  const actionTotal = Math.min(15, verbScore + metricScore);

  score += actionTotal;
  checks.push({
    title: 'Action Verbs & Measurable Metrics',
    passed: actionTotal >= 11,
    score: actionTotal,
    max: 15,
    note: `${actionVerbCount} action-oriented bullets and ${metricCount} quantified metrics (%, $, numbers) found across ${allHighlights.length} highlights.`
  });

  // 7. Technical Skills Density & Categorization (10 points)
  const skillCategories = resumeData.skills || [];
  const totalSkills = skillCategories.reduce((acc, c) => acc + (c.items?.length || 0), 0);
  let skillsScore = 0;

  if (totalSkills >= 8 && totalSkills <= 32) {
    skillsScore += 7;
  } else if (totalSkills >= 4 && totalSkills <= 45) {
    skillsScore += 4;
  } else if (totalSkills > 0) {
    skillsScore += 2;
  }

  if (skillCategories.length >= 2 && totalSkills >= 4) {
    skillsScore += 3;
  } else if (skillCategories.length >= 1) {
    skillsScore += 1;
  }

  score += skillsScore;
  checks.push({
    title: 'Skill Keyword Density & Taxonomy',
    passed: skillsScore >= 8,
    score: skillsScore,
    max: 10,
    note: `${totalSkills} total technical skills organized into ${skillCategories.length} categories.`
  });

  // 8. Education & Credentials (10 points)
  const eduList = resumeData.education || [];
  let eduScore = 0;
  if (eduList.length >= 1) eduScore += 4;

  const hasDegree = eduList.some(e => e.degree && e.degree.trim().length >= 2);
  if (hasDegree) eduScore += 3;

  const hasSchoolAndYear = eduList.some(e => e.institution && e.institution.trim().length >= 2 && e.endYear);
  if (hasSchoolAndYear) eduScore += 3;

  score += eduScore;
  checks.push({
    title: 'Education & Academic History',
    passed: eduScore >= 8,
    score: eduScore,
    max: 10,
    note: eduList.length > 0
      ? `${eduList.length} education credential(s) with degree and institution identified.`
      : 'No education entries detected. Standard ATS parsers require degree accreditation.'
  });

  return {
    score: Math.min(100, Math.max(0, score)),
    checks
  };
}
