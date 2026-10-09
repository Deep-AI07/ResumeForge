import React, { useState, useEffect } from 'react';
import { Palette, X, Copy, Trash2, AlertTriangle, Sparkles } from 'lucide-react';
import { Theme } from '../../types/resume';

interface CustomThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseTheme: Theme;
  allThemes: Theme[];
  mode: 'create' | 'edit';
  onSaveNewTheme: (newTheme: Theme) => void;
  onUpdateTheme: (updatedTheme: Theme) => void;
  onDeleteTheme?: (themeId: string) => void;
}

export const CustomThemeModal: React.FC<CustomThemeModalProps> = ({
  isOpen,
  onClose,
  baseTheme,
  allThemes,
  mode,
  onSaveNewTheme,
  onUpdateTheme,
  onDeleteTheme
}) => {
  const [draftTheme, setDraftTheme] = useState<Theme>(baseTheme);
  const [selectedBaseId, setSelectedBaseId] = useState<string>(baseTheme.id);

  // Initialize draft when modal opens or baseTheme changes
  useEffect(() => {
    if (!isOpen) return;

    if (mode === 'create') {
      setSelectedBaseId(baseTheme.id);
      setDraftTheme({
        ...baseTheme,
        id: `custom_${Date.now()}`,
        name: `Custom ${baseTheme.name}`
      });
    } else {
      setSelectedBaseId(baseTheme.id);
      setDraftTheme({ ...baseTheme });
    }
  }, [isOpen, baseTheme, mode]);

  if (!isOpen) return null;

  // When user picks a different existing theme to base on
  const handleBaseChange = (themeId: string) => {
    const existing = allThemes.find((t) => t.id === themeId);
    if (!existing) return;

    setSelectedBaseId(themeId);
    setDraftTheme((prev) => ({
      ...existing,
      id: mode === 'create' ? prev.id : existing.id,
      name: mode === 'create' ? `Custom ${existing.name}` : existing.name
    }));
  };

  const handleCreateNew = () => {
    const freshTheme: Theme = {
      ...draftTheme,
      id: `custom_${Date.now()}`,
      name: draftTheme.name.trim() || `Custom Theme ${new Date().toLocaleDateString()}`
    };
    onSaveNewTheme(freshTheme);
    onClose();
  };

  const handleUpdateExisting = () => {
    onUpdateTheme({
      ...draftTheme,
      name: draftTheme.name.trim() || 'Custom Theme'
    });
    onClose();
  };

  const handleDelete = () => {
    if (onDeleteTheme && window.confirm(`Delete custom theme "${draftTheme.name}"?`)) {
      onDeleteTheme(draftTheme.id);
      onClose();
    }
  };

  const isFontMono = draftTheme.fontFamily === 'font-mono';
  const isDashedDivider = draftTheme.dividerStyle === 'dashed';

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {mode === 'create' ? 'Create New Custom Theme' : 'Edit Custom Theme'}
              </h3>
              <p className="text-xs text-slate-400">
                {mode === 'create'
                  ? 'Uses an existing theme as a base to create a brand new custom theme'
                  : 'Modify this custom theme or clone it into a new one'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Base Theme Selector */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5 text-indigo-400" />
                Base on Existing Theme
              </label>
              <span className="text-[11px] text-slate-400">Copies styling into new theme</span>
            </div>
            <select
              value={selectedBaseId}
              onChange={(e) => handleBaseChange(e.target.value)}
              className="w-full bg-slate-900 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {allThemes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.id.startsWith('custom_') ? `🎨 ${theme.name}` : theme.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Name */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">New Theme Name</label>
            <input
              type="text"
              value={draftTheme.name}
              onChange={(e) => setDraftTheme((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Modern Emerald, Sleek Dark"
              className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Typography */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-slate-300 font-semibold">Typography Family</label>
              {isFontMono && (
                <span className="text-[10px] text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Monospaced fonts reduce ATS score
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'font-sans', label: 'Modern Sans (Inter)' },
                { id: 'font-serif', label: 'Classic Serif (Times)' },
                { id: 'font-mono', label: 'Code Mono' }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setDraftTheme((prev) => ({ ...prev, fontFamily: f.id }))}
                  className={`p-2 rounded-lg border text-center font-medium transition-all ${
                    draftTheme.fontFamily === f.id
                      ? 'border-indigo-500 bg-indigo-500/20 text-white shadow-sm'
                      : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Primary Color (Headings)</label>
              <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
                <input
                  type="color"
                  value={draftTheme.primaryColor}
                  onChange={(e) => setDraftTheme((prev) => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={draftTheme.primaryColor}
                  onChange={(e) => setDraftTheme((prev) => ({ ...prev, primaryColor: e.target.value }))}
                  className="bg-transparent text-slate-200 font-mono text-xs w-full focus:outline-none uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Accent Color (Links & Highlights)</label>
              <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
                <input
                  type="color"
                  value={draftTheme.accentColor}
                  onChange={(e) => setDraftTheme((prev) => ({ ...prev, accentColor: e.target.value }))}
                  className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={draftTheme.accentColor}
                  onChange={(e) => setDraftTheme((prev) => ({ ...prev, accentColor: e.target.value }))}
                  className="bg-transparent text-slate-200 font-mono text-xs w-full focus:outline-none uppercase"
                />
              </div>
            </div>
          </div>

          {/* Section Divider Style */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-slate-300 font-semibold">Section Divider Style</label>
              {isDashedDivider && (
                <span className="text-[10px] text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Dashed lines flagged by ATS
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'solid', label: 'Solid' },
                { id: 'thick-accent', label: 'Thick Accent' },
                { id: 'dashed', label: 'Dashed' },
                { id: 'double', label: 'Double' }
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDraftTheme((prev) => ({ ...prev, dividerStyle: d.id }))}
                  className={`p-2 rounded-lg border text-center font-medium text-[11px] transition-all ${
                    draftTheme.dividerStyle === d.id
                      ? 'border-indigo-500 bg-indigo-500/20 text-white'
                      : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Layout Alignment & Density */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Header Alignment</label>
              <div className="grid grid-cols-2 gap-2">
                {['left', 'center'].map((align) => (
                  <button
                    key={align}
                    type="button"
                    onClick={() => setDraftTheme((prev) => ({ ...prev, headerAlignment: align }))}
                    className={`p-2 rounded-lg border capitalize font-medium transition-all ${
                      draftTheme.headerAlignment === align
                        ? 'border-indigo-500 bg-indigo-500/20 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Document Density</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'compact', label: 'Compact' },
                  { id: 'normal', label: 'Balanced' },
                  { id: 'spacious', label: 'Spacious' }
                ].map((ds) => (
                  <button
                    key={ds.id}
                    type="button"
                    onClick={() => setDraftTheme((prev) => ({ ...prev, density: ds.id }))}
                    className={`p-1.5 rounded-lg border text-center font-medium text-[11px] transition-all ${
                      draftTheme.density === ds.id
                        ? 'border-indigo-500 bg-indigo-500/20 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {ds.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          {mode === 'edit' && onDeleteTheme ? (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Theme
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            {mode === 'edit' && (
              <button
                type="button"
                onClick={handleUpdateExisting}
                className="bg-slate-700 hover:bg-slate-600 text-white font-medium px-3.5 py-1.5 rounded-lg text-xs transition-colors"
              >
                Save Changes
              </button>
            )}

            <button
              type="button"
              onClick={handleCreateNew}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-1.5 rounded-lg text-xs shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{mode === 'create' ? 'Create & Apply New Theme' : 'Save as New Theme'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
