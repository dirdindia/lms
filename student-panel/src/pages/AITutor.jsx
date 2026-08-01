import { useState } from "react";
import { Send, Image as ImageIcon, FileText, Bot, User, Paperclip } from "lucide-react";

export default function AITutor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I am your 24/7 AI Tutor. I can help you understand concepts, review your code, or answer questions based on your course materials. You can also upload images or PDFs for me to analyze. How can I help you today?",
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      type: "user",
      content: input,
    };
    
    setMessages([...messages, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: "ai",
        content: "I'm a simulated AI assistant for this demo. In the real application, I would process your query (or uploaded files) and provide a detailed explanation here!"
      }]);
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto h-[calc(100vh-4rem-2rem)] flex flex-col">
      
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <Bot className="w-8 h-8 text-brand" /> 24/7 AI Tutor
        </h1>
        <p className="text-muted-foreground mt-1">Ask questions, get code help, or upload documents for instant answers.</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-card border border-border rounded-2xl shadow-soft overflow-hidden flex flex-col relative">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                msg.type === 'ai' ? 'bg-brand/10 text-brand' : 'bg-secondary text-foreground'
              }`}>
                {msg.type === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.type === 'user' 
                  ? 'bg-brand text-primary-foreground rounded-tr-sm' 
                  : 'bg-secondary/50 text-foreground rounded-tl-sm border border-border'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background border-t border-border">
          <form onSubmit={handleSend} className="flex items-center bg-card border border-border rounded-xl focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-all p-1.5 shadow-sm">
            
            <div className="flex items-center gap-1 px-1 text-muted-foreground shrink-0">
              <button type="button" className="p-2 hover:bg-secondary rounded-lg transition-colors cursor-pointer" title="Attach Image">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 hover:bg-secondary rounded-lg transition-colors cursor-pointer" title="Attach PDF">
                <FileText className="w-5 h-5" />
              </button>
            </div>

            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything or attach a file..." 
              className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 py-3 px-3 text-sm w-full"
            />

            <button 
              type="submit" 
              disabled={!input.trim()}
              className="p-3 bg-brand text-primary-foreground rounded-lg disabled:opacity-50 hover:bg-brand-deep transition-colors cursor-pointer shrink-0 ml-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-center mt-3">
             <span className="text-[10px] text-muted-foreground">AI can make mistakes. Verify important information.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
