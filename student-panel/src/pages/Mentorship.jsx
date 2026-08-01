import { Calendar, Video, Star, MessageSquare } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Sarah Drasner",
    role: "Senior Frontend Engineer",
    company: "Tech Corp",
    rating: 4.9,
    reviews: 124,
    price: "Free",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Gary Simon",
    role: "UI/UX Lead",
    company: "Design Studio",
    rating: 4.8,
    reviews: 89,
    price: "Free",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&auto=format&fit=crop&q=60"
  }
];

export default function Mentorship() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">1-on-1 Mentorship</h1>
          <p className="text-muted-foreground mt-1">Book personalized sessions with industry experts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="bg-card border border-border rounded-2xl p-6 shadow-soft flex flex-col sm:flex-row gap-6 items-center sm:items-start transition-all hover:shadow-lift">
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0">
              <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{mentor.name}</h3>
                  <p className="text-sm text-brand font-medium">{mentor.role} @ {mentor.company}</p>
                </div>
                <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-sm font-bold">
                  {mentor.price}
                </span>
              </div>
              
              <div className="flex items-center justify-center sm:justify-start gap-4 mb-6">
                <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                  <Star className="w-4 h-4 text-gold fill-gold" /> {mentor.rating}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({mentor.reviews} reviews)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-brand text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:bg-brand-deep transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" /> Book Session
                </button>
                <button className="flex-1 bg-secondary text-foreground py-2.5 rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-brand/5 border border-brand/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Upcoming Session</h3>
          <p className="text-muted-foreground">You have a mock interview scheduled with Sarah Drasner.</p>
          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Calendar className="w-4 h-4 text-brand" /> Tomorrow, 10:00 AM
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Video className="w-4 h-4 text-brand" /> Zoom Meeting
            </span>
          </div>
        </div>
        <button className="bg-white border border-border shadow-sm text-foreground py-2.5 px-6 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
          Reschedule
        </button>
      </div>

    </div>
  );
}
