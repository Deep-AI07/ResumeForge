import React, { useState, useMemo, useRef } from 'react';
import { Info } from 'lucide-react';
import { ViewTab } from './types/resume';
import { PRESET_THEMES } from './data/initialResume';
import { useResumeStorage } from './hooks/useResumeStorage';
import { calculateATSScore } from './utils/atsAuditor';
import { exportResumeAsJSON, importResumeFromJSON, printResume } from './utils/exportHelpers';

import { Navbar } from './components/Navbar';
import { PersonalForm } from './components/editor/PersonalForm';
import { SkillsForm } from './components/editor/SkillsForm';
import { ExperienceForm } from './components/editor/ExperienceForm';
import { ProjectsForm } from './components/editor/ProjectsForm';
import { EducationForm } from './components/editor/EducationForm';
import { ResumeCanvas } from './components/preview/ResumeCanvas';
import { ATSScoreModal } from './components/modals/ATSScoreModal';
import { CustomThemeModal } from './components/modals/CustomThemeModal';

export default function App() {
  // --- APPLICATION STATE VIA HOOK ---
  const {
    resumeData,
    setResumeData,
    activeThemeId,
    setActiveThemeId,
    customThemes,
    addCustomTheme,
    updateCustomTheme,
    deleteCustomTheme,
    currentTheme,
    isSaving,
    resetToDefault
  } = useResumeStorage();

  const [isATSCheckEnabled, setIsATSCheckEnabled] = useState<boolean>(false);
  const [isStrictATS, setIsStrictATS] = useState<boolean>(false);
  const [activeViewTab, setActiveViewTab] = useState<ViewTab>('editor');
  const [showATSModal, setShowATSModal] = useState<boolean>(false);
  const [showCustomThemeModal, setShowCustomThemeModal] = useState<boolean>(false);
  const [themeModalMode, setThemeModalMode] = useState<'create' | 'edit'>('create');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- ATS AUDIT EVALUATOR ---
  // Only calculated when the ATS checking checkbox is checked, and dynamically accounts for theme formatting
  const atsAnalysis = useMemo(() => {
    if (!isATSCheckEnabled) return null;
    return calculateATSScore(resumeData, currentTheme, isStrictATS);
  }, [isATSCheckEnabled, resumeData, currentTheme, isStrictATS]);

  // --- ACTIONS ---
  const handleExportJSON = () => {
    exportResumeAsJSON(resumeData);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      importResumeFromJSON(
        e.target.files[0],
        (importedData) => setResumeData(importedData),
        (errorMessage) => alert(errorMessage)
      );
    }
  };

  const handlePrint = () => {
    printResume();
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all resume information to the default software engineering profile?')) {
      resetToDefault();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* --- PRINT CSS STYLES INJECTION --- */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 12mm;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print, .no-print * {
            display: none !important;
          }
          #printable-resume {
            box-shadow: none !important;
            border: none !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* --- TOP APPLICATION NAVBAR --- */}
      <Navbar
        atsScore={atsAnalysis?.score}
        isATSCheckEnabled={isATSCheckEnabled}
        onToggleATSCheck={setIsATSCheckEnabled}
        isStrictATS={isStrictATS}
        onToggleStrictATS={setIsStrictATS}
        activeThemeId={activeThemeId}
        onSelectTheme={setActiveThemeId}
        customThemes={customThemes}
        onOpenCreateCustomTheme={() => {
          setThemeModalMode('create');
          setShowCustomThemeModal(true);
        }}
        onOpenEditCustomTheme={() => {
          setThemeModalMode('edit');
          setShowCustomThemeModal(true);
        }}
        onOpenATSModal={() => setShowATSModal(true)}
        isSaving={isSaving}
        onImportJSON={handleImportJSON}
        onExportJSON={handleExportJSON}
        onResetData={handleResetToDefault}
        onPrint={handlePrint}
        activeViewTab={activeViewTab}
        onChangeViewTab={setActiveViewTab}
        fileInputRef={fileInputRef}
      />

      {/* --- MAIN SPLIT-VIEW WORKSPACE --- */}
      <main className="flex-1 flex overflow-hidden">
        {/* LEFT PANE: Resume Form Editor */}
        <section
          className={`w-full lg:w-[45%] xl:w-[42%] border-r border-slate-800 bg-slate-900/60 overflow-y-auto p-4 lg:p-6 no-print ${
            activeViewTab === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-5">
            {/* Header info banner */}
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/40 border border-slate-800 px-3.5 py-2.5 rounded-xl">
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                {isATSCheckEnabled && atsAnalysis ? (
                  <span>
                    ATS Check Active (<strong className="text-emerald-400">{atsAnalysis.score}/100</strong>). Live audit updates automatically.
                  </span>
                ) : (
                  <span>
                    Fill in your details below.{' '}
                    <button
                      type="button"
                      onClick={() => setIsATSCheckEnabled(true)}
                      className="text-indigo-400 hover:text-indigo-300 underline font-medium"
                    >
                      Check the ATS box
                    </button>{' '}
                    above to audit compliance.
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono text-indigo-400 hidden sm:inline">Zero Server / 100% Client</span>
            </div>

            {/* Editor Sub-Forms */}
            <PersonalForm
              personal={resumeData.personal}
              onChange={(updated) => setResumeData((prev) => ({ ...prev, personal: updated }))}
            />

            <SkillsForm
              skills={resumeData.skills}
              onChange={(updated) => setResumeData((prev) => ({ ...prev, skills: updated }))}
            />

            <ExperienceForm
              experience={resumeData.experience}
              onChange={(updated) => setResumeData((prev) => ({ ...prev, experience: updated }))}
            />

            <ProjectsForm
              projects={resumeData.projects}
              onChange={(updated) => setResumeData((prev) => ({ ...prev, projects: updated }))}
            />

            <EducationForm
              education={resumeData.education}
              onChange={(updated) => setResumeData((prev) => ({ ...prev, education: updated }))}
            />
          </div>
        </section>

        {/* RIGHT PANE: A4 Preview Canvas */}
        <section
          className={`flex-1 bg-slate-950 overflow-y-auto p-4 lg:p-8 flex justify-center items-start ${
            activeViewTab === 'preview' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <ResumeCanvas
            data={resumeData}
            theme={currentTheme}
            isStrictATS={isStrictATS}
          />
        </section>
      </main>

      {/* --- CUSTOM THEME DESIGNER MODAL --- */}
      <CustomThemeModal
        isOpen={showCustomThemeModal}
        onClose={() => setShowCustomThemeModal(false)}
        baseTheme={currentTheme}
        allThemes={[...PRESET_THEMES, ...customThemes]}
        mode={themeModalMode}
        onSaveNewTheme={(newTheme) => {
          addCustomTheme(newTheme);
        }}
        onUpdateTheme={(updatedTheme) => {
          updateCustomTheme(updatedTheme);
        }}
        onDeleteTheme={(themeId) => {
          deleteCustomTheme(themeId);
        }}
      />

      {/* --- ATS AUDIT SCORE MODAL --- */}
      {atsAnalysis && (
        <ATSScoreModal
          isOpen={showATSModal}
          onClose={() => setShowATSModal(false)}
          analysis={atsAnalysis}
        />
      )}
    </div>
  );
}
