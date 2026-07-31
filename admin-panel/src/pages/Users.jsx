export default function Users() {
  const users = [
    { id: 1, name: "Amit Kumar", email: "amit.k@example.com", role: "Student", joinDate: "2026-05-12", status: "Active" },
    { id: 2, name: "Priya Singh", email: "priya.s@example.com", role: "Tutor", joinDate: "2025-11-23", status: "Active" },
    { id: 3, name: "Rohan Das", email: "rohan.d@example.com", role: "Student", joinDate: "2026-06-10", status: "Inactive" },
    { id: 4, name: "Sneha Patel", email: "sneha.p@example.com", role: "Admin", joinDate: "2024-01-05", status: "Active" },
    { id: 5, name: "Vikram Sharma", email: "vikram.s@example.com", role: "Student", joinDate: "2026-07-28", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Users & Roles</h1>
          <p className="text-muted-foreground mt-2">Manage all registered students, tutors, and administrators.</p>
        </div>
        <button className="bg-brand text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-brand-deep transition-colors cursor-pointer shadow-sm">
          + Add User
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Join Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      'bg-destructive/10 text-destructive dark:bg-destructive/20'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-brand hover:text-brand-deep font-medium cursor-pointer">Manage</button>
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
