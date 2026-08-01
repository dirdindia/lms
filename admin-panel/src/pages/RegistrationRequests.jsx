import { useState } from "react";
import { Check, X, Search, Filter } from "lucide-react";

const initialRequests = [
  { id: 1, name: "Rahul Kumar", email: "rahul.k@example.com", role: "Student", date: "2023-10-25", status: "Pending" },
  { id: 2, name: "Priya Sharma", email: "priya.s@example.com", role: "Teacher", date: "2023-10-26", status: "Pending", subject: "Mathematics" },
  { id: 3, name: "Amit Singh", email: "amit.s@example.com", role: "Student", date: "2023-10-27", status: "Pending" },
];

export default function RegistrationRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");

  const handleApprove = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    // In a real app, you would make an API call here to approve the user
    console.log(`Approved request ${id}`);
  };

  const handleReject = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    // In a real app, you would make an API call here to reject the user
    console.log(`Rejected request ${id}`);
  };

  const filteredRequests = requests.filter(req => 
    req.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    req.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Registration Requests</h1>
          <p className="text-gray-500">Approve or reject new student and teacher registrations.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role Details</th>
                <th className="px-6 py-4 font-medium">Date Applied</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{req.name}</div>
                      <div className="text-sm text-gray-500">{req.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        req.role === 'Teacher' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {req.role}
                      </span>
                      {req.subject && <div className="text-xs text-gray-500 mt-1">Subject: {req.subject}</div>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {req.date}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleApprove(req.id)}
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Approve"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleReject(req.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="Reject"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No registration requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
