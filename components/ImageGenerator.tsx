import React, { useState } from 'react';
import { ImageResolution } from '../types';
import { generateLandCoverImage } from '../services/geminiService';

interface Props {
  landCoverName: string;
  code: string;
}

export const ImageGenerator: React.FC<Props> = ({ landCoverName, code }) => {
  const [resolution, setResolution] = useState<ImageResolution>(ImageResolution.RES_1K);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setPermissionError(false);
    try {
      const url = await generateLandCoverImage(landCoverName, code, resolution);
      if (url) {
        setImageUrl(url);
      } else {
        setError("No se pudo generar la imagen. Intenta nuevamente.");
      }
    } catch (e: any) {
        const errorMessage = e.message || JSON.stringify(e);
        console.error("Generation Error", errorMessage);
        
        // Handle specific error codes for permission issues (403) or missing key
       if (errorMessage.includes("Requested entity was not found") || 
           errorMessage.includes("403") || 
           errorMessage.includes("PERMISSION_DENIED")) {
            
            setError("Se requiere acceso al modelo Gemini 3 Pro (Proyecto Pago).");
            setPermissionError(true);
            
            // Try to open automatically if possible, but UI button is safer
            // const aiStudio = (window as any).aistudio;
            // if(aiStudio && typeof aiStudio.openSelectKey === 'function') {
            //     await aiStudio.openSelectKey();
            // }
       } else {
            setError("Error generando la imagen. Verifica tu conexión.");
       }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeKey = async () => {
      const aiStudio = (window as any).aistudio;
      if(aiStudio && typeof aiStudio.openSelectKey === 'function') {
            try {
                await aiStudio.openSelectKey();
                // Reset error state to let them try again immediately
                setPermissionError(false);
                setError(null);
            } catch (err) {
                console.error("Error opening key selector:", err);
            }
      }
  };

  return (
    <div className="mt-8 pt-8 border-t border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </span>
          Referencia de Campo (Gemini 3 Pro)
        </h4>
        {!imageUrl && !isLoading && (
            <select 
                value={resolution} 
                onChange={(e) => setResolution(e.target.value as ImageResolution)}
                className="bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-1.5 px-3"
            >
                <option value={ImageResolution.RES_1K}>1K</option>
                <option value={ImageResolution.RES_2K}>2K</option>
                <option value={ImageResolution.RES_4K}>4K</option>
            </select>
        )}
      </div>
      
      {!imageUrl ? (
        <div className="bg-slate-50/50 rounded-2xl p-6 border border-dashed border-slate-300 text-center">
          <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
            Genera una vista simulada de <span className="font-semibold text-slate-800">Ground Truth</span> para validación en terreno. 
            Ayuda a identificar patrones visuales clave de la cobertura <span className="font-mono text-xs bg-slate-200 px-1 rounded">{code}</span>.
          </p>
          
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className={`group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all transform active:scale-95 ${
                isLoading 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-300 hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando Imagen...
                </>
              ) : (
                  <>
                    Generar Vista de Campo
                    <svg className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
              )}
            </button>

            {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-xs font-medium border border-red-100 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-top-2">
                    <p>{error}</p>
                    {permissionError && (
                        <button 
                            onClick={handleChangeKey}
                            className="text-red-700 underline hover:text-red-900"
                        >
                            Cambiar/Seleccionar API Key
                        </button>
                    )}
                </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-900/5 group">
             <img src={imageUrl} alt="Generated Land Cover Ground Truth" className="w-full h-auto object-cover max-h-[500px]" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                <span className="text-white text-xs font-medium px-2 py-1 bg-black/30 backdrop-blur rounded-md">
                    Resolución {resolution}
                </span>
                <a 
                    href={imageUrl} 
                    download={`corine-ground-truth-${code}.png`}
                    className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-medium text-xs hover:bg-slate-50 transition-colors shadow-lg"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Descargar
                </a>
             </div>
          </div>
          <div className="flex justify-center">
            <button 
                onClick={() => setImageUrl(null)}
                className="text-xs text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Generar nueva variante
            </button>
          </div>
        </div>
      )}
    </div>
  );
};