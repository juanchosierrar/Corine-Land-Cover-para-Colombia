import React, { useState, useEffect } from 'react';
import { LandCoverItem } from '../types';
import { parseRGB } from '../constants';
import { generateDescription } from '../services/geminiService';
import { ImageGenerator } from './ImageGenerator';

interface Props {
  item: LandCoverItem;
  onClose: () => void;
  breadcrumbs: LandCoverItem[];
}

export const DetailModal: React.FC<Props> = ({ item, onClose, breadcrumbs }) => {
  const [description, setDescription] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [loadingDesc, setLoadingDesc] = useState(false);

  useEffect(() => {
    setDescription(null);
    setSources([]);
    
    const fetchDesc = async () => {
      setLoadingDesc(true);
      const res = await generateDescription(item.name, item.code);
      setDescription(res.text);
      setSources(res.sources);
      setLoadingDesc(false);
    };
    fetchDesc();
  }, [item]);

  const accentColor = parseRGB(item.rgb);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 ring-1 ring-black/5">
        
        {/* Header */}
        <div className="relative p-8 pb-6 border-b border-slate-100 bg-slate-50/50">
           <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all shadow-sm border border-slate-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="flex flex-col gap-4">
              <nav className="flex text-xs font-medium text-slate-500 space-x-2">
                {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.code}>
                    <span className={idx === breadcrumbs.length - 1 ? 'text-slate-900' : 'hover:text-emerald-600 transition-colors'}>
                    {crumb.name}
                    </span>
                    {idx < breadcrumbs.length - 1 && <span className="text-slate-300">/</span>}
                </React.Fragment>
                ))}
            </nav>
            
            <div className="flex items-start gap-5">
                <div 
                    className="w-16 h-16 rounded-2xl shadow-inner flex-shrink-0 mt-1" 
                    style={{ backgroundColor: accentColor }}
                />
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="bg-slate-900 text-white text-xs font-mono px-2 py-0.5 rounded uppercase tracking-wider">
                            Código {item.code}
                        </span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nivel {item.level}</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">{item.name}</h2>
                </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col: Description */}
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Ficha Técnica (IA)
                    </h3>
                    
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                        {loadingDesc ? (
                            <div className="animate-pulse space-y-3">
                                <div className="h-2 bg-slate-100 rounded w-1/3 mb-4"></div>
                                <div className="h-2 bg-slate-100 rounded w-full"></div>
                                <div className="h-2 bg-slate-100 rounded w-full"></div>
                                <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                                <div className="h-2 bg-slate-100 rounded w-4/6"></div>
                            </div>
                        ) : (
                            <div className="prose prose-sm prose-slate max-w-none">
                                <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                                    {description}
                                </div>
                                {sources.length > 0 && (
                                    <div className="mt-6 pt-4 border-t border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Fuentes verificadas</p>
                                        <div className="flex flex-wrap gap-2">
                                            {sources.map((src, i) => (
                                                <a 
                                                    key={i} 
                                                    href={src} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    className="text-xs bg-slate-50 text-emerald-600 px-2 py-1 rounded border border-slate-100 hover:bg-emerald-50 transition-colors truncate max-w-[200px]"
                                                >
                                                    {new URL(src).hostname}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* Decorative gradient blob */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity"></div>
                    </div>
                </div>

                <ImageGenerator landCoverName={item.name} code={item.code} />
            </div>

            {/* Right Col: Metadata or Actions */}
            <div className="space-y-6">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Detalles Clasificación</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500">Código</span>
                            <span className="font-mono font-medium text-slate-800">{item.code}</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500">Nivel Jerárquico</span>
                            <span className="font-medium text-slate-800">{item.level}</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500">Color RGB</span>
                            <span className="font-mono font-medium text-slate-800 text-xs">{item.rgb}</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                    <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2">Tip de Campo</h4>
                    <p className="text-xs text-indigo-700 leading-relaxed">
                        Al verificar esta cobertura, utiliza la imagen generada por IA como referencia base para la estructura de la vegetación, pero confirma siempre con observación directa.
                    </p>
                </div>
            </div>

          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-5 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold text-sm hover:bg-slate-100 hover:border-slate-300 transition-all shadow-sm"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};