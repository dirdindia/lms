import React from 'react';
import { Calendar, Clock, MessageSquare, Video, User } from 'lucide-react';

export default function Mentorships() {
  const bookings = [
    {
      id: 1,
      studentName: 'Alex Johnson',
      topic: 'Career Guidance & Resume Review',
      date: 'Aug 2, 2026',
      time: '04:00 PM - 04:30 PM',
      status: 'upcoming',
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    {
      id: 2,
      studentName: 'Sarah Smith',
      topic: 'Doubt Clearing: React Hooks',
      date: 'Aug 2, 2026',
      time: '05:00 PM - 05:45 PM',
      status: 'upcoming',
      avatar: 'https://i.pravatar.cc/150?u=2'
    },
    {
      id: 3,
      studentName: 'Michael Chen',
      topic: 'Mock Interview Setup',
      date: 'Aug 1, 2026',
      time: '11:00 AM - 12:00 PM',
      status: 'completed',
      avatar: 'https://i.pravatar.cc/150?u=3'
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">1-to-1 Mentorship Bookings</h1>
          <p className="text-gray-500 mt-1">Manage personal sessions requested by your students.</p>
        </div>
        
        <div className="flex gap-2">
           <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm cursor-pointer text-sm">
             Set Availability
           </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex gap-6 text-sm font-medium">
          <button className="text-brand border-b-2 border-brand pb-1">Upcoming (2)</button>
          <button className="text-gray-500 hover:text-gray-900 pb-1">Completed (12)</button>
          <button className="text-gray-500 hover:text-gray-900 pb-1">Cancelled (1)</button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="flex items-start gap-4 flex-1">
                <img src={booking.avatar} alt={booking.studentName} className="w-12 h-12 rounded-full border border-gray-200 object-cover" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{booking.studentName}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{booking.topic}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {booking.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 md:w-48 shrink-0">
                {booking.status === 'upcoming' ? (
                   <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 self-start md:self-end">
                     Upcoming
                   </span>
                ) : (
                   <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 self-start md:self-end">
                     Completed
                   </span>
                )}
                
                {booking.status === 'upcoming' && (
                  <div className="flex items-center gap-2 mt-2 w-full">
                    <button className="flex-1 bg-brand text-white py-2 rounded-lg text-sm font-medium hover:bg-brand/90 transition-colors shadow-sm cursor-pointer flex justify-center items-center gap-2">
                      <Video className="h-4 w-4" /> Join
                    </button>
                    <button className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" title="Message Student">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
