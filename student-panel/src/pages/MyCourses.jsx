import { PlayCircle, Clock, Award, MoreVertical } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    instructor: "Sarah Drasner",
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "var(--color-brand)"
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Gary Simon",
    progress: 45,
    totalModules: 8,
    completedModules: 3,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "var(--color-chart-2)"
  },
  {
    id: 3,
    title: "Node.js Backend Architecture",
    instructor: "Maximilian Schwarzmüller",
    progress: 90,
    totalModules: 15,
    completedModules: 13,
    thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "var(--color-chart-3)"
  },
  {
    id: 4,
    title: "Python for Data Science",
    instructor: "Jose Portilla",
    progress: 15,
    totalModules: 20,
    completedModules: 3,
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "var(--color-chart-4)"
  }
];

export default function MyCourses() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground mt-1">Pick up where you left off.</p>
        </div>
        
        <div className="flex gap-2">
          <select className="bg-card border border-border text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand">
            <option>All Courses</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft flex flex-col group hover:shadow-lift transition-all duration-300">
            {/* Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <button className="absolute top-3 right-3 p-1.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-lg text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-bold line-clamp-1">{course.title}</h3>
                <p className="text-white/80 text-xs mt-0.5">{course.instructor}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {course.completedModules}/{course.totalModules} Modules</span>
                <span className="flex items-center gap-1 font-medium text-foreground">{course.progress}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mb-5">
                <div 
                  className="h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                ></div>
              </div>

              <div className="mt-auto">
                <button className="w-full py-2.5 bg-brand text-primary-foreground text-sm font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  {course.progress === 0 ? 'Start Course' : 'Continue Learning'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
