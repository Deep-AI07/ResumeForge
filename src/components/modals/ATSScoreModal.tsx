import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { ATSAnalysis } from '../../types/resume';

interface ATSScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ATSAnalysis;
}

export const ATSScoreModal: React.FC<ATSScoreModalProps> = ({
  isOpen,
  onClose,
  analysis
}) => {
  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">ATS Compliance Diagnostic</h3>
              <p className="text-xs text-slate-400">Automated evaluation against Applicant Tracking Systems</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Ring / Bar */}
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">Overall Readiness</span>
            <span className="text-2xl font-black text-white">
              {analysis.score} <span className="text-sm font-normal text-slate-400">/ 100</span>
            </span>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
              analysis.score >= 80
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : analysis.score >= 60
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {analysis.score >= 80
              ? 'High ATS Compatibility'
              : analysis.score >= 60
              ? 'Moderate — Review Fixes'
              : 'Needs Optimization'}
          </span>
        </div>

        {/* Detailed Criteria Checklist */}
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {analysis.checks.map((chk, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border flex items-start gap-3 transition-colors ${
                chk.passed
                  ? 'bg-slate-800/40 border-slate-800'
                  : 'bg-amber-500/5 border-amber-500/30'
              }`}
            >
              {chk.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-0.5">
                  <span className={`font-semibold text-xs ${chk.passed ? 'text-slate-200' : 'text-amber-300'}`}>
                    {chk.title}
                  </span>
                  <span
                    className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                      chk.passed
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-amber-300 bg-amber-500/15'
                    }`}
                  >
                    {chk.score} / {chk.max} pts
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{chk.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">Tip: Enable Strict ATS mode for 100% monochrome layout.</span>
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-1.5 rounded-lg transition-colors"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
