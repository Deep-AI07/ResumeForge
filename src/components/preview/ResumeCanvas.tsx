import React from 'react';
import { ResumeData, Theme } from '../../types/resume';

interface ResumeCanvasProps {
  data: ResumeData;
  theme: Theme;
  isStrictATS: boolean;
}

export const ResumeCanvas: React.FC<ResumeCanvasProps> = ({ data, theme, isStrictATS }) => {
  return (
    <div className="w-full max-w-[210mm] my-auto">
      {/* Canvas Hint Toolbar */}
      <div className="no-print flex items-center justify-between mb-3 text-xs text-slate-400 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-500" />
          <span>
            Rendering:{' '}
            <strong className="text-slate-200">
              {isStrictATS ? 'Strict Monochrome ATS' : theme.name}
            </strong>
          </span>
        </div>
        <span className="text-[11px] text-slate-500">A4 Standard (210mm × 297mm)</span>
      </div>

      {/* The Actual A4 Sheet */}
      <div
        id="printable-resume"
        className={`bg-white text-slate-900 shadow-2xl rounded-sm transition-all duration-200 ${
          isStrictATS ? 'font-serif' : theme.fontFamily
        } ${
          theme.density === 'compact'
            ? 'p-6 md:p-8 text-[12px]'
            : theme.density === 'spacious'
            ? 'p-10 md:p-14 text-[14px]'
            : 'p-8 md:p-10 text-[13px]'
        }`}
        style={{ minHeight: '297mm' }}
      >
        <ResumeDocumentContent data={data} theme={theme} isStrictATS={isStrictATS} />
      </div>
    </div>
  );
};

interface ResumeDocumentContentProps {
  data: ResumeData;
  theme: Theme;
  isStrictATS: boolean;
}

export const ResumeDocumentContent: React.FC<ResumeDocumentContentProps> = ({
  data,
  theme,
  isStrictATS
}) => {
  const { personal, skills, experience, projects, education } = data;

  // Header separator styling helper
  const renderDivider = () => {
    if (isStrictATS) {
      return <hr className="border-t border-black my-2" />;
    }
    switch (theme.dividerStyle) {
      case 'thick-accent':
        return <div className="h-0.5 my-2" style={{ backgroundColor: theme.accentColor }} />;
      case 'dashed':
        return <div className="border-t border-dashed my-2" style={{ borderColor: theme.primaryColor }} />;
      case 'double':
        return <div className="border-t-2 border-b my-2 h-1" style={{ borderColor: theme.accentColor }} />;
      default:
        return <div className="border-t my-2" style={{ borderColor: '#cbd5e1' }} />;
    }
  };

  const sectionHeaderStyle = {
    color: isStrictATS ? '#000000' : theme.primaryColor
  };

  const accentTextStyle = {
    color: isStrictATS ? '#000000' : theme.accentColor
  };

  return (
    <div className="leading-relaxed">
      {/* --- HEADER BLOCK --- */}
      <header className={`mb-5 ${theme.headerAlignment === 'center' && !isStrictATS ? 'text-center' : 'text-left'}`}>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight" style={sectionHeaderStyle}>
          {personal.fullName || 'Your Full Name'}
        </h1>
        {personal.headline && (
          <p className="font-semibold text-xs md:text-sm mt-0.5 text-slate-700" style={accentTextStyle}>
            {personal.headline}
          </p>
        )}

        {/* Contact Links Bar */}
        <div
          className={`flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-slate-600 ${
            theme.headerAlignment === 'center' && !isStrictATS ? 'justify-center' : 'justify-start'
          }`}
        >
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="hover:underline flex items-center gap-1">
              <span>{personal.email}</span>
            </a>
          )}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.linkedinUrl && (
            <span>
              •{' '}
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
                style={accentTextStyle}
              >
                {isStrictATS ? personal.linkedinUrl : 'LinkedIn'}
              </a>
            </span>
          )}
          {personal.githubUrl && (
            <span>
              •{' '}
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
                style={accentTextStyle}
              >
                {isStrictATS ? personal.githubUrl : 'GitHub'}
              </a>
            </span>
          )}
          {personal.portfolioUrl && (
            <span>
              •{' '}
              <a
                href={personal.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
                style={accentTextStyle}
              >
                {isStrictATS ? personal.portfolioUrl : 'Portfolio'}
              </a>
            </span>
          )}
        </div>
      </header>

      {/* --- SUMMARY SECTION --- */}
      {personal.summary && (
        <section className="mb-4">
          <h2 className="font-bold text-xs uppercase tracking-wider" style={sectionHeaderStyle}>
            Professional Summary
          </h2>
          {renderDivider()}
          <p className="text-slate-800 text-justify text-[11.5px] leading-normal">{personal.summary}</p>
        </section>
      )}

      {/* --- TECHNICAL SKILLS --- */}
      {skills && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold text-xs uppercase tracking-wider" style={sectionHeaderStyle}>
            Technical Skills
          </h2>
          {renderDivider()}
          <div className="space-y-1 text-[11.5px]">
            {skills.map((cat) => (
              <div key={cat.id} className="flex flex-wrap">
                <span className="font-semibold text-slate-900 w-44 shrink-0">{cat.category}:</span>
                <span className="text-slate-700 flex-1">{cat.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- WORK EXPERIENCE --- */}
      {experience && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold text-xs uppercase tracking-wider" style={sectionHeaderStyle}>
            Work Experience
          </h2>
          {renderDivider()}
          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900 text-xs">{exp.role}</span>
                    <span className="text-slate-600"> — </span>
                    <span className="font-medium text-slate-800 text-xs" style={accentTextStyle}>
                      {exp.company}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-600 font-mono">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                  </span>
                </div>
                {exp.location && <p className="text-[10.5px] text-slate-500 italic mb-1">{exp.location}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-slate-700 text-[11.5px]">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- PROJECTS --- */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold text-xs uppercase tracking-wider" style={sectionHeaderStyle}>
            Projects
          </h2>
          {renderDivider()}
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                    {proj.techStack && proj.techStack.length > 0 && (
                      <span className="text-[10.5px] text-slate-500">({proj.techStack.join(', ')})</span>
                    )}
                  </div>
                  <div className="text-[10.5px] space-x-2">
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                        style={accentTextStyle}
                      >
                        {isStrictATS ? proj.repoUrl : 'Source'}
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                        style={accentTextStyle}
                      >
                        {isStrictATS ? proj.liveUrl : 'Live Demo'}
                      </a>
                    )}
                  </div>
                </div>
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-slate-700 text-[11.5px]">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- EDUCATION --- */}
      {education && education.length > 0 && (
        <section className="mb-2">
          <h2 className="font-bold text-xs uppercase tracking-wider" style={sectionHeaderStyle}>
            Education
          </h2>
          {renderDivider()}
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900 text-xs">{edu.degree}</span> in{' '}
                  <span className="text-slate-800">{edu.fieldOfStudy}</span>
                  <div className="text-[11px] text-slate-600">{edu.institution}</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-slate-600">
                    {edu.startYear} – {edu.endYear}
                  </span>
                  {edu.score && <div className="text-[10.5px] text-slate-500">{edu.score}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
