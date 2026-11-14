import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X, 
  HelpCircle 
} from 'lucide-react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info', // 'info' | 'success' | 'warning' | 'danger'
    confirmText: 'Lanjutkan',
    cancelText: 'Batal',
    onConfirm: null,
    onCancel: null,
    showCancel: false,
  });

  const [toasts, setToasts] = useState([]);

  // Show a professional modal (alert or confirm)
  const showModal = useCallback(({
    title,
    message,
    type = 'info',
    confirmText = 'OK',
    cancelText = 'Batal',
    onConfirm = null,
    showCancel = false,
  }) => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        title,
        message,
        type,
        confirmText,
        cancelText,
        showCancel,
        onConfirm: () => {
          setModalState((prev) => ({ ...prev, isOpen: false }));
          if (onConfirm) onConfirm();
          resolve(true);
        },
        onCancel: () => {
          setModalState((prev) => ({ ...prev, isOpen: false }));
          resolve(false);
        },
      });
    });
  }, []);

  const confirmAction = useCallback(({
    title = 'Konfirmasi Tindakan',
    message,
    type = 'warning',
    confirmText = 'Ya, Lanjutkan',
    cancelText = 'Batal',
  }) => {
    return showModal({
      title,
      message,
      type,
      confirmText,
      cancelText,
      showCancel: true,
    });
  }, [showModal]);

  // Toast notifications for instant feedback
  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const closeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={32} color="#10b981" />;
      case 'danger':
        return <AlertCircle size={32} color="#ef4444" />;
      case 'warning':
        return <AlertTriangle size={32} color="#f59e0b" />;
      default:
        return <Info size={32} color="#2563eb" />;
    }
  };

  return (
    <ModalContext.Provider value={{ showModal, confirmAction, showToast }}>
      {children}

      {/* Modern Center Modal Popup */}
      {modalState.isOpen && (
        <div className="popup-backdrop animate-fade-in" onClick={modalState.onCancel}>
          <div 
            className="popup-dialog animate-scale-up" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button 
              className="popup-close-btn" 
              onClick={modalState.onCancel}
              title="Tutup"
            >
              <X size={18} />
            </button>

            <div className={`popup-icon-wrapper popup-${modalState.type}`}>
              {getIcon(modalState.type)}
            </div>

            <div className="popup-content">
              <h3 className="popup-title">{modalState.title}</h3>
              <p className="popup-message">{modalState.message}</p>
            </div>

            <div className="popup-actions">
              {modalState.showCancel && (
                <button
                  type="button"
                  className="btn btn-secondary popup-btn"
                  onClick={modalState.onCancel}
                >
                  {modalState.cancelText}
                </button>
              )}
              <button
                type="button"
                className={`btn popup-btn ${modalState.type === 'danger' ? 'btn-danger' : 'btn-primary'}`}
                onClick={modalState.onConfirm}
                autoFocus
              >
                {modalState.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Modern Toast Stack */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-card toast-${toast.type} animate-slide-left`}>
            <div className="toast-icon">
              {toast.type === 'success' && <CheckCircle2 size={18} color="#10b981" />}
              {toast.type === 'danger' && <AlertCircle size={18} color="#ef4444" />}
              {toast.type === 'warning' && <AlertTriangle size={18} color="#f59e0b" />}
              {toast.type === 'info' && <Info size={18} color="#2563eb" />}
            </div>
            <div className="toast-message">{toast.message}</div>
            <button className="toast-close" onClick={() => closeToast(toast.id)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

