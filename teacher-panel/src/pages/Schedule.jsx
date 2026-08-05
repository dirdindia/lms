import React from 'react';
import { Calendar, Clock, Video, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function Schedule() {
  const scheduleData = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      date: 'Today',
      time: '10:00 AM - 11:30 AM',
      students: 45,
      status: 'upcoming',
      isLiveSoon: true,
    },
    {
      id: 2,
      title: 'Node.js Backend Architecture',
      date: 'Today',
      time: '02:00 PM - 04:00 PM',
      students: 38,
      status: 'upcoming',
      isLiveSoon: false,
    },
    {
      id: 3,
      title: 'System Design Interview Prep',
      date: 'Tomorrow, Aug 3',
      time: '09:00 AM - 11:00 AM',
      students: 120,
      status: 'scheduled',
      isLiveSoon: false,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Class Schedule</h1>
          <p className="text-gray-500 mt-1">View your upcoming live sessions scheduled by the administration.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Class Details</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Timing</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Enrolled</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scheduleData.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${session.isLiveSoon ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        <Video className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{session.title}</div>
                        <div className="text-sm text-gray-500 mt-0.5">Live Session</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {session.time}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-gray-900">{session.students} Students</div>
                  </td>
                  <td className="py-4 px-6">
                    {session.isLiveSoon ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        Starting Soon
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        Scheduled
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {session.isLiveSoon ? (
                        <button className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm cursor-pointer">
                          Start Class
                        </button>
                      ) : (
                         <span className="text-sm text-gray-400">Waiting for time</span>
                      )}
                    </div>
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
