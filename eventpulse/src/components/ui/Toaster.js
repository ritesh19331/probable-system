import React, { useState, useEffect } from 'react';

const Toast = ({ id, type, title, message, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [id, onClose, duration]);
  
  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'info':
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700';
    }
  };
  
  return (
    <div className={`border-l-4 ${getTypeClasses()} p-4 rounded shadow-md w-full`}>
      <div className="flex justify-between">
        <div className="font-medium">{title}</div>
        <button
          onClick={() => onClose(id)}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
      {message && <div className="text-sm mt-1">{message}</div>}
    </div>
  );
};

const ToastContext = React.createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, ...toast }]);
    return id;
  };
  
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };
  
  const clearToasts = () => {
    setToasts([]);
  };
  
  const contextValue = {
    addToast,
    removeToast,
    clearToasts,
  };
  
  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToasts() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToasts must be used within a ToastProvider');
  }
  return context;
}

// Default Toaster component that uses the ToastProvider
export default function Toaster() {
  return null;
}