import React, { useCallback, useState } from 'react';

interface Props {
  onAnalyze: (text?: string, imageBase64?: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<Props> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState<'image' | 'text'>('image');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
        alert("Please upload an image file");
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      onAnalyze(undefined, base64Data);
    };
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [onAnalyze]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleTextSubmit = () => {
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  const handleMock = (type: 'soda' | 'chips' | 'candy') => {
     const data = {
         soda: "Ingredients: Carbonated Water, High Fructose Corn Syrup, Caramel Color, Phosphoric Acid, Natural Flavors, Caffeine.",
         chips: "Ingredients: Potatoes, Vegetable Oil (Sunflower, Corn, and/or Canola Oil), Maltodextrin, Salt, Dextrose, Monosodium Glutamate, Onion Powder.",
         candy: "Ingredients: Sugar, Corn Syrup, Hydrogenated Palm Kernel Oil; Less Than 2% Of: Citric Acid, Tapioca Dextrin, Modified Corn Starch, Natural And Artificial Flavors, Red 40 Lake."
     };
     onAnalyze(data[type]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-10 animate-fade-in-up">
      {/* Hero Text */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Decode your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">food decisions.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-lg mx-auto leading-relaxed">
          Upload a label or paste ingredients. Our AI translates regulation-speak into clear health insights.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 opacity-80" />
        
        {/* Tab Switcher */}
        <div className="flex p-2 m-2 bg-slate-50 rounded-2xl">
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'image' 
                ? 'bg-white text-slate-900 shadow-md shadow-slate-200 ring-1 ring-black/5' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Scan Label
            </span>
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'text' 
                ? 'bg-white text-slate-900 shadow-md shadow-slate-200 ring-1 ring-black/5' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
             <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                Paste Text
            </span>
          </button>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === 'image' ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative group border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all duration-300 ${
                dragActive 
                ? 'border-emerald-500 bg-emerald-50/50 scale-[0.99]' 
                : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50'
              }`}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleChange}
                accept="image/*"
              />
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg shadow-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">Drop your food label</h3>
              <p className="text-slate-400 text-center max-w-xs">Drag and drop or tap to upload a photo of the ingredients list.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste ingredients here... (e.g., Water, Sugar, Citric Acid...)"
                className="w-full h-48 p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none text-slate-700 leading-relaxed outline-none"
              />
              <button
                onClick={handleTextSubmit}
                disabled={!text.trim() || isLoading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? 'Thinking...' : 'Analyze Now'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Start Chips */}
      <div className="flex flex-col items-center space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or try an example</span>
          <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => handleMock('soda')} className="px-5 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-semibold hover:border-emerald-400 hover:text-emerald-600 hover:shadow-md transition-all">
                  🥤 Soda Can
              </button>
              <button onClick={() => handleMock('chips')} className="px-5 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-semibold hover:border-amber-400 hover:text-amber-600 hover:shadow-md transition-all">
                  🍟 Potato Chips
              </button>
              <button onClick={() => handleMock('candy')} className="px-5 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-semibold hover:border-pink-400 hover:text-pink-600 hover:shadow-md transition-all">
                  🍬 Candy Bar
              </button>
          </div>
      </div>
    </div>
  );
};

export default InputSection;