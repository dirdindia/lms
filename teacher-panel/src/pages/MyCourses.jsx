import React from 'react';
import { Users, BookOpen, Star, MoreVertical, Upload, Megaphone, FileText, CheckCircle } from 'lucide-react';

export default function MyCourses() {
  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns & Next.js',
      students: 124,
      progress: 65,
      rating: 4.8,
      status: 'active',
      batch: 'Batch A - Morning (2025-26)',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop',
      recentModules: [
        { name: 'Server Components', status: 'completed' },
        { name: 'Server Actions', status: 'completed' },
        { name: 'Advanced Routing', status: 'current' },
      ]
    },
    {
      id: 2,
      title: 'Node.js Backend Architecture',
      students: 89,
      progress: 30,
      rating: 4.9,
      status: 'active',
      batch: 'Batch C - Evening (2025-26)',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
      recentModules: [
        { name: 'Express Basics', status: 'completed' },
        { name: 'MongoDB Integration', status: 'current' },
        { name: 'Authentication', status: 'upcoming' },
      ]
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-500 mt-1">Manage your assigned batches, track progress, and share materials.</p>
        </div>
      </div>

      <div className="space-y-8">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
             
             {/* Left side: Course Info & Stats */}
             <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200 lg:w-1/3 flex flex-col">
                <div className="aspect-video rounded-lg overflow-hidden mb-4 shrink-0 bg-gray-100 relative">
                   <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                   <div className="absolute top-3 right-3 bg-brand text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm tracking-wider uppercase">
                     Assigned Teacher
                   </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h2>
                <div className="mb-4 text-sm font-medium text-brand">{course.batch}</div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-1"><Users className="h-4 w-4"/> Enrolled</div>
                      <div className="text-lg font-semibold text-gray-900">{course.students}</div>
                   </div>
                   <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-1"><Star className="h-4 w-4 text-amber-400"/> Rating</div>
                      <div className="text-lg font-semibold text-gray-900">{course.rating} / 5.0</div>
                   </div>
                </div>
                
                <div className="mt-auto">
                   <div className="flex justify-between items-center text-sm font-medium mb-2">
                     <span className="text-gray-700">Syllabus Completion</span>
                     <span className="text-brand">{course.progress}%</span>
                   </div>
                   <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                     <div className="h-full bg-brand rounded-full" style={{ width: `${course.progress}%` }}></div>
                   </div>
                </div>
             </div>

             {/* Right side: Management Tools */}
             <div className="p-6 lg:w-2/3 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Course Management</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                   {/* Syllabus Tracking */}
                   <div>
                     <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                       <BookOpen className="h-4 w-4 text-brand"/> Syllabus Tracker
                     </h4>
                     <div className="space-y-3">
                        {course.recentModules.map((mod, idx) => (
                           <div key={idx} className="flex items-center gap-3 text-sm">
                             {mod.status === 'completed' ? (
                                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                             ) : mod.status === 'current' ? (
                                <div className="h-4 w-4 rounded-full border-2 border-brand flex items-center justify-center shrink-0">
                                  <div className="h-1.5 w-1.5 bg-brand rounded-full"></div>
                                </div>
                             ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-gray-200 shrink-0"></div>
                             )}
                             <span className={`${mod.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800 font-medium'}`}>
                               {mod.name}
                             </span>
                           </div>
                        ))}
                     </div>
                     <button className="text-brand text-sm font-medium mt-3 hover:underline">View full syllabus →</button>
                   </div>
                   
                   {/* Actions */}
                   <div>
                     <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                       <Upload className="h-4 w-4 text-blue-500"/> Teacher Actions
                     </h4>
                     <div className="space-y-2">
                        <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700 cursor-pointer">
                           <Megaphone className="h-4 w-4 text-amber-500" />
                           Send Announcement to Batch
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700 cursor-pointer">
                           <Users className="h-4 w-4 text-brand" />
                           View Detailed Student Progress
                        </button>
                     </div>
                   </div>
                </div>
             </div>

          </div>
        ))}
      </div>
    </div>
  );
}
