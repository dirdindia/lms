import { useState, useEffect } from "react";
import { Check, X, Search, Filter, Loader2, UserCircle } from "lucide-react";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../context/ConfirmContext";

export default function RegistrationRequests() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fullViewImage, setFullViewImage] = useState(null);
  const { showToast } = useToast();
  const { showConfirm } = useConfirm();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/pending");
      if (res.data.success) {
        setRequests(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await api.put(`/users/${id}/status`, { status: 'approved' });
      if (res.status === 200) {
        setRequests((prev) => prev.filter(req => req._id !== id));
        if (selectedUser && selectedUser._id === id) setSelectedUser(null);
        showToast("User has been successfully approved.", 'success');
      }
    } catch (error) {
      console.error("Error approving request:", error);
      showToast("Error approving request.", 'error');
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await await api.put(`/users/${id}/status`, { status: 'rejected' });
      if (res.status === 200) {
        setRequests((prev) => prev.filter(req => req._id !== id));
        if (selectedUser && selectedUser._id === id) setSelectedUser(null);
        showToast("User has been rejected.", 'success');
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      showToast("Error rejecting request.", 'error');
    }
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
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-brand" />
                    Loading requests...
                  </td>
                </tr>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req._id} onClick={() => setSelectedUser(req)} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{req.name}</div>
                      <div className="text-sm text-gray-500">{req.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        req.role === 'teacher' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {req.role}
                      </span>
                      {req.subjectSpecialization && <div className="text-xs text-gray-500 mt-1">Subject: {req.subjectSpecialization}</div>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-amber-100 text-amber-800">
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            showConfirm({
                              title: 'Approve User',
                              message: 'Are you sure you want to approve this registration request?',
                              type: 'approve',
                              onConfirm: () => handleApprove(req._id)
                            });
                          }}
                          className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            showConfirm({
                              title: 'Reject User',
                              message: 'Are you sure you want to reject this registration request?',
                              type: 'reject',
                              onConfirm: () => handleReject(req._id)
                            });
                          }}
                          className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          Reject
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

      {/* Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold">User Details</h2>
              <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 mb-4">
                {selectedUser.profilePicture ? (
                  <img 
                    src={selectedUser.profilePicture} 
                    alt="Profile" 
                    onClick={() => setFullViewImage(selectedUser.profilePicture)}
                    className="w-16 h-16 rounded-full object-cover shadow-sm border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity" 
                  />
                ) : (
                  <UserCircle className="w-16 h-16 text-gray-300" />
                )}
                <div>
                  <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                  <p className="text-gray-500 capitalize">{selectedUser.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium capitalize">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedUser.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium capitalize">{selectedUser.gender || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{selectedUser.dob ? new Date(selectedUser.dob).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">
                    {[selectedUser.address, selectedUser.city, selectedUser.pincode].filter(Boolean).join(', ') || 'N/A'}
                  </p>
                </div>
              </div>

              {selectedUser.role === 'student' && (
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-lg font-medium mb-4">Student Info</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Class/Grade</p>
                      <p className="font-medium">{selectedUser.classGrade || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Education Board</p>
                      <p className="font-medium">{selectedUser.educationBoard || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">School Name</p>
                      <p className="font-medium">{selectedUser.schoolName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Subjects of Interest</p>
                      <p className="font-medium">{selectedUser.subjectsOfInterest || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Parent Name</p>
                      <p className="font-medium">{selectedUser.parentName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Parent Phone</p>
                      <p className="font-medium">{selectedUser.parentPhone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedUser.role === 'teacher' && (
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-lg font-medium mb-4">Teacher Info</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Highest Qualification</p>
                      <p className="font-medium">{selectedUser.highestQualification || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Subject Specialization</p>
                      <p className="font-medium">{selectedUser.subjectSpecialization || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Years of Experience</p>
                      <p className="font-medium">{selectedUser.yearsOfExperience || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Is Employed?</p>
                      <p className="font-medium">{selectedUser.isEmployed ? 'Yes' : 'No'}</p>
                    </div>
                    {selectedUser.isEmployed && (
                      <>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Employed School/Institution</p>
                          <p className="font-medium">{selectedUser.employedSchool || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Current Designation</p>
                          <p className="font-medium">{selectedUser.currentDesignation || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{selectedUser.employedLocation || 'N/A'}</p>
                        </div>
                      </>
                    )}
                    {selectedUser.resume && (
                      <div className="col-span-2 mt-2">
                        <a href={selectedUser.resume} target="_blank" rel="noreferrer" className="text-brand hover:underline font-medium">
                          View Resume
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showConfirm({
                    title: 'Reject User',
                    message: 'Are you sure you want to reject this user?',
                    type: 'reject',
                    onConfirm: () => handleReject(selectedUser._id)
                  });
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showConfirm({
                    title: 'Approve User',
                    message: 'Are you sure you want to approve this user?',
                    type: 'approve',
                    onConfirm: () => handleApprove(selectedUser._id)
                  });
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-brand text-white font-medium rounded-lg hover:bg-brand/90 transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Approve User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Image Modal */}
      {fullViewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setFullViewImage(null)}>
          <button 
            onClick={() => setFullViewImage(null)} 
            className="absolute top-6 right-6 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <img 
            src={fullViewImage} 
            alt="Full view" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

    </div>
  );
}
