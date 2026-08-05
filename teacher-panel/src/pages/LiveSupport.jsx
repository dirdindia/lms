import React, { useState } from 'react';
import { PhoneCall, Video, MessageSquare, Clock, ShieldAlert, Send, MoreVertical, Paperclip, X } from 'lucide-react';

export default function LiveSupport() {
  const [activeTab, setActiveTab] = useState('incoming_video'); // 'incoming_video', 'incoming_chat', or 'active'
  const [selectedStudent, setSelectedStudent] = useState(1);

  const incomingRequests = [
    {
      id: 101,
      studentName: 'David Lee',
      topic: 'Cannot understand useEffect dependencies',
      timeElapsed: '2m ago',
      type: 'video',
      avatar: 'https://i.pravatar.cc/150?u=5'
    },
    {
      id: 102,
      studentName: 'Emma Watson',
      topic: 'Tailwind CSS Grid issue',
      timeElapsed: '5m ago',
      type: 'chat',
      avatar: 'https://i.pravatar.cc/150?u=6'
    },
    {
      id: 103,
      studentName: 'Chris Evans',
      topic: 'Routing error in React',
      timeElapsed: '1m ago',
      type: 'video',
      avatar: 'https://i.pravatar.cc/150?u=7'
    }
  ];

  const activeSessions = [
    {
      id: 1,
      studentName: 'Alex Johnson',
      type: 'chat',
      avatar: 'https://i.pravatar.cc/150?u=1',
      unread: 2,
      lastMessage: 'Yes, that worked perfectly!'
    },
    {
      id: 2,
      studentName: 'Sarah Smith',
      type: 'video',
      avatar: 'https://i.pravatar.cc/150?u=2',
      unread: 0,
      lastMessage: 'Screen sharing is paused'
    }
  ];

  const activeChatMessages = [
    { id: 1, sender: 'student', text: 'Hi, I am getting a CORS error when trying to fetch data from the backend.', time: '10:45 AM' },
    { id: 2, sender: 'teacher', text: 'Hello! Make sure you have the cors middleware enabled in your Express server.', time: '10:46 AM' },
    { id: 3, sender: 'student', text: 'Oh I see, I forgot to add app.use(cors()). Let me try that.', time: '10:47 AM' },
    { id: 4, sender: 'student', text: 'Yes, that worked perfectly! Thank you.', time: '10:49 AM' },
  ];

  const videoRequests = incomingRequests.filter(req => req.type === 'video');
  const chatRequests = incomingRequests.filter(req => req.type === 'chat');

  // Determine which list to show if we are on an incoming tab
  const displayedRequests = activeTab === 'incoming_video' ? videoRequests : chatRequests;

  return (
    <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Support Center</h1>
          <p className="text-gray-500 mt-1">Accept incoming requests and manage active student sessions.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium shadow-sm border border-green-200">
           <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
           Online & Accepting Requests
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200 mb-6 shrink-0">
        <button 
          onClick={() => setActiveTab('incoming_video')}
          className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'incoming_video' ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Incoming Video
          <span className="bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">{videoRequests.length}</span>
        </button>
        <button 
          onClick={() => setActiveTab('incoming_chat')}
          className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'incoming_chat' ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Incoming Chat
          <span className="bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs">{chatRequests.length}</span>
        </button>
        <button 
          onClick={() => setActiveTab('active')}
          className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'active' ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Active Sessions
          <span className="bg-brand/10 text-brand py-0.5 px-2 rounded-full text-xs">{activeSessions.length}</span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab.startsWith('incoming') ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full overflow-y-auto pb-6">
            <div className="lg:col-span-2 space-y-4">
              {displayedRequests.length === 0 ? (
                 <div className="bg-gray-50 rounded-xl border border-gray-200 border-dashed p-10 flex flex-col items-center justify-center text-center">
                    <Clock className="h-8 w-8 text-gray-400 mb-3" />
                    <h3 className="text-gray-900 font-medium">No incoming requests</h3>
                    <p className="text-gray-500 text-sm mt-1">You're all caught up for now.</p>
                 </div>
              ) : (
                displayedRequests.map((req) => (
                  <div key={req.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                         <img src={req.avatar} alt={req.studentName} className="w-12 h-12 rounded-full border border-gray-200 object-cover" />
                         <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                           {req.type === 'video' ? (
                             <div className="bg-brand text-white p-1 rounded-full"><Video className="h-3 w-3" /></div>
                           ) : (
                             <div className="bg-blue-500 text-white p-1 rounded-full"><MessageSquare className="h-3 w-3" /></div>
                           )}
                         </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{req.studentName}</h3>
                        <p className="text-gray-600 text-sm mt-0.5 line-clamp-1">{req.topic}</p>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-red-500 mt-2">
                          <Clock className="h-3 w-3" /> Waiting {req.timeElapsed}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 sm:flex-none bg-brand text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-brand/90 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2">
                        {req.type === 'video' ? <PhoneCall className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                        Accept
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-fit">
               <div className="flex items-center gap-2 text-brand font-semibold mb-4 pb-4 border-b border-gray-100">
                 <ShieldAlert className="h-5 w-5" />
                 Support Guidelines
               </div>
               <ul className="text-sm text-gray-600 space-y-3">
                 <li className="flex items-start gap-2">
                   <span className="bg-gray-100 text-gray-500 rounded-full h-5 w-5 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</span>
                   Accepting a request moves it to your Active Sessions tab.
                 </li>
                 <li className="flex items-start gap-2">
                   <span className="bg-gray-100 text-gray-500 rounded-full h-5 w-5 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">2</span>
                   You can manage multiple chat sessions simultaneously.
                 </li>
               </ul>
            </div>
          </div>
        ) : (
          <div className="flex h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Sidebar for multiple active sessions */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Current Sessions</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {activeSessions.map(session => (
                  <button 
                    key={session.id}
                    onClick={() => setSelectedStudent(session.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${selectedStudent === session.id ? 'bg-brand/10' : 'hover:bg-gray-50'}`}
                  >
                    <div className="relative shrink-0">
                      <img src={session.avatar} alt={session.studentName} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                      {session.unread > 0 && (
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                          {session.unread}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 text-sm truncate">{session.studentName}</span>
                        {session.type === 'video' ? <Video className="h-3.5 w-3.5 text-brand shrink-0" /> : <MessageSquare className="h-3.5 w-3.5 text-blue-500 shrink-0" />}
                      </div>
                      <p className={`text-xs mt-0.5 truncate ${selectedStudent === session.id ? 'text-brand-deep' : 'text-gray-500'}`}>
                        {session.lastMessage}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Chat/Video Area */}
            <div className="flex-1 flex flex-col bg-gray-50/50">
              {/* Header */}
              <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-3">
                  <img src={activeSessions.find(s => s.id === selectedStudent)?.avatar} alt="Student" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{activeSessions.find(s => s.id === selectedStudent)?.studentName}</h3>
                    <p className="text-xs text-brand flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-brand animate-pulse"></span> Active {activeSessions.find(s => s.id === selectedStudent)?.type} session
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                    End Session
                  </button>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="h-5 w-5" /></button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeSessions.find(s => s.id === selectedStudent)?.type === 'video' && (
                  <div className="w-full aspect-video bg-gray-900 rounded-xl overflow-hidden relative mb-6">
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Video feed" />
                    <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-xs">05:23</div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                       <button className="bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-md text-white transition"><MessageSquare className="h-5 w-5" /></button>
                       <button className="bg-red-500 hover:bg-red-600 p-3 rounded-full text-white transition"><PhoneCall className="h-5 w-5 rotate-[135deg]" /></button>
                    </div>
                  </div>
                )}

                {activeChatMessages.map(msg => (
                  <div key={msg.id} className={`flex flex-col max-w-[75%] ${msg.sender === 'teacher' ? 'self-end items-end ml-auto' : 'self-start items-start'}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'teacher' ? 'bg-brand text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-200 shrink-0">
                <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-brand/20 focus-within:border-brand transition-all">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition"><Paperclip className="h-5 w-5" /></button>
                  <textarea 
                    rows={1}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none focus:outline-none resize-none py-2 text-sm max-h-32"
                  ></textarea>
                  <button className="p-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition shadow-sm"><Send className="h-5 w-5" /></button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
