import { createContext, useContext, useState } from 'react';
import { Check } from 'lucide-react';

const ToastContext = createContext({ showToast: () => {} });

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState('');

  const showToast = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {message && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white/20 p-1 rounded-full">
            <Check className="w-4 h-4" />
          </div>
          <p className="font-medium">{message}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
};
