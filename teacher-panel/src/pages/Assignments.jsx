import React from 'react';
import { FileText, Users, CheckCircle, Clock, Plus, MoreHorizontal } from 'lucide-react';

export default function Assignments() {
  const assignments = [
    {
      id: 1,
      title: 'Build a Personal Portfolio',
      course: 'Advanced React Patterns',
      dueDate: 'Aug 5, 2026',
      totalSubmissions: 42,
      graded: 12,
      pending: 30,
      status: 'active'
    },
    {
      id: 2,
      title: 'Create an Express API',
      course: 'Node.js Backend Architecture',
      dueDate: 'Aug 10, 2026',
      totalSubmissions: 15,
      graded: 0,
      pending: 15,
      status: 'active'
    },
    {
      id: 3,
      title: 'UI Component Library',
      course: 'Advanced React Patterns',
      dueDate: 'Jul 28, 2026',
      totalSubmissions: 45,
      graded: 45,
      pending: 0,
      status: 'completed'
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-500 mt-1">Create assignments and grade student submissions.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/90 transition-colors cursor-pointer shadow-sm">
          <Plus className="h-4 w-4" />
          <span className="font-medium">Create Assignment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
               <FileText className="h-6 w-6" />
            </div>
            <div>
               <div className="text-2xl font-bold text-gray-900">24</div>
               <div className="text-sm text-gray-500 font-medium">Active Assignments</div>
            </div>
         </div>
         <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
               <Clock className="h-6 w-6" />
            </div>
            <div>
               <div className="text-2xl font-bold text-gray-900">45</div>
               <div className="text-sm text-gray-500 font-medium">Pending Grading</div>
            </div>
         </div>
         <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
               <CheckCircle className="h-6 w-6" />
            </div>
            <div>
               <div className="text-2xl font-bold text-gray-900">128</div>
               <div className="text-sm text-gray-500 font-medium">Submissions Graded</div>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assignment Details</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{assignment.title}</div>
                    <div className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                      <Users className="h-3 w-3" /> {assignment.totalSubmissions} Submissions
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">{assignment.course}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`text-sm font-medium ${assignment.status === 'completed' ? 'text-gray-500' : 'text-gray-900'}`}>
                      {assignment.dueDate}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                       <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden w-24">
                          <div 
                            className={`h-full ${assignment.status === 'completed' ? 'bg-green-500' : 'bg-brand'}`} 
                            style={{ width: `${(assignment.graded / assignment.totalSubmissions) * 100}%` }}
                          ></div>
                       </div>
                       <span className="text-xs font-medium text-gray-600 w-12 text-right">
                          {assignment.graded}/{assignment.totalSubmissions}
                       </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                     <button className="text-sm font-medium text-brand hover:text-brand-deep transition-colors mr-4 cursor-pointer">
                        {assignment.pending > 0 ? 'Grade Submissions' : 'View Report'}
                     </button>
                     <button className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer inline-flex items-center">
                        <MoreHorizontal className="h-5 w-5" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
