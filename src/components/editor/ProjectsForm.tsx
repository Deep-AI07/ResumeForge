import React, { useState } from 'react';
import { FolderGit2, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { Project } from '../../types/resume';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (updated: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const addProject = () => {
    const newProj: Project = {
      id: 'proj-' + Date.now(),
      title: 'Project Name',
      techStack: ['React', 'TypeScript', 'Node.js'],
      liveUrl: 'https://demo.app',
      repoUrl: 'https://github.com/...',
      highlights: ['Engineered scalable architecture with high throughput.']
    };
    onChange([newProj, ...projects]);
  };

  const removeProj = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const updateProj = (id: string, field: keyof Project, value: any) => {
    onChange(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-sm text-slate-200 hover:bg-slate-700/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-indigo-400" />
          Projects ({projects.length})
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-slate-700/80 space-y-4 text-xs">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-700/60 space-y-2.5">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => updateProj(proj.id, 'title', e.target.value)}
                  placeholder="Project Title"
                  className="font-bold text-slate-100 bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={() => removeProj(proj.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  title="Remove project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <input
                type="text"
                value={proj.techStack.join(', ')}
                onChange={(e) =>
                  updateProj(
                    proj.id,
                    'techStack',
                    e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                placeholder="Technologies (comma separated)"
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="url"
                  value={proj.liveUrl || ''}
                  onChange={(e) => updateProj(proj.id, 'liveUrl', e.target.value)}
                  placeholder="Live URL"
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="url"
                  value={proj.repoUrl || ''}
                  onChange={(e) => updateProj(proj.id, 'repoUrl', e.target.value)}
                  placeholder="Repository URL"
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-semibold text-slate-400 block">Bullet Highlights</label>
                {proj.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => {
                        const newH = [...proj.highlights];
                        newH[idx] = e.target.value;
                        updateProj(proj.id, 'highlights', newH);
                      }}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => {
                        updateProj(
                          proj.id,
                          'highlights',
                          proj.highlights.filter((_, i) => i !== idx)
                        );
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      title="Remove highlight"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => updateProj(proj.id, 'highlights', [...proj.highlights, 'Achieved feature milestone.'])}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium pt-1 block transition-colors"
                >
                  + Add Bullet
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addProject}
            className="w-full py-2 border border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-indigo-300 hover:border-indigo-500/50 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project
          </button>
        </div>
      )}
    </div>
  );
};
