import React, { useEffect, useState } from 'react';

const messages = [
  "Reading the fine print...",
  "Consulting nutritional science...",
  "Checking for hidden additives...",
  "Calculating health trade-offs...",
  "Translating to human language..."
];

const LoadingView: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full max-w-2xl mx-auto">
      <div className="relative w-32 h-32 mb-10">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        {/* Spinning Ring */}
        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
        {/* Inner Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
             </div>
        </div>
      </div>
      
      <div className="text-center space-y-4 max-w-sm">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Analyzing Ingredients</h3>
        <div className="h-8 overflow-hidden relative">
             <p className="text-slate-500 font-medium animate-fade-in key={msgIndex}">
                {messages[msgIndex]}
             </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingView;