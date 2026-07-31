import { Users, BookOpen, DollarSign, Activity } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function Dashboard() {
  const stats = [
    { name: "Total Students", value: "2,543", change: "+12%", icon: Users },
    { name: "Active Courses", value: "45", change: "+3%", icon: BookOpen },
    { name: "Total Revenue", value: "$12,450", change: "+18%", icon: DollarSign },
    { name: "Completion Rate", value: "68%", change: "+5%", icon: Activity },
  ];

  // Dummy data for AreaChart (Revenue)
  const revenueData = [
    { name: 'Jan', current: 4000, previous: 2400 },
    { name: 'Feb', current: 3000, previous: 1398 },
    { name: 'Mar', current: 5000, previous: 9800 },
    { name: 'Apr', current: 4780, previous: 3908 },
    { name: 'May', current: 5890, previous: 4800 },
    { name: 'Jun', current: 8390, previous: 3800 },
    { name: 'Jul', current: 7490, previous: 4300 },
  ];

  // Dummy data for BarChart (Enrollments)
  const enrollmentData = [
    { name: 'Web Dev', students: 1200 },
    { name: 'UI/UX', students: 850 },
    { name: 'Python', students: 1500 },
    { name: 'Marketing', students: 600 },
    { name: 'Data Sci', students: 900 },
  ];

  // Dummy data for PieChart
  const completionData = [
    { name: 'Completed', value: 45 },
    { name: 'In Progress', value: 40 },
    { name: 'Not Started', value: 15 },
  ];
  // Using some standard hex colors that match the premium vibe
  const COLORS = ['#10b981', '#f59e0b', '#3b82f6'];

  const recentActivity = [
    { id: 1, action: "New user registered", target: "Rahul Sharma", time: "2 mins ago" },
    { id: 2, action: "Course purchased", target: "React Masterclass", time: "1 hour ago" },
    { id: 3, action: "Assignment submitted", target: "Advanced JS", time: "3 hours ago" },
    { id: 4, action: "New review left", target: "UI/UX Design", time: "5 hours ago" },
  ];

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back to the NMS Admin Panel.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                  <span className="text-sm font-medium text-emerald-500">{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section 1 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-6">Revenue Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="current" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCurrent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enrollment Bar Chart */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-6">Top Course Enrollments</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={75} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                <Tooltip 
                  cursor={{fill: 'var(--muted)'}}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                />
                <Bar dataKey="students" fill="var(--brand)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Section 2 & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Completion Pie Chart */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Course Completion Status</h3>
          <div className="h-[280px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
          <div className="border-b border-border p-6 bg-muted/30">
            <h3 className="font-semibold text-lg">Recent Activity</h3>
          </div>
          <div className="divide-y divide-border flex-1 overflow-y-auto">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 px-6 flex justify-between items-center hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.target}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
