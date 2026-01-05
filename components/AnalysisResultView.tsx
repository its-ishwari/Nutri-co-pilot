import React from 'react';
import { AnalysisResult } from '../types';
import ScoreGauge from './ScoreGauge';

interface Props {
  result: AnalysisResult;
  onReset: () => void;
}

const AnalysisResultView: React.FC<Props> = ({ result, onReset }) => {
  const getVerdictStyle = (v: string) => {
    switch (v) {
      case 'Excellent': return 'bg-emerald-500 text-white shadow-emerald-500/30';
      case 'Good': return 'bg-teal-500 text-white shadow-teal-500/30';
      case 'Fair': return 'bg-amber-400 text-white shadow-amber-400/30';
      case 'Poor': return 'bg-orange-500 text-white shadow-orange-500/30';
      case 'Avoid': return 'bg-red-500 text-white shadow-red-500/30';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getProcessingColor = (level: string) => {
    if (level === 'Ultra-Processed') return 'text-red-600 bg-red-100/50 border-red-200';
    if (level === 'Processed') return 'text-orange-600 bg-orange-100/50 border-orange-200';
    return 'text-emerald-600 bg-emerald-100/50 border-emerald-200';
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-24">
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* 1. Main Score Card (Left Column) */}
        <div className="md:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-white/60 relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-blue-500" />
                
                <div className="mb-2">
                     <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider border border-slate-200">
                        Inferred Intent: {result.intent}
                     </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-800 leading-tight my-4">
                    {result.summary}
                </h2>

                <div className="transform scale-110 my-4">
                    <ScoreGauge score={result.healthScore} />
                </div>

                <div className={`px-6 py-2 rounded-xl text-lg font-bold shadow-lg ${getVerdictStyle(result.verdict)}`}>
                    {result.verdict}
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-white/60">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Processing Level</h3>
                <div className={`p-4 rounded-2xl border text-center ${getProcessingColor(result.processingLevel)}`}>
                    <div className="text-lg font-bold">{result.processingLevel}</div>
                    <div className="text-xs opacity-80 mt-1 font-medium">
                        {result.processingLevel === 'Ultra-Processed' ? 'Industrial Formulation' : 'Natural / Whole'}
                    </div>
                </div>
            </div>
        </div>

        {/* 2. Insights & Reasoning (Right Column) */}
        <div className="md:col-span-7 flex flex-col gap-6">
            
            {/* Key Insights Panel */}
            <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-white/60">
                <h3 className="flex items-center text-slate-900 font-bold text-lg mb-6">
                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </span>
                    Core Analysis
                </h3>
                <ul className="space-y-4">
                    {result.keyInsights.map((insight, idx) => (
                    <li key={idx} className="flex items-start group">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 mr-4 transition-transform group-hover:scale-150
                        ${insight.type === 'positive' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : insight.type === 'negative' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-slate-400'}`} 
                        />
                        <span className="text-slate-600 leading-relaxed font-medium">{insight.text}</span>
                    </li>
                    ))}
                </ul>
            </div>

            {/* Trade-off Box */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 border border-blue-100 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <svg className="w-32 h-32 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <h3 className="text-blue-900 font-bold mb-3 flex items-center z-10 relative shrink-0">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
                    The Trade-Off
                </h3>
                <div className="overflow-y-auto max-h-60 custom-scrollbar z-10 relative pr-2">
                    <p className="text-blue-800 text-sm leading-relaxed font-medium">
                        {result.tradeOffs}
                    </p>
                </div>
            </div>

            {/* Uncertainty Box */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col">
                <h3 className="text-slate-700 font-bold mb-3 flex items-center shrink-0">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Blind Spots
                </h3>
                 <div className="overflow-y-auto max-h-40 custom-scrollbar pr-2">
                    <p className="text-slate-500 text-sm leading-relaxed italic">
                        "{result.uncertainty}"
                    </p>
                 </div>
            </div>
        </div>
      </div>

      {/* Floating Reset Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <button 
          onClick={onReset}
          className="bg-slate-900 text-white shadow-2xl shadow-slate-900/40 rounded-full px-8 py-4 font-bold flex items-center space-x-2 hover:scale-105 hover:bg-slate-800 transition-all active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          <span>Scan Another</span>
        </button>
      </div>

    </div>
  );
};

export default AnalysisResultView;