import React from 'react';
import { Play, Clock, Users, Download, Share2, Search, Filter } from 'lucide-react';

export default function Recordings() {
  const recordings = [
    {
      id: 1,
      title: 'React Hooks Deep Dive',
      date: 'Aug 1, 2026',
      duration: '1h 45m',
      views: 128,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'State Management with Redux Toolkit',
      date: 'Jul 28, 2026',
      duration: '2h 10m',
      views: 89,
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Next.js 14 App Router Basics',
      date: 'Jul 25, 2026',
      duration: '1h 20m',
      views: 215,
      thumbnail: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Tailwind CSS Advanced Layouts',
      date: 'Jul 20, 2026',
      duration: '55m',
      views: 142,
      thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=600&auto=format&fit=crop',
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Recordings</h1>
          <p className="text-gray-500 mt-1">Access and manage recordings of your previous live classes.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search recordings..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recordings.map((recording) => (
          <div key={recording.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="relative aspect-video">
              <img 
                src={recording.thumbnail} 
                alt={recording.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white transition-colors cursor-pointer">
                  <Play className="h-8 w-8 fill-current" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded backdrop-blur-sm">
                {recording.duration}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 line-clamp-1 mb-2" title={recording.title}>
                {recording.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {recording.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {recording.views} views
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-deep transition-colors cursor-pointer">
                  <Play className="h-4 w-4" /> Watch Now
                </button>
                <div className="flex items-center gap-2 text-gray-400">
                  <button className="p-1.5 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors cursor-pointer" title="Share">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors cursor-pointer" title="Download">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
