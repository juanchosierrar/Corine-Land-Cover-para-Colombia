import React from 'react';
import { LandCoverItem } from '../types';
import { parseRGB } from '../constants';

interface Props {
  item: LandCoverItem;
  onClick: (item: LandCoverItem) => void;
}

export const LandCoverCard: React.FC<Props> = ({ item, onClick }) => {
  const bgColor = parseRGB(item.rgb);

  return (
    <div 
      onClick={() => onClick(item)}
      className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full hover:-translate-y-1 relative"
    >
      {/* Top Color Accent */}
      <div 
        className="h-2 w-full absolute top-0 left-0 right-0 z-10"
        style={{ backgroundColor: bgColor }}
      />
      
      <div className="p-6 flex-1 flex flex-col pt-8">
        <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md tracking-wider group-hover:bg-slate-200 transition-colors">
                {item.code}
            </span>
            <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: bgColor }}
                title={`RGB: ${item.rgb}`}
            />
        </div>
        
        <h3 className="font-bold text-slate-800 text-lg leading-snug mb-2 group-hover:text-emerald-600 transition-colors">
          {item.name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-medium text-slate-400 uppercase">Nivel {item.level}</span>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
        </div>
      </div>
    </div>
  );
};