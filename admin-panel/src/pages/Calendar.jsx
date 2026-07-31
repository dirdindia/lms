import { Calendar as CalendarIcon, Clock, Plus, Video } from "lucide-react";

export default function Calendar() {
  const events = [
    { id: 1, title: "React Basics Masterclass", date: "Today", time: "02:00 PM - 03:30 PM", type: "Live Class" },
    { id: 2, title: "Weekly Q&A Session", date: "Tomorrow", time: "11:00 AM - 12:00 PM", type: "Event" },
    { id: 3, title: "Advanced Node.js Tutorial", date: "15 Aug 2026", time: "05:00 PM - 07:00 PM", type: "Live Class" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-2">Manage live classes and events schedule.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-brand-deep transition-colors cursor-pointer shadow-sm">
          <Plus className="h-5 w-5" />
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View Placeholder */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">Interactive Calendar</h3>
            <p className="text-sm text-muted-foreground mt-1">Full calendar view will be implemented here.</p>
            <p className="text-xs text-muted-foreground">Clicking a date will open the 'Create Event' modal.</p>
          </div>
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col h-full">
          <div className="border-b border-border p-5 bg-muted/30">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand" />
              Upcoming
            </h3>
          </div>
          <div className="flex-1 p-5 flex flex-col gap-4">
            {events.map(event => (
              <div key={event.id} className="p-4 rounded-lg border border-border bg-background hover:border-brand/50 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    event.type === 'Live Class' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground group-hover:text-brand transition-colors">{event.title}</h4>
                <div className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4" />
                  {event.date}
                </div>
                <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {event.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
