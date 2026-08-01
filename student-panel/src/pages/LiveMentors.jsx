import { Video, MessageSquare, Circle, X } from "lucide-react";
import { useState } from "react";

const liveMentors = [
  {
    id: 101,
    name: "Alex Johnson",
    role: "Senior Full Stack Developer",
    company: "Google",
    status: "Live Now",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=60"
  },
  {
    id: 102,
    name: "Priya Sharma",
    role: "Cloud Architect",
    company: "AWS",
    status: "Live Now",
    meetingLink: "https://zoom.us/j/1234567890",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=60"
  },
  {
    id: 103,
    name: "David Chen",
    role: "Machine Learning Engineer",
    company: "OpenAI",
    status: "Live Now",
    meetingLink: "https://zoom.us/j/0987654321",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60"
  }
];

export default function LiveMentors() {
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "mentor", text: "Hi there! How can I help you today?" }
  ]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if(!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { sender: "student", text: chatMessage }]);
    setChatMessage("");
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: "mentor", text: "I'm looking into that for you..." }]);
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 relative h-[calc(100vh-4rem-2rem)] flex flex-col">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Live Teachers</h1>
          <p className="text-muted-foreground mt-1">Connect with online teachers instantly via video call or chat.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-medium text-sm">
          <Circle className="w-3 h-3 fill-emerald-500 text-emerald-500 animate-pulse" />
          <span>{liveMentors.length} Teachers Online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveMentors.map((mentor) => (
            <div key={mentor.id} className="bg-card border border-border rounded-2xl p-6 shadow-soft flex flex-col transition-all hover:-translate-y-1">
              
              <div className="flex items-start justify-between mb-4">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500 p-0.5">
                    <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="absolute bottom-0 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-card rounded-full"></div>
                </div>
                <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  Online
                </span>
              </div>
              
              <div className="flex-1 mb-6">
                <h3 className="text-lg font-bold text-foreground line-clamp-1">{mentor.name}</h3>
                <p className="text-sm text-brand font-medium line-clamp-1">{mentor.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{mentor.company}</p>
              </div>

              <div className="flex flex-col gap-2 mt-auto">
                <a href={mentor.meetingLink} target="_blank" rel="noreferrer" className="w-full bg-brand text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:bg-brand-deep transition-colors flex items-center justify-center gap-2">
                  <Video className="w-4 h-4" /> Join Video Call
                </a>
                <button onClick={() => setActiveChat(mentor)} className="w-full bg-secondary text-foreground py-2.5 rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Live Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Chat Drawer/Modal */}
      {activeChat && (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-[350px] bg-card border border-border rounded-2xl shadow-lift z-50 flex flex-col overflow-hidden">
          <div className="bg-brand text-primary-foreground p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={activeChat.image} alt={activeChat.name} className="w-8 h-8 rounded-full object-cover border border-white/20" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-brand rounded-full"></div>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">{activeChat.name}</h4>
                <p className="text-[10px] text-white/80">Connected</p>
              </div>
            </div>
            <button onClick={() => setActiveChat(null)} className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-64 overflow-y-auto p-4 flex flex-col gap-3 bg-secondary/20">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`max-w-[85%] p-3 text-sm rounded-xl ${msg.sender === 'student' ? 'bg-brand text-primary-foreground self-end rounded-tr-sm' : 'bg-card border border-border text-foreground self-start rounded-tl-sm'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendChat} className="p-3 bg-card border-t border-border flex items-center gap-2">
            <input 
              type="text" 
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 bg-secondary text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand"
            />
            <button type="submit" disabled={!chatMessage.trim()} className="bg-brand text-primary-foreground p-2.5 rounded-lg disabled:opacity-50 cursor-pointer">
              <MessageSquare className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
