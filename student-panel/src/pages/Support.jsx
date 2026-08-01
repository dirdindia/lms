import { Plus, Ticket, CheckCircle2, Clock, BookOpen, LifeBuoy } from "lucide-react";

const tickets = [
  {
    id: "#TK-2041",
    subject: "Unable to access Week 3 resources",
    category: "Technical Issue",
    status: "Open",
    date: "2 hours ago",
    priority: "High"
  },
  {
    id: "#TK-1982",
    subject: "Question about certificate generation",
    category: "General Query",
    status: "Resolved",
    date: "2 days ago",
    priority: "Low"
  }
];

export default function Support() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Helpdesk Support</h1>
          <p className="text-muted-foreground mt-1">Raise a ticket for technical issues or general queries.</p>
        </div>
        <button className="bg-brand text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-brand-deep transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Raise New Ticket
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
        <div className="p-5 sm:p-6 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Your Tickets</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-black/10 text-muted-foreground text-sm">
                <th className="px-6 py-4 font-medium">Ticket ID & Subject</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground mb-1">{ticket.subject}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono">{ticket.id}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {ticket.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {ticket.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'Open' 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' 
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                    }`}>
                      {ticket.status === 'Open' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-brand hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-brand/5 border border-brand/20 p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-foreground mb-2">Technical Support</h4>
          <p className="text-sm text-muted-foreground">Platform bugs, video player issues, or login problems.</p>
        </div>
        
        <div className="bg-chart-2/5 border border-chart-2/20 p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-chart-2/10 text-chart-2 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-foreground mb-2">Academic Query</h4>
          <p className="text-sm text-muted-foreground">Questions about course content, assignments, or grading.</p>
        </div>

        <div className="bg-gold/5 border border-gold/20 p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <LifeBuoy className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-foreground mb-2">Billing & Account</h4>
          <p className="text-sm text-muted-foreground">Payment issues, refunds, and subscription management.</p>
        </div>
      </div>

    </div>
  );
}
