
import React, { useState, useEffect } from 'react';
import { AppTab } from './types';
import EmergencyPanel from './components/EmergencyPanel';
import AITools from './components/AITools';
import Utilities from './components/Utilities';
import { getMapsInfo } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapSearch, setMapSearch] = useState('');
  const [mapResult, setMapResult] = useState<{ text: string; grounding: any[] } | null>(null);
  const [loadingMap, setLoadingMap] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  const handleMapSearch = async () => {
    if (!mapSearch.trim()) return;
    setLoadingMap(true);
    try {
      const result = await getMapsInfo(mapSearch, userLocation?.lat, userLocation?.lng);
      setMapResult(result);
    } catch (e) {
      alert("Search failed.");
    }
    setLoadingMap(false);
  };

  const navItems = [
    { id: AppTab.DASHBOARD, icon: 'fa-shapes', label: 'Overview' },
    { id: AppTab.EMERGENCY, icon: 'fa-shield-halved', label: 'Emergency', color: 'text-rose-500' },
    { id: AppTab.AI_TOOLS, icon: 'fa-bolt-lightning', label: 'Intelligence' },
    { id: AppTab.MAPS, icon: 'fa-location-dot', label: 'Live Maps' },
    { id: AppTab.UTILITIES, icon: 'fa-layer-group', label: 'Toolkit' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2.5 text-slate-500 lg:hidden hover:bg-slate-100 rounded-xl transition-colors"
          >
            <i className="fas fa-bars-staggered text-xl"></i>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <i className="fas fa-satellite-dish text-white"></i>
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-none text-slate-900">GuardianPulse</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Quantum Secure</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex flex-col items-end mr-2">
            <p className="text-xs font-bold text-slate-900">Alex Sterling</p>
            <p className="text-[10px] text-green-500 font-medium">Verified Account</p>
          </div>
          <button className="relative w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-all premium-shadow">
            <i className="fas fa-bell"></i>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-11 h-11 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
            <img src="https://i.pravatar.cc/150?u=guardian" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className={`fixed inset-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) sidebar-gradient border-r border-slate-200 w-72 p-6 shrink-0`}>
          <div className="flex justify-between items-center mb-12 lg:hidden">
            <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">Menu</span>
            <button onClick={() => setIsSidebarOpen(false)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><i className="fas fa-times"></i></button>
          </div>
          
          <div className="mb-8">
            <p className="px-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Core Services</p>
            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    activeTab === item.id 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <i className={`fas ${item.icon} w-6 mr-3 text-lg ${activeTab === item.id ? 'text-white' : item.color || 'text-slate-400 opacity-60'}`}></i>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto space-y-4">
            <div className="bg-slate-900 rounded-3xl p-5 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Active Status</p>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <p className="text-sm font-bold">Signal Encrypted</p>
                </div>
              </div>
              <i className="fas fa-lock absolute -right-2 -bottom-2 text-5xl opacity-5 group-hover:scale-110 transition-transform"></i>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 text-slate-500 text-sm font-bold hover:bg-slate-50 transition-colors">
              <i className="fas fa-gear"></i> System Settings
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#FBFBFF]">
          <div className="max-w-6xl mx-auto">
            {activeTab === AppTab.DASHBOARD && (
              <div className="space-y-8 animate-in fade-in duration-700">
                {/* Hero Banner */}
                <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-200/50 relative overflow-hidden border border-white/10">
                  <div className="relative z-10 max-w-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border border-white/10">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                      All systems operational
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight leading-tight">Your digital <br/><span className="text-indigo-400">Guardian</span> is active.</h1>
                    <p className="text-slate-400 font-medium mb-8 leading-relaxed">Advanced real-time monitoring and emergency response at your fingertips. Safe, secure, and ready.</p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => setActiveTab(AppTab.EMERGENCY)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all flex items-center group">
                        Activate SOS <i className="fas fa-chevron-right ml-3 text-sm transition-transform group-hover:translate-x-1"></i>
                      </button>
                      <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl font-bold transition-all border border-white/10">
                        View Log
                      </button>
                    </div>
                  </div>
                  {/* Abstract shapes */}
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-rose-600/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                  <i className="fas fa-fingerprint absolute right-12 bottom-12 text-[12rem] opacity-[0.03] rotate-12"></i>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6">
                        <i className="fas fa-wave-square text-2xl"></i>
                      </div>
                      <span className="text-xs font-black text-rose-500 bg-rose-50 px-3 py-1 rounded-full uppercase">Vital</span>
                    </div>
                    <h3 className="font-extrabold text-slate-800 text-lg mb-1">Heart Pulse</h3>
                    <p className="text-sm text-slate-400 font-medium">Synced with Bio-Tracker</p>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl font-black text-slate-900 tracking-tighter">78</span>
                      <span className="text-slate-400 font-bold text-sm uppercase">BPM</span>
                    </div>
                  </div>

                  <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6">
                        <i className="fas fa-location-crosshairs text-2xl"></i>
                      </div>
                      <span className="text-xs font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full uppercase">Secure</span>
                    </div>
                    <h3 className="font-extrabold text-slate-800 text-lg mb-1">Last Sync</h3>
                    <p className="text-sm text-slate-400 font-medium">London, United Kingdom</p>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900 tracking-tight">Active Now</span>
                    </div>
                  </div>

                  <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6">
                        <i className="fas fa-battery-three-quarters text-2xl"></i>
                      </div>
                      <span className="text-xs font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-full uppercase">Status</span>
                    </div>
                    <h3 className="font-extrabold text-slate-800 text-lg mb-1">Device Battery</h3>
                    <p className="text-sm text-slate-400 font-medium">Primary Hub Station</p>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl font-black text-slate-900 tracking-tighter">92</span>
                      <span className="text-slate-400 font-bold text-sm uppercase">%</span>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-3">
                        <i className="fas fa-history text-indigo-600"></i> Event Timeline
                      </h3>
                      <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-xl">Full Report</button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { type: 'Safety Check', user: 'Self', time: 'Just now', icon: 'fa-check-circle', color: 'bg-indigo-600', text: 'Daily safety protocol completed successfully.' },
                        { type: 'Critical Update', user: 'Admin', time: '1h ago', icon: 'fa-triangle-exclamation', color: 'bg-rose-500', text: 'System firmware upgraded to version 4.2.0.' },
                        { type: 'Access Granted', user: 'John Doe', time: '3h ago', icon: 'fa-key', color: 'bg-slate-900', text: 'Emergency contact access token was refreshed.' },
                      ].map((act, i) => (
                        <div key={i} className="group flex gap-5 p-5 bg-slate-50/50 hover:bg-slate-50 rounded-3xl transition-colors border border-transparent hover:border-slate-200">
                          <div className={`shrink-0 w-12 h-12 ${act.color} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/5`}>
                            <i className={`fas ${act.icon}`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-bold text-slate-900">{act.type}</p>
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{act.time}</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{act.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                      <h3 className="text-lg font-extrabold text-slate-900 mb-6">Network Health</h3>
                      <div className="space-y-6">
                        {[
                          { label: 'Cloud Connection', value: 98, color: 'bg-indigo-600' },
                          { label: 'Data Encryption', value: 100, color: 'bg-emerald-500' },
                          { label: 'Response Latency', value: 12, color: 'bg-rose-500', inverse: true },
                        ].map((stat, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                              <span>{stat.label}</span>
                              <span className="text-slate-900">{stat.value}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.value}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden">
                      <h3 className="text-lg font-extrabold mb-4">Support Line</h3>
                      <p className="text-indigo-100 text-sm font-medium mb-6">Need expert help? Our security team is available 24/7 for consultation.</p>
                      <button className="w-full bg-white text-indigo-600 py-3.5 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                        Talk to Expert
                      </button>
                      <i className="fas fa-headset absolute -right-6 -bottom-6 text-8xl opacity-10 -rotate-12"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === AppTab.EMERGENCY && (
              <div className="animate-in slide-in-from-bottom-8 duration-700">
                <EmergencyPanel onSosTriggered={() => console.log("SOS TRIGGERED")} />
              </div>
            )}

            {activeTab === AppTab.AI_TOOLS && (
              <div className="animate-in slide-in-from-bottom-8 duration-700">
                <AITools />
              </div>
            )}

            {activeTab === AppTab.UTILITIES && (
              <div className="animate-in slide-in-from-bottom-8 duration-700">
                <Utilities />
              </div>
            )}

            {activeTab === AppTab.MAPS && (
              <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900">Live Satellite Grid</h3>
                      <p className="text-slate-500 font-medium">Search for resources near your current sector.</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-colors"><i className="fas fa-expand"></i></button>
                      <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-colors"><i className="fas fa-layer-group"></i></button>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="relative flex-1">
                      <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                      <input 
                        type="text" 
                        placeholder="Search shelters, medical facilities, water..." 
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                        value={mapSearch}
                        onChange={(e) => setMapSearch(e.target.value)}
                      />
                    </div>
                    <button 
                      onClick={handleMapSearch}
                      disabled={loadingMap}
                      className="bg-indigo-600 text-white px-8 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:bg-slate-400"
                    >
                      {loadingMap ? <i className="fas fa-circle-notch fa-spin"></i> : 'Execute'}
                    </button>
                  </div>
                </div>

                {mapResult && (
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="prose prose-slate max-w-none mb-8 text-slate-600 leading-relaxed font-medium">
                      {mapResult.text}
                    </div>
                    
                    {mapResult.grounding.length > 0 && (
                      <div className="pt-8 border-t border-slate-100">
                        <h4 className="font-extrabold text-slate-900 mb-5 flex items-center gap-3">
                          <i className="fas fa-location-dot text-indigo-600"></i> Discovered Resource Points
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {mapResult.grounding.map((chunk: any, i: number) => {
                            const item = chunk.maps || chunk.web;
                            if (!item) return null;
                            return (
                              <a 
                                key={i} 
                                href={item.uri} 
                                target="_blank" 
                                rel="noreferrer"
                                className="group p-5 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center hover:bg-white hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
                              >
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                  <i className={`fas ${chunk.maps ? 'fa-map-pin' : 'fa-arrow-up-right-from-square'} text-sm`}></i>
                                </div>
                                <span className="text-sm font-bold truncate text-slate-700">{item.title || "Navigate to Site"}</span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-slate-200 h-[500px] rounded-[3rem] relative overflow-hidden group border-4 border-white shadow-inner">
                   <img src="https://picsum.photos/seed/mapview/1200/800" className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000" />
                   <div className="absolute inset-0 bg-indigo-900/10"></div>
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="text-center p-10 bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-700">
                        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-xl shadow-indigo-600/30 animate-bounce">
                          <i className="fas fa-location-crosshairs"></i>
                        </div>
                        <p className="font-black text-slate-900 text-xl mb-1 tracking-tight">Geo-Precision Active</p>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">{userLocation ? `${userLocation.lat.toFixed(4)} N | ${userLocation.lng.toFixed(4)} E` : 'Connecting to GPS...'}</p>
                     </div>
                   </div>
                   {/* Grid Lines */}
                   <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-[0.1]">
                     {[...Array(144)].map((_, i) => <div key={i} className="border-[0.5px] border-indigo-900"></div>)}
                   </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Persistent Call Action (Mobile) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button 
          onClick={() => setActiveTab(AppTab.EMERGENCY)}
          className="bg-rose-600 text-white flex items-center px-10 py-5 rounded-full shadow-2xl shadow-rose-600/40 hover:bg-rose-700 active:scale-90 transition-all font-black text-sm uppercase tracking-widest"
        >
          <i className="fas fa-shield-halved mr-3 text-lg"></i> SOS Protocol
        </button>
      </div>

      {/* Floating AI Assistant */}
      <button className="fixed bottom-10 right-10 w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-600/40 hover:bg-indigo-500 hover:rotate-6 transition-all active:scale-95 z-40 group">
        <i className="fas fa-message-bot text-3xl group-hover:scale-110 transition-transform"></i>
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white"></span>
      </button>
    </div>
  );
};

export default App;
