
import React, { useState } from 'react';
import { generateAIImage, translateText, generateStory } from '../services/geminiService';

const AITools: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'image' | 'translate' | 'story'>('image');
  const [lang, setLang] = useState('Spanish');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      if (mode === 'image') {
        const url = await generateAIImage(prompt);
        setResult(url);
      } else if (mode === 'translate') {
        const text = await translateText(prompt, lang);
        setResult(text);
      } else if (mode === 'story') {
        const text = await generateStory(prompt);
        setResult(text);
      }
    } catch (error) {
      console.error(error);
      alert("AI Generation failed.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Cognitive Engine</h2>
        <p className="text-slate-500 font-medium">Leverage advanced generative intelligence for tactical assistance.</p>
      </div>

      <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-slate-100 flex">
        {(['image', 'translate', 'story'] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setResult(null); }}
            className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              mode === m ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <i className={`fas ${m === 'image' ? 'fa-wand-magic-sparkles' : m === 'translate' ? 'fa-language' : 'fa-book-open-reader'}`}></i>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="mb-6 flex justify-between items-end">
           <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Input Protocol
          </label>
          {mode === 'translate' && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase">Target:</span>
              <select 
                className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-indigo-600 outline-none focus:ring-2 focus:ring-indigo-100"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Hindi</option>
                <option>Japanese</option>
                <option>Chinese</option>
              </select>
            </div>
          )}
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={
            mode === 'image' ? "Describe the imagery in detail (e.g. 'Cyberpunk safehouse at night')..." :
            mode === 'translate' ? "Paste text here to decode into target language..." :
            "Brief topic for scenario generation..."
          }
          className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 outline-none h-48 transition-all font-medium text-slate-700 resize-none"
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="w-full mt-6 bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-slate-800 disabled:bg-slate-200 transition-all shadow-2xl shadow-slate-900/10 active:scale-95 text-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <i className="fas fa-satellite fa-spin"></i> Processing...
            </span>
          ) : `Execute ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
        </button>
      </div>

      {result && (mode !== 'image' || result) && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-indigo-100 animate-in zoom-in-95 fade-in duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-slate-900 text-xl tracking-tight">Intelligence Output</h3>
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><i className="fas fa-copy"></i></button>
          </div>
          {mode === 'image' ? (
            <div className="rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200">
              <img src={result} alt="AI Generated" className="w-full h-auto object-cover" />
            </div>
          ) : (
            <div className="prose prose-slate max-w-none text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
          )}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <i className="fas fa-check-double text-emerald-500"></i> Quality Verified
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITools;
