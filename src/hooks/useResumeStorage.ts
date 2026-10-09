import { useState, useEffect, useMemo } from 'react';
import { ResumeData, Theme } from '../types/resume';
import { DEFAULT_RESUME_DATA, PRESET_THEMES } from '../data/initialResume';

const STORAGE_KEY_DATA = 'resumeforge_data_v2';
const STORAGE_KEY_THEME = 'resumeforge_theme_id';
const STORAGE_KEY_CUSTOM_THEMES = 'resumeforge_custom_themes_list_v2';
const STORAGE_KEY_LEGACY_CUSTOM_THEME = 'resumeforge_custom_theme';

export function useResumeStorage() {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      return saved ? JSON.parse(saved) : DEFAULT_RESUME_DATA;
    } catch {
      return DEFAULT_RESUME_DATA;
    }
  });

  const [activeThemeId, setActiveThemeId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_THEME) || 'modern';
  });

  const [customThemes, setCustomThemes] = useState<Theme[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_THEMES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      // Migrate legacy single custom theme if present
      const legacy = localStorage.getItem(STORAGE_KEY_LEGACY_CUSTOM_THEME);
      if (legacy) {
        const parsedLegacy = JSON.parse(legacy);
        return [{ ...parsedLegacy, id: 'custom_1', name: parsedLegacy.name || 'Custom Theme 1' }];
      }
      return [];
    } catch {
      return [];
    }
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Debounced auto-save to browser local storage
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(resumeData));
        localStorage.setItem(STORAGE_KEY_THEME, activeThemeId);
        localStorage.setItem(STORAGE_KEY_CUSTOM_THEMES, JSON.stringify(customThemes));
      } catch (err) {
        console.error('Storage error:', err);
      }
      setIsSaving(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [resumeData, activeThemeId, customThemes]);

  // Derive active theme object from presets or custom list
  const currentTheme = useMemo<Theme>(() => {
    const preset = PRESET_THEMES.find((t) => t.id === activeThemeId);
    if (preset) return preset;

    const custom = customThemes.find((t) => t.id === activeThemeId);
    if (custom) return custom;

    if (customThemes.length > 0) return customThemes[0];
    return PRESET_THEMES[1];
  }, [activeThemeId, customThemes]);

  const addCustomTheme = (newTheme: Theme) => {
    setCustomThemes((prev) => [...prev, newTheme]);
    setActiveThemeId(newTheme.id);
  };

  const updateCustomTheme = (updatedTheme: Theme) => {
    setCustomThemes((prev) =>
      prev.map((t) => (t.id === updatedTheme.id ? updatedTheme : t))
    );
  };

  const deleteCustomTheme = (themeId: string) => {
    setCustomThemes((prev) => prev.filter((t) => t.id !== themeId));
    if (activeThemeId === themeId) {
      setActiveThemeId('modern');
    }
  };

  const resetToDefault = () => {
    setResumeData(DEFAULT_RESUME_DATA);
  };

  return {
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
  };
}
