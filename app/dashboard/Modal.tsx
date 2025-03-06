// app/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  saveButtonText?: string;
  cancelButtonText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  saveButtonText = 'Save',
  cancelButtonText = 'Cancel',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-bold text-[#013C61] mb-6">{title}</h2>
        <div className="space-y-5">{children}</div>
        <div className="flex justify-end mt-6 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onSave}
            className="bg-[#2BDA53] text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            {saveButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;