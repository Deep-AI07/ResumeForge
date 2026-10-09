import React, { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { Experience } from '../../types/resume';

interface ExperienceFormProps {
  experience: Experience[];
  onChange: (updated: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const addExperience = () => {
    const newExp: Experience = {
      id: 'exp-' + Date.now(),
      company: 'Company Name',
      role: 'Software Developer',
      location: 'City, State',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      highlights: ['Spearheaded key feature releases driving 25% efficiency.']
    };
    onChange([newExp, ...experience]);
  };

  const removeExp = (id: string) => {
    onChange(experience.filter((e) => e.id !== id));
  };

  const updateExp = (id: string, field: keyof Experience, value: any) => {
    onChange(experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addHighlight = (id: string) => {
    onChange(
      experience.map((e) =>
        e.id === id ? { ...e, highlights: [...e.highlights, 'Achieved measurable metric results.'] } : e
      )
    );
  };

  const updateHighlight = (id: string, idx: number, val: string) => {
    onChange(
      experience.map((e) => {
        if (e.id === id) {
          const nextH = [...e.highlights];
          nextH[idx] = val;
          return { ...e, highlights: nextH };
        }
        return e;
      })
    );
  };

  const removeHighlight = (id: string, idx: number) => {
    onChange(
      experience.map((e) => {
        if (e.id === id) {
          return { ...e, highlights: e.highlights.filter((_, i) => i !== idx) };
        }
        return e;
      })
    );
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-sm text-slate-200 hover:bg-slate-700/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          Work Experience ({experience.length})
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-slate-700/80 space-y-4 text-xs">
          {experience.map((exp) => (
            <div key={exp.id} className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-700/60 space-y-3">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => updateExp(exp.id, 'role', e.target.value)}
                  placeholder="Job Title"
                  className="font-bold text-slate-100 bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={() => removeExp(exp.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  title="Remove position"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExp(exp.id, 'company', e.target.value)}
                  placeholder="Company"
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExp(exp.id, 'location', e.target.value)}
                  placeholder="Location (e.g. Remote / NYC)"
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateExp(exp.id, 'startDate', e.target.value)}
                  placeholder="Start (e.g. 2022-01)"
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateExp(exp.id, 'endDate', e.target.value)}
                  placeholder="End (e.g. Present)"
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Bullet highlights */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-semibold text-slate-400 block">Accomplishment Bullets</label>
                {exp.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => updateHighlight(exp.id, idx, e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => removeHighlight(exp.id, idx)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      title="Remove bullet"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addHighlight(exp.id)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium pt-1 block transition-colors"
                >
                  + Add Bullet
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="w-full py-2 border border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-indigo-300 hover:border-indigo-500/50 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Experience Position
          </button>
        </div>
      )}
    </div>
  );
};
