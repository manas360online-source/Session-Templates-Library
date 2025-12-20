import React from 'react';
import { X, Calendar, User, FileText, CheckCircle } from 'lucide-react';
import { SessionData, Template } from '../types';

interface Props {
  session: SessionData;
  template?: Template;
  onClose: () => void;
}

export const SessionReportModal: React.FC<Props> = ({ session, template, onClose }) => {
  const renderValue = (value: any): React.ReactNode => {
    if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) return value.join(', ');
        return (
            <ul className="list-disc list-inside ml-2">
                {Object.entries(value).map(([k, v]) => (
                    <li key={k}><span className="font-medium capitalize text-blue-400">{k}:</span> {renderValue(v)}</li>
                ))}
            </ul>
        );
    }
    return String(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-card rounded-[32px] w-full max-w-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto border border-gray-800">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div>
              <h2 className="text-2xl font-bold text-white">Session Report</h2>
              <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">{template?.title || 'Unknown Template'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Calendar size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Date</span>
                </div>
                <div className="font-semibold text-white">
                    {new Date(session.date).toLocaleDateString()} {new Date(session.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <User size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Patient</span>
                </div>
                <div className="font-semibold text-white">{session.patientName}</div>
            </div>
        </div>

        <div className="mb-8">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-lg">
                <FileText size={20} className="text-blue-400"/> Session Summary
            </h3>
            <div className="bg-white/5 rounded-2xl border border-white/5 p-6">
                <div className="space-y-6">
                    {Object.entries(session.data).map(([key, value]) => (
                        <div key={key} className="border-b border-white/5 last:border-0 pb-4 last:pb-0">
                            <span className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <div className="text-gray-300 text-sm leading-relaxed">
                                {renderValue(value)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex justify-end pt-4">
             <button onClick={onClose} className="px-8 py-3 bg-[#1F2937] hover:bg-[#374151] text-white rounded-xl font-bold transition-all border border-gray-700">
                Close Report
             </button>
        </div>
      </div>
    </div>
  );
};