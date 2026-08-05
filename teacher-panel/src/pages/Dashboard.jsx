import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { BookOpen, Clock, Award, Target, Flame } from 'lucide-react';

const studyHoursData = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 3.8 },
  { name: 'Wed', hours: 1.5 },
  { name: 'Thu', hours: 4.2 },
  { name: 'Fri', hours: 3.0 },
  { name: 'Sat', hours: 5.5 },
  { name: 'Sun', hours: 4.0 },
];

const courseProgressData = [
  { name: 'React Advanced', progress: 75, fill: 'var(--color-brand)' },
  { name: 'UI/UX Design', progress: 45, fill: 'var(--color-chart-2)' },
  { name: 'Node.js Backend', progress: 90, fill: 'var(--color-chart-3)' },
  { name: 'Python Basics', progress: 20, fill: 'var(--color-chart-4)' },
];

const assessmentScores = [
  { name: 'Quiz 1', score: 85 },
  { name: 'Quiz 2', score: 92 },
  { name: 'Midterm', score: 78 },
  { name: 'Quiz 3', score: 88 },
  { name: 'Quiz 4', score: 95 },
];

const COLORS = ['var(--color-brand)', 'var(--color-chart-2)', 'var(--color-chart-3)', 'var(--color-chart-4)'];

export default function Dashboard() {
  return (
    <div className="p-2 sm:p-6 space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Welcome back, John Doe! 👋</h1>
          <p className="text-muted-foreground mt-1">Here is what's happening with your learning progress today.</p>
        </div>
        <div className="flex items-center gap-2 bg-brand/10 text-brand-deep px-4 py-2 rounded-full font-medium text-sm border border-brand/20">
          <Flame className="w-4 h-4 text-orange-500" />
          <span>12 Day Streak!</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-5 rounded-2xl shadow-soft flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="p-3 bg-brand/10 text-brand rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">4</h3>
          </div>
        </div>
        
        <div className="bg-card border border-border p-5 rounded-2xl shadow-soft flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="p-3 bg-chart-2/10 text-chart-2 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Hours Learned</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">24.5h</h3>
          </div>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-soft flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="p-3 bg-chart-3/10 text-chart-3 rounded-xl">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">87.6%</h3>
          </div>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-soft flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="p-3 bg-gold/10 text-gold rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Certificates</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">2</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Study Hours Line Chart */}
        <div className="bg-card border border-border p-5 sm:p-6 rounded-2xl shadow-soft">
          <h3 className="text-lg font-bold text-foreground mb-4">Study Hours This Week</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studyHoursData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px', boxShadow: 'var(--shadow-soft)' }}
                  itemStyle={{ color: 'var(--color-foreground)' }}
                />
                <Line type="monotone" dataKey="hours" stroke="var(--color-brand)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-brand)', strokeWidth: 2, stroke: 'var(--color-card)' }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Assessment Scores Bar Chart */}
        <div className="bg-card border border-border p-5 sm:p-6 rounded-2xl shadow-soft">
          <h3 className="text-lg font-bold text-foreground mb-4">Recent Assessment Scores</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assessmentScores} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} dx={-10} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px', boxShadow: 'var(--shadow-soft)' }}
                />
                <Bar dataKey="score" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Course Progress Radial/Pie (Using simple bar for better UX here, or pie) */}
        <div className="bg-card border border-border p-5 sm:p-6 rounded-2xl shadow-soft lg:col-span-1">
          <h3 className="text-lg font-bold text-foreground mb-4">Course Distribution</h3>
          <div className="h-[250px] w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseProgressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="progress"
                >
                  {courseProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px', boxShadow: 'var(--shadow-soft)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {courseProgressData.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></span>
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Course Progress List */}
        <div className="bg-card border border-border p-5 sm:p-6 rounded-2xl shadow-soft lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-foreground">Current Course Progress</h3>
            <button className="text-sm text-brand font-medium hover:underline">View All</button>
          </div>
          
          <div className="space-y-5">
            {courseProgressData.map((course, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-foreground">{course.name}</span>
                  <span className="text-muted-foreground">{course.progress}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${course.progress}%`, backgroundColor: course.fill }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
