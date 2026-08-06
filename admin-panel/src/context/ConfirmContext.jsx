import { createContext, useContext, useState } from 'react';
import { Check, X, Loader2, AlertTriangle } from 'lucide-react';

const ConfirmContext = createContext({ showConfirm: () => {} });

export const useConfirm = () => {
  return useContext(ConfirmContext);
};

export const ConfirmProvider = ({ children }) => {
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'approve', // 'approve', 'reject', 'warning'
    onConfirm: null,
  });
  
  const [loading, setLoading] = useState(false);

  const showConfirm = (options) => {
    setDialog({
      isOpen: true,
      title: options.title || 'Confirm Action',
      message: options.message || 'Are you sure?',
      type: options.type || 'warning',
      onConfirm: options.onConfirm,
    });
  };

  const closeDialog = () => {
    if (!loading) {
      setDialog((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleConfirm = async () => {
    if (dialog.onConfirm) {
      setLoading(true);
      try {
        await dialog.onConfirm();
      } catch (error) {
        console.error("Confirmation action failed:", error);
      } finally {
        setLoading(false);
        setDialog((prev) => ({ ...prev, isOpen: false }));
      }
    } else {
      closeDialog();
    }
  };

  return (
    <ConfirmContext.Provider value={{ showConfirm }}>
      {children}

      {dialog.isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" 
          onClick={closeDialog}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 
                ${dialog.type === 'approve' ? 'bg-green-100 text-green-600' : ''}
                ${dialog.type === 'reject' ? 'bg-red-100 text-red-600' : ''}
                ${dialog.type === 'warning' ? 'bg-amber-100 text-amber-600' : ''}
              `}>
                {dialog.type === 'approve' && <Check className="w-8 h-8" />}
                {dialog.type === 'reject' && <X className="w-8 h-8" />}
                {dialog.type === 'warning' && <AlertTriangle className="w-8 h-8" />}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{dialog.title}</h3>
              <p className="text-gray-500">{dialog.message}</p>
            </div>
            <div className="p-4 bg-gray-50 flex justify-between items-center gap-3 border-t border-gray-100">
              <button
                onClick={closeDialog}
                disabled={loading}
                className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`flex items-center justify-center gap-2 px-4 py-2 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                  ${dialog.type === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
                  ${dialog.type === 'reject' ? 'bg-red-600 hover:bg-red-700' : ''}
                  ${dialog.type === 'warning' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                `}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};
