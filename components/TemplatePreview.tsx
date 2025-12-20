import React from 'react';
import { X, Copy, Play, Clock, Layout } from 'lucide-react';
import { Template } from '../types';

interface Props {
  template: Template;
  onClose: () => void;
  onClone: () => void;
  onRun: () => void;
}

export const TemplatePreview: React.FC<Props> = ({ template, onClose, onClone, onRun }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-card rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-800">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-white/5">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest">Template Preview</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto">
           <div className="flex items-center gap-3 mb-6">
              <h1 className="text-4xl font-serif font-bold text-white leading-tight">{template.title}</h1>
              {template.isSystem && <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest border border-blue-500/30">Official</span>}
           </div>
           
           <p className="text-lg text-gray-400 mb-10 leading-relaxed font-light">
             {template.description}
           </p>

           <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                    <Clock size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Duration</span>
                </div>
                <span className="font-semibold text-white text-lg">{template.duration}</span>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                    <Layout size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Format</span>
                </div>
                <span className="font-semibold text-white text-lg">{template.type.replace('_', ' ').toUpperCase()}</span>
              </div>
           </div>

           <div className="border-t border-gray-800 pt-8">
              <h3 className="font-bold text-white mb-4 uppercase tracking-widest text-sm text-blue-400">Included in this session</h3>
              <ul className="space-y-4 text-gray-400">
                 <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    Structured step-by-step guidance
                 </li>
                 <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    Interactive forms and inputs
                 </li>
                 <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    Clinical report generated on completion
                 </li>
              </ul>
           </div>
        </div>

        <div className="p-8 border-t border-gray-800 bg-white/5 flex gap-4 justify-end">
           <button onClick={onClone} className="px-6 py-3 bg-transparent border border-gray-700 text-gray-300 font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-widest">
              Clone Template
           </button>
           <button onClick={onRun} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 text-sm uppercase tracking-widest">
              <Play size={16} fill="currentColor" /> Use Now
           </button>
        </div>
      </div>
    </div>
  );
};