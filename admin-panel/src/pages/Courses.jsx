export default function Courses() {
  const courses = [
    { id: 1, title: "Full Stack Web Development", category: "Programming", price: "$99", status: "Published", students: 1240 },
    { id: 2, title: "UI/UX Design Masterclass", category: "Design", price: "$79", status: "Published", students: 850 },
    { id: 3, title: "Advanced Python Scripting", category: "Programming", price: "$49", status: "Draft", students: 0 },
    { id: 4, title: "Digital Marketing 101", category: "Marketing", price: "$59", status: "Published", students: 430 },
    { id: 5, title: "Data Science with Pandas", category: "Data Science", price: "$89", status: "Archived", students: 120 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Courses</h1>
          <p className="text-muted-foreground mt-2">Manage all your academic courses and content.</p>
        </div>
        <button className="bg-brand text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-brand-deep transition-colors cursor-pointer shadow-sm">
          + Add Course
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">Course Title</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Students</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{course.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">{course.category}</td>
                  <td className="px-6 py-4 font-medium">{course.price}</td>
                  <td className="px-6 py-4 text-muted-foreground">{course.students.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      course.status === 'Published' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      course.status === 'Draft' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-brand hover:text-brand-deep font-medium cursor-pointer">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
