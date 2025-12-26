
import React, { useState } from 'react';

interface EmergencyPanelProps {
  onSosTriggered: () => void;
}

const EmergencyPanel: React.FC<EmergencyPanelProps> = ({ onSosTriggered }) => {
  const [isLocating, setIsLocating] = useState(false);

  const handleShareLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          alert(`Success: Satellite link established. Sharing location coordinates.`);
        },
        () => {
          setIsLocating(false);
          alert("Error: Critical failure retrieving GPS data.");
        }
      );
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* Alert Header */}
      <div className="bg-rose-50 border-2 border-rose-100 p-6 rounded-[2rem] shadow-sm flex items-start gap-5">
        <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-rose-200">
          <i className="fas fa-triangle-exclamation text-white text-xl"></i>
        </div>
        <div>
          <h2 className="text-2xl font-black text-rose-900 leading-none mb-2">Emergency SOS Protocol</h2>
          <p className="text-rose-600/80 font-semibold leading-relaxed">Triggering this protocol will instantly broadcast your identity, live GPS coordinates, and a high-priority distress signal to global response centers and your personal security circle.</p>
        </div>
      </div>

      {/* Main SOS Trigger Area */}
      <div className="flex flex-col items-center justify-center py-12 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
          <div className="w-[600px] h-[600px] border border-rose-500 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-rose-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
          <button
            onClick={onSosTriggered}
            className="relative w-64 h-64 rounded-full bg-rose-600 text-white flex flex-col items-center justify-center shadow-[0_20px_60px_-15px_rgba(225,29,72,0.6)] hover:bg-rose-500 transition-all duration-500 active:scale-90 border-[12px] border-rose-100 active:border-rose-400 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
            <i className="fas fa-fingerprint text-7xl mb-4 relative z-10 drop-shadow-md"></i>
            <span className="text-4xl font-black uppercase tracking-widest relative z-10">SOS</span>
            <div className="mt-2 text-[10px] font-black tracking-widest uppercase opacity-60 relative z-10">Hold to Activate</div>
            {/* Glossy overlay */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 skew-y-[-10deg] -translate-y-1/2"></div>
          </button>
        </div>
        <p className="mt-8 text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Priority level: Omega</p>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={handleShareLocation}
          className="group bg-white border-2 border-slate-100 p-8 rounded-[2rem] flex items-center shadow-sm hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
        >
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
            <i className={`fas ${isLocating ? 'fa-spinner fa-spin' : 'fa-location-dot'} text-2xl`}></i>
          </div>
          <div className="text-left">
            <p className="font-black text-slate-900 text-lg leading-none mb-1">Satellite Ping</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Share Live Location</p>
          </div>
        </button>

        <a
          href="tel:911"
          className="group bg-slate-900 border-2 border-slate-900 p-8 rounded-[2rem] flex items-center shadow-2xl shadow-slate-900/10 hover:bg-slate-800 transition-all"
        >
          <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
            <i className="fas fa-phone-flip text-2xl"></i>
          </div>
          <div className="text-left text-white">
            <p className="font-black text-lg leading-none mb-1">Direct Connect</p>
            <p className="text-sm font-bold opacity-50 uppercase tracking-widest">Global Rescue Line</p>
          </div>
        </a>
      </div>

      {/* Emergency Contacts List */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Priority Contacts</h3>
          <button className="text-xs font-bold bg-slate-50 hover:bg-slate-100 px-6 py-3 rounded-2xl transition-all uppercase tracking-widest text-slate-500">Edit Network</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { name: "Julian Sterling", relation: "Primary Kin", phone: "+44 7700 900077", initial: "JS" },
            { name: "Aria Thorne", relation: "Emergency Envoy", phone: "+44 7700 900012", initial: "AT" },
            { name: "Dr. Kenji Sato", relation: "Personal Physician", phone: "+44 7700 900555", initial: "KS" },
            { name: "Elite Security", relation: "Tactical Response", phone: "999", initial: "ES" },
          ].map((contact, i) => (
            <div key={i} className="flex justify-between items-center p-6 bg-slate-50/50 rounded-3xl border border-transparent hover:border-slate-200 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600 font-black text-lg group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {contact.initial}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 leading-none mb-1">{contact.name}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{contact.relation}</p>
                  <p className="text-xs font-bold text-slate-500">{contact.phone}</p>
                </div>
              </div>
              <a href={`tel:${contact.phone}`} className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-sm">
                <i className="fas fa-phone-alt"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyPanel;
