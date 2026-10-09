import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { SkillCategory } from '../../types/resume';

interface SkillsFormProps {
  skills: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const addCategory = () => {
    const newCat: SkillCategory = {
      id: 'sk-' + Date.now(),
      category: 'Tools & Utilities',
      items: ['Docker', 'Git']
    };
    onChange([...skills, newCat]);
  };

  const removeCategory = (id: string) => {
    onChange(skills.filter((c) => c.id !== id));
  };

  const updateCategoryName = (id: string, newName: string) => {
    onChange(skills.map((c) => (c.id === id ? { ...c, category: newName } : c)));
  };

  const addSkillItem = (catId: string, skill: string) => {
    if (!skill.trim()) return;
    onChange(
      skills.map((c) => {
        if (c.id === catId && !c.items.includes(skill.trim())) {
          return { ...c, items: [...c.items, skill.trim()] };
        }
        return c;
      })
    );
  };

  const removeSkillItem = (catId: string, itemToRemove: string) => {
    onChange(
      skills.map((c) => {
        if (c.id === catId) {
          return { ...c, items: c.items.filter((i) => i !== itemToRemove) };
        }
        return c;
      })
    );
  };

  const totalSkillsCount = skills.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-sm text-slate-200 hover:bg-slate-700/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          Technical Skills ({totalSkillsCount})
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-slate-700/80 space-y-4 text-xs">
          {skills.map((cat) => (
            <div key={cat.id} className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={cat.category}
                  onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                  className="bg-transparent font-semibold text-slate-200 focus:outline-none border-b border-transparent focus:border-indigo-500 w-full"
                />
                <button
                  onClick={() => removeCategory(cat.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded text-[11px]"
                  >
                    {item}
                    <button
                      onClick={() => removeSkillItem(cat.id, item)}
                      className="text-slate-400 hover:text-rose-400 ml-0.5"
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Skill to category input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add skill (e.g. Docker, Redis) & hit Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      addSkillItem(cat.id, e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          ))}

          <button
            onClick={addCategory}
            className="w-full py-2 border border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-indigo-300 hover:border-indigo-500/50 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Skill Category
          </button>
        </div>
      )}
    </div>
  );
};
