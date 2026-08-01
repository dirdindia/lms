import { Calendar, Clock, Video, Users, ChevronRight } from "lucide-react";

const upcomingClasses = [
  {
    id: 1,
    title: "React State Management - Advanced",
    course: "Advanced React Patterns",
    instructor: "Sarah Drasner",
    date: "Today",
    time: "02:00 PM - 03:30 PM",
    attendees: 42,
    status: "starting_soon", // starting_soon, upcoming, live
    color: "var(--color-brand)"
  },
  {
    id: 2,
    title: "Typography in UI Design",
    course: "UI/UX Design Masterclass",
    instructor: "Gary Simon",
    date: "Tomorrow",
    time: "10:00 AM - 11:00 AM",
    attendees: 18,
    status: "upcoming",
    color: "var(--color-chart-2)"
  },
  {
    id: 3,
    title: "Building REST APIs with Express",
    course: "Node.js Backend Architecture",
    instructor: "Maximilian S.",
    date: "Aug 15, 2026",
    time: "04:00 PM - 06:00 PM",
    attendees: 56,
    status: "upcoming",
    color: "var(--color-chart-3)"
  }
];

const pastClasses = [
  {
    id: 4,
    title: "Introduction to Hooks",
    course: "Advanced React Patterns",
    date: "Yesterday",
    duration: "1h 15m",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    title: "Color Theory Basics",
    course: "UI/UX Design Masterclass",
    date: "Aug 10, 2026",
    duration: "45m",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&auto=format&fit=crop&q=60"
  }
];

export default function LiveClasses() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Live Classes</h1>
        <p className="text-muted-foreground mt-1">Join interactive sessions with your instructors.</p>
      </div>

      {/* Upcoming Classes */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Upcoming Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingClasses.map((cls) => (
            <div key={cls.id} className="bg-card border border-border rounded-2xl p-5 shadow-soft hover:shadow-lift transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: cls.color }}></div>
              
              <div className="flex justify-between items-start mb-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  cls.status === 'starting_soon' ? 'bg-orange-100 text-orange-700' : 'bg-secondary text-muted-foreground'
                }`}>
                  {cls.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" /> {cls.attendees}
                </span>
              </div>

              <h3 className="font-bold text-foreground line-clamp-1 mb-1">{cls.title}</h3>
              <p className="text-sm text-brand font-medium mb-4">{cls.course}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {cls.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground">
                    {cls.instructor.charAt(0)}
                  </div>
                  {cls.instructor}
                </div>
              </div>

              <button className={`w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                cls.status === 'starting_soon' 
                  ? 'bg-brand text-primary-foreground hover:bg-brand-deep' 
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}>
                {cls.status === 'starting_soon' ? (
                  <> <Video className="w-4 h-4" /> Join Class Now </>
                ) : (
                  <> <Calendar className="w-4 h-4" /> Add to Calendar </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Past Recordings */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-foreground">Recent Recordings</h2>
          <button className="text-sm text-brand font-medium hover:underline flex items-center">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pastClasses.map((record) => (
            <div key={record.id} className="bg-card border border-border rounded-xl overflow-hidden group cursor-pointer">
              <div className="relative h-32 w-full">
                <img src={record.thumbnail} alt={record.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white">
                    <Video className="w-5 h-5 ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {record.duration}
                </span>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-sm text-foreground line-clamp-1">{record.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{record.course}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
