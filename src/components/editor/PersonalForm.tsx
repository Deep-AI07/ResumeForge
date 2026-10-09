import React, { useState } from 'react';
import { User, ChevronDown, ChevronUp } from 'lucide-react';
import { PersonalInfo } from '../../types/resume';

interface PersonalFormProps {
  personal: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

export const PersonalForm: React.FC<PersonalFormProps> = ({ personal, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const update = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...personal, [field]: value });
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-sm text-slate-200 hover:bg-slate-700/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-400" />
          Personal Details
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-slate-700/80 space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
              <input
                type="text"
                value={personal.fullName || ''}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="John Doe"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Job Headline / Title</label>
              <input
                type="text"
                value={personal.headline || ''}
                onChange={(e) => update('headline', e.target.value)}
                placeholder="Full Stack Software Engineer"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
              <input
                type="email"
                value={personal.email || ''}
                onChange={(e) => update('email', e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Phone</label>
              <input
                type="text"
                value={personal.phone || ''}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+1 555-0199"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Location</label>
              <input
                type="text"
                value={personal.location || ''}
                onChange={(e) => update('location', e.target.value)}
                placeholder="Austin, TX"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">LinkedIn URL</label>
              <input
                type="url"
                value={personal.linkedinUrl || ''}
                onChange={(e) => update('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">GitHub URL</label>
              <input
                type="url"
                value={personal.githubUrl || ''}
                onChange={(e) => update('githubUrl', e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Portfolio URL</label>
              <input
                type="url"
                value={personal.portfolioUrl || ''}
                onChange={(e) => update('portfolioUrl', e.target.value)}
                placeholder="https://mywebsite.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Executive Summary</label>
            <textarea
              rows={3}
              value={personal.summary || ''}
              onChange={(e) => update('summary', e.target.value)}
              placeholder="Concise overview highlighting core expertise, tech stack, and achievements..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 text-xs"
            />
          </div>
        </div>
      )}
    </div>
  );
};
