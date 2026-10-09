import React from 'react';
import {
  FileText,
  ShieldCheck,
  Sliders,
  Upload,
  Download,
  RotateCcw,
  Printer,
  Edit3,
  Eye,
  Plus
} from 'lucide-react';
import { PRESET_THEMES } from '../data/initialResume';
import { ViewTab, Theme } from '../types/resume';

interface NavbarProps {
  atsScore?: number;
  isATSCheckEnabled: boolean;
  onToggleATSCheck: (val: boolean) => void;
  isStrictATS: boolean;
  onToggleStrictATS: (val: boolean) => void;
  activeThemeId: string;
  onSelectTheme: (id: string) => void;
  customThemes: Theme[];
  onOpenCreateCustomTheme: () => void;
  onOpenEditCustomTheme: () => void;
  onOpenATSModal: () => void;
  isSaving: boolean;
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportJSON: () => void;
  onResetData: () => void;
  onPrint: () => void;
  activeViewTab: ViewTab;
  onChangeViewTab: (tab: ViewTab) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const Navbar: React.FC<NavbarProps> = ({
  atsScore,
  isATSCheckEnabled,
  onToggleATSCheck,
  isStrictATS,
  onToggleStrictATS,
  activeThemeId,
  onSelectTheme,
  customThemes,
  onOpenCreateCustomTheme,
  onOpenEditCustomTheme,
  onOpenATSModal,
  isSaving,
  onImportJSON,
  onExportJSON,
  onResetData,
  onPrint,
  activeViewTab,
  onChangeViewTab,
  fileInputRef
}) => {
  return (
    <header className="no-print sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Autosave status */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">ResumeForge</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                SPA
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSaving ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                }`}
              />
              <span>{isSaving ? 'Saving...' : 'Saved to browser'}</span>
            </div>
          </div>
        </div>

        {/* Center: ATS Score Checkbox & Controls */}
        <div className="flex items-center flex-wrap gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
          {/* Main Checkbox: Enable ATS Checking */}
          <label className="flex items-center gap-2 px-2.5 py-1 text-xs cursor-pointer select-none text-slate-300 hover:text-white transition-colors">
            <input
              type="checkbox"
              id="ats-checking-toggle"
              checked={isATSCheckEnabled}
              onChange={(e) => onToggleATSCheck(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-0 focus:ring-offset-0 bg-slate-700 border-slate-600 cursor-pointer"
            />
            <span className="font-semibold text-xs flex items-center gap-1.5">
              <ShieldCheck className={`w-3.5 h-3.5 ${isATSCheckEnabled ? 'text-emerald-400' : 'text-slate-400'}`} />
              Check ATS Score
            </span>
          </label>

          {/* Conditional: ATS Score Badge and Strict ATS option only visible when checkbox is checked */}
          {isATSCheckEnabled && atsScore !== undefined && (
            <>
              {/* ATS Score Button */}
              <button
                onClick={onOpenATSModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-700/80 hover:bg-slate-700 text-slate-200 transition-all border border-slate-600/50 animate-in fade-in"
                title="View complete ATS diagnostic audit"
              >
                <span>Score:</span>
                <span
                  className={`font-bold px-1.5 py-0.2 rounded text-[11px] ${
                    atsScore >= 80
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : atsScore >= 60
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {atsScore}/100
                </span>
                <span className="text-[10px] text-indigo-300 underline underline-offset-2 ml-0.5">
                  View Audit →
                </span>
              </button>

              {/* Strict ATS Mode Toggle */}
              <label className="flex items-center gap-1.5 px-2 py-1 text-xs cursor-pointer select-none text-slate-300 hover:text-white border-l border-slate-700 pl-2">
                <input
                  type="checkbox"
                  id="strict-ats-toggle"
                  checked={isStrictATS}
                  onChange={(e) => onToggleStrictATS(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-0 focus:ring-offset-0 bg-slate-700 border-slate-600 cursor-pointer"
                />
                <span className="text-[11px] text-slate-300">
                  Strict Monochrome
                </span>
              </label>
            </>
          )}
        </div>

        {/* Right: Theme Selector & Action Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Picker Dropdown & Actions */}
          {!isStrictATS && (
            <div className="flex items-center gap-1.5">
              <select
                value={activeThemeId}
                onChange={(e) => {
                  if (e.target.value === '__create_new__') {
                    onOpenCreateCustomTheme();
                  } else {
                    onSelectTheme(e.target.value);
                  }
                }}
                className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <optgroup label="Preset Themes">
                  {PRESET_THEMES.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </optgroup>
                {customThemes.length > 0 && (
                  <optgroup label="Your Custom Themes">
                    {customThemes.map((theme) => (
                      <option key={theme.id} value={theme.id}>
                        🎨 {theme.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="Create Theme">
                  <option value="__create_new__">✨ + Create New Theme...</option>
                </optgroup>
              </select>

              <button
                onClick={onOpenCreateCustomTheme}
                title="Create a new custom theme using the current theme as a base"
                className="p-1.5 rounded-lg border text-xs flex items-center gap-1 bg-slate-800 text-indigo-300 border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">New Theme</span>
              </button>

              {customThemes.some((t) => t.id === activeThemeId) && (
                <button
                  onClick={onOpenEditCustomTheme}
                  title="Edit current custom theme"
                  className="p-1.5 rounded-lg border text-xs flex items-center gap-1 bg-indigo-600/30 text-indigo-200 border-indigo-500/50 hover:bg-indigo-600/50 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              )}
            </div>
          )}

          {/* Utility Actions */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImportJSON}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import from JSON"
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
          </button>

          <button
            onClick={onExportJSON}
            title="Export as JSON"
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={onResetData}
            title="Reset Demo Data"
            className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Download PDF Trigger */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile View Switcher */}
      <div className="flex lg:hidden mt-2 border-t border-slate-800 pt-2 gap-2">
        <button
          onClick={() => onChangeViewTab('editor')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 ${
            activeViewTab === 'editor' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit Resume
        </button>
        <button
          onClick={() => onChangeViewTab('preview')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 ${
            activeViewTab === 'preview' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Live Preview
        </button>
      </div>
    </header>
  );
};
