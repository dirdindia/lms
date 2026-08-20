import React, { useState, useEffect } from 'react';
import { Mail, Search, Trash2, Eye, X, CheckCircle } from 'lucide-react';
import api from '../utils/api';

export default function ContactInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    // Simulated fetch or actual fetch if API is ready
    const fetchInquiries = async () => {
      try {
        const { data } = await api.get('/contacts');
        setInquiries(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    setRemarks(inquiry.remarks || '');
    setIsModalOpen(true);
    // Mark as read immediately when viewed
    if (inquiry.status === 'unread') {
      updateInquiry(inquiry._id, { status: 'read' });
    }
  };

  const updateInquiry = async (id, data) => {
    try {
      await api.put(`/contacts/${id}`, data);
      setInquiries(inquiries.map(inq => inq._id === id ? { ...inq, ...data } : inq));
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const handleSaveRemarks = async () => {
    await updateInquiry(selectedInquiry._id, { remarks });
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await api.delete(`/contacts/${id}`);
        setInquiries(inquiries.filter(inq => inq._id !== id));
      } catch (error) {
        console.error('Error deleting inquiry:', error);
      }
    }
  };

  const filteredInquiries = inquiries.filter(inq => 
    (inq.name && inq.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (inq.mobile && inq.mobile.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (inq.class && inq.class.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contact Inquiries</h1>
          <p className="text-muted-foreground">Manage messages from the Contact Us form.</p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search inquiries..."
            className="w-full rounded-md border border-border bg-background pl-9 pr-4 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Mobile</th>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Remarks</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">
                    Loading inquiries...
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className={`hover:bg-muted/50 ${inquiry.status === 'unread' ? 'font-semibold' : ''}`}>
                    <td className="px-4 py-3">{inquiry.name}</td>
                    <td className="px-4 py-3">{inquiry.mobile}</td>
                    <td className="px-4 py-3">{inquiry.class}</td>
                    <td className="px-4 py-3">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 max-w-[150px] truncate text-muted-foreground" title={inquiry.remarks}>
                      {inquiry.remarks || '-'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {inquiry.status === 'read' && (
                          <span className="flex items-center text-xs text-green-600 mr-2" title="Marked as read">
                            <CheckCircle className="h-4 w-4 mr-1" /> Read
                          </span>
                        )}
                        <button 
                          onClick={() => handleView(inquiry)}
                          className="rounded p-1 text-brand hover:bg-brand/10 transition-colors" 
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(inquiry._id)}
                          className="rounded p-1 text-destructive hover:bg-destructive/10 transition-colors" 
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-xl font-bold">Inquiry Details</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 hover:bg-muted text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-sm">{selectedInquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mobile</p>
                  <p className="text-sm">{selectedInquiry.mobile}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Class</p>
                  <p className="text-sm">{selectedInquiry.class}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Language</p>
                  <p className="text-sm">{selectedInquiry.language}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="text-sm">{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Message</p>
                <p className="mt-1 rounded-md bg-muted p-3 text-sm whitespace-pre-wrap">
                  {selectedInquiry.message || 'No message provided.'}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Admin Remarks</p>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-brand"
                  placeholder="Add notes about your conversation..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md px-4 py-2 text-sm font-medium border border-border hover:bg-muted"
              >
                Close
              </button>
              <button
                onClick={handleSaveRemarks}
                className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand/90"
              >
                Save Remarks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
