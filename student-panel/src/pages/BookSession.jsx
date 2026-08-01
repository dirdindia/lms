import { useState } from "react";
import { Calendar, Clock, Video, CheckCircle2 } from "lucide-react";

export default function BookSession() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="p-4 sm:p-6 max-w-3xl mx-auto flex flex-col items-center justify-center text-center py-20">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Session Booked!</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Your 1-to-1 session has been confirmed. We have sent the meeting link and details to your email.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="bg-brand text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-brand-deep transition-colors"
        >
          Book Another Session
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Book 1-to-1 Session</h1>
        <p className="text-muted-foreground mt-1">Schedule a private session with an expert for personalized guidance.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          {/* Topic Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground">What do you need help with?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Code Review', 'Career Guidance', 'Project Help'].map((topic) => (
                <label key={topic} className="border border-border rounded-xl p-4 cursor-pointer hover:border-brand/50 has-[:checked]:border-brand has-[:checked]:bg-brand/5 transition-all">
                  <input type="radio" name="topic" value={topic} className="sr-only" required />
                  <span className="font-medium text-foreground">{topic}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Select Mentor */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground">Select Mentor (Optional)</label>
            <select className="w-full border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand bg-transparent text-foreground">
              <option value="">Any Available Expert</option>
              <option value="sarah">Sarah Drasner (Frontend)</option>
              <option value="gary">Gary Simon (UI/UX)</option>
              <option value="max">Maximilian (Backend)</option>
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" /> Date
              </label>
              <input 
                type="date" 
                className="w-full border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand bg-transparent text-foreground"
                required
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" /> Time
              </label>
              <select className="w-full border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand bg-transparent text-foreground" required>
                <option value="">Select Time Slot</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground">Description</label>
            <textarea 
              className="w-full border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand bg-transparent text-foreground min-h-[120px]"
              placeholder="Briefly describe what you'd like to discuss so your mentor can prepare..."
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-border flex justify-end">
            <button type="submit" className="bg-brand text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-brand-deep transition-colors shadow-sm flex items-center gap-2">
              <Video className="w-5 h-5" /> Confirm Booking
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
