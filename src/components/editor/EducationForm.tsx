import React, { useState } from 'react';
import { GraduationCap, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { Education } from '../../types/resume';

interface EducationFormProps {
  education: Education[];
  onChange: (updated: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const addEdu = () => {
    const newEdu: Education = {
      id: 'edu-' + Date.now(),
      institution: 'University Name',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startYear: '2019',
      endYear: '2023',
      score: '3.8 GPA'
    };
    onChange([...education, newEdu]);
  };

  const removeEdu = (id: string) => {
    onChange(education.filter((e) => e.id !== id));
  };

  const updateEdu = (id: string, field: keyof Education, value: any) => {
    onChange(education.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-sm text-slate-200 hover:bg-slate-700/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          Education ({education.length})
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-slate-700/80 space-y-4 text-xs">
          {education.map((edu) => (
            <div key={edu.id} className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60 space-y-2">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEdu(edu.id, 'institution', e.target.value)}
                  placeholder="Institution"
                  className="font-bold text-slate-100 bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={() => removeEdu(edu.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  title="Remove education"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEdu(edu.id, 'degree', e.target.value)}
                  placeholder="Degree"
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  value={edu.fieldOfStudy}
                  onChange={(e) => updateEdu(edu.id, 'fieldOfStudy', e.target.value)}
                  placeholder="Field of Study"
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={edu.startYear}
                  onChange={(e) => updateEdu(edu.id, 'startYear', e.target.value)}
                  placeholder="Start Year"
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  value={edu.endYear}
                  onChange={(e) => updateEdu(edu.id, 'endYear', e.target.value)}
                  placeholder="End Year"
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={edu.score || ''}
                  onChange={(e) => updateEdu(edu.id, 'score', e.target.value)}
                  placeholder="Score / GPA (e.g. 3.85 / 4.00 GPA)"
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addEdu}
            className="w-full py-2 border border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-indigo-300 hover:border-indigo-500/50 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Education
          </button>
        </div>
      )}
    </div>
  );
};
