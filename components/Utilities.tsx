
import React, { useState } from 'react';

const Utilities: React.FC = () => {
  const [activeUtil, setActiveUtil] = useState<'docs' | 'polls' | 'calendar' | 'gallery'>('docs');

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'docs', icon: 'fa-file-alt', label: 'Docs' },
          { id: 'polls', icon: 'fa-poll', label: 'Polls' },
          { id: 'calendar', icon: 'fa-calendar-alt', label: 'Calendar' },
          { id: 'gallery', icon: 'fa-images', label: 'Gallery' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveUtil(item.id as any)}
            className={`flex items-center px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
              activeUtil === item.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border'
            }`}
          >
            <i className={`fas ${item.icon} mr-2`}></i> {item.label}
          </button>
        ))}
      </div>

      {activeUtil === 'docs' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Safe Storage</h3>
            <button className="text-blue-600 text-sm font-semibold">+ Upload Doc</button>
          </div>
          <div className="space-y-4">
            {['Identity_Card.pdf', 'Medical_Report_2024.pdf', 'Insurance_Policy.pdf'].map((doc, i) => (
              <div key={i} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <i className="fas fa-file-pdf text-red-500 text-2xl mr-4"></i>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{doc}</p>
                  <p className="text-xs text-gray-500">1.2 MB • Updated 2 days ago</p>
                </div>
                <button className="text-gray-400 hover:text-blue-500"><i className="fas fa-download"></i></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeUtil === 'polls' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-4">Community Polls</h3>
          <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 mb-4">
            <p className="font-bold text-blue-900 mb-4">Emergency shelter readiness for next storm?</p>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-white border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors flex justify-between">
                <span>Fully Ready</span>
                <span className="font-bold">64%</span>
              </button>
              <button className="w-full text-left p-3 bg-white border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors flex justify-between">
                <span>Partial Supply</span>
                <span className="font-bold">32%</span>
              </button>
              <button className="w-full text-left p-3 bg-white border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors flex justify-between">
                <span>Not Prepared</span>
                <span className="font-bold">4%</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeUtil === 'calendar' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-4">Upcoming Safety Events</h3>
          <div className="space-y-4">
            {[
              { title: "First Aid Training", date: "Oct 24, 2024", time: "10:00 AM" },
              { title: "Fire Drill - Sector 4", date: "Nov 02, 2024", time: "02:00 PM" },
            ].map((ev, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 border-l-4 border-blue-500 bg-gray-50 rounded-r-xl">
                <div className="text-center bg-white px-3 py-2 rounded-lg shadow-sm">
                  <span className="block text-xs uppercase font-bold text-gray-400">Oct</span>
                  <span className="text-xl font-black text-blue-600">24</span>
                </div>
                <div>
                  <h4 className="font-bold">{ev.title}</h4>
                  <p className="text-sm text-gray-500">{ev.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeUtil === 'gallery' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-sm hover:opacity-90 transition-opacity">
              <img src={`https://picsum.photos/seed/${i + 40}/400/400`} alt="Gallery" className="w-full h-full object-cover" />
            </div>
          ))}
          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50">
            <i className="fas fa-plus text-xl mb-1"></i>
            <span className="text-xs font-bold">Add Media</span>
            <input type="file" className="hidden" />
          </label>
        </div>
      )}
    </div>
  );
};

export default Utilities;
