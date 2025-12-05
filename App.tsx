import React, { useState, useMemo } from 'react';
import { LAND_COVER_DATA } from './constants';
import { LandCoverItem } from './types';
import { LandCoverCard } from './components/LandCoverCard';
import { DetailModal } from './components/DetailModal';

function App() {
  const [currentLevel1, setCurrentLevel1] = useState<LandCoverItem | null>(null);
  const [currentLevel2, setCurrentLevel2] = useState<LandCoverItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<LandCoverItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation handlers
  const handleLevel1Click = (item: LandCoverItem) => {
    setCurrentLevel1(item);
    setCurrentLevel2(null);
    setSelectedItem(null);
  };

  const handleLevel2Click = (item: LandCoverItem) => {
    setCurrentLevel2(item);
    setSelectedItem(null);
  };

  const handleLevel3Click = (item: LandCoverItem) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    if (currentLevel2) {
      setCurrentLevel2(null);
    } else if (currentLevel1) {
      setCurrentLevel1(null);
    }
  };

  // Helper to flatten items for search
  const flattenItems = (items: LandCoverItem[]): LandCoverItem[] => {
    let result: LandCoverItem[] = [];
    items.forEach(item => {
      result.push(item);
      if (item.children) {
        result = result.concat(flattenItems(item.children));
      }
    });
    return result;
  };

  // Determine what to display based on state
  const displayedItems = useMemo(() => {
    if (searchQuery.length > 2) {
      const allItems = flattenItems(LAND_COVER_DATA);
      return allItems.filter(
        item => 
          (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.code.includes(searchQuery)) && 
          item.level === 3 // Prefer showing level 3 items in search, or remove this check to show all
      );
    }
    
    if (currentLevel2) {
      return currentLevel2.children || [];
    }
    if (currentLevel1) {
      return currentLevel1.children || [];
    }
    return LAND_COVER_DATA;
  }, [currentLevel1, currentLevel2, searchQuery]);

  const breadcrumbs = useMemo(() => {
    const crumbs = [];
    if (currentLevel1) crumbs.push(currentLevel1);
    if (currentLevel2) crumbs.push(currentLevel2);
    if (selectedItem) crumbs.push(selectedItem);
    return crumbs;
  }, [currentLevel1, currentLevel2, selectedItem]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Modern Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shadow-xl z-20">
        <div className="p-8 pb-4">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Corine<span className="text-emerald-400">Map</span>
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-medium uppercase tracking-widest">Catálogo Colombia</p>
        </div>
        
        <div className="px-6 py-4">
            <div className="relative group">
                <input 
                    type="text" 
                    placeholder="Buscar código o nombre..." 
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-slate-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="w-5 h-5 text-slate-500 absolute left-3 top-3.5 group-focus-within:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-6 custom-scrollbar space-y-1">
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4 px-4 mt-2">Coberturas Principales</h3>
            {LAND_COVER_DATA.map(item => (
              <button
                key={item.code}
                onClick={() => handleLevel1Click(item)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 flex items-center gap-3 group relative overflow-hidden ${
                  currentLevel1?.code === item.code 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
                    : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span 
                  className={`w-2 h-2 rounded-full shadow-sm ring-2 ${currentLevel1?.code === item.code ? 'ring-white/30' : 'ring-transparent'}`}
                  style={{ backgroundColor: `rgb(${item.rgb.split('-').join(',')})` }} 
                />
                <span className="truncate font-medium flex-1">{item.name}</span>
                <span className="text-xs opacity-50 font-mono">{item.code}</span>
              </button>
            ))}
        </nav>
        
        <div className="p-6 border-t border-slate-800">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
               AI
             </div>
             <div>
               <p className="text-xs font-semibold text-white">Gemini 3 Pro</p>
               <p className="text-[10px] text-slate-500">Integración Activa</p>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between shadow-md z-20">
          <div className="flex items-center gap-2 font-bold">
            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            CorineMap
          </div>
           <input 
            type="text" 
            placeholder="Buscar..." 
            className="w-32 px-3 py-1.5 bg-slate-800 border-none rounded-lg text-xs text-white focus:ring-1 focus:ring-emerald-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Content Header */}
        <div className="px-8 pt-8 pb-2">
          <div className="flex items-start justify-between">
             <div>
                {/* Breadcrumb nav */}
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2 font-medium">
                    <span onClick={() => {setCurrentLevel1(null); setCurrentLevel2(null);}} className="cursor-pointer hover:text-emerald-600 transition-colors">Inicio</span>
                    {currentLevel1 && (
                        <>
                        <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span onClick={() => setCurrentLevel2(null)} className={`cursor-pointer hover:text-emerald-600 transition-colors ${!currentLevel2 ? 'text-slate-800' : ''}`}>{currentLevel1.name}</span>
                        </>
                    )}
                    {currentLevel2 && (
                        <>
                        <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-slate-800">{currentLevel2.name}</span>
                        </>
                    )}
                </div>

                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {searchQuery ? 'Resultados de Búsqueda' : 
                    currentLevel2 ? currentLevel2.name : 
                    currentLevel1 ? currentLevel1.name : 
                    'Catálogo de Coberturas'}
                </h2>
                <p className="text-slate-500 mt-2 max-w-2xl">
                    {searchQuery ? `Mostrando coincidencias para "${searchQuery}"` : 
                    currentLevel2 ? 'Selecciona una unidad específica para ver la ficha técnica y generar referencias de campo.' : 
                    currentLevel1 ? 'Explora las sub-categorías disponibles en este nivel.' : 
                    'Navega por las categorías principales de la clasificación Corine Land Cover para Colombia.'}
                </p>
             </div>
             
             {(currentLevel1 || searchQuery) && (
                 <button 
                    onClick={handleBack}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all shadow-sm font-medium text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Regresar
                  </button>
             )}
          </div>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar">
          {displayedItems.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <p className="font-medium text-lg">No se encontraron elementos</p>
                <p className="text-sm">Intenta con otro término de búsqueda</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
              {displayedItems.map((item) => (
                <LandCoverCard 
                  key={item.code} 
                  item={item} 
                  onClick={
                    item.level === 1 ? handleLevel1Click :
                    item.level === 2 ? handleLevel2Click :
                    handleLevel3Click
                  } 
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal 
          item={selectedItem} 
          breadcrumbs={breadcrumbs}
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
}

export default App;