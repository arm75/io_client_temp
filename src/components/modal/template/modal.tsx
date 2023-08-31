import React, { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  actionFn?:() => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null; // Render nothing if the modal is closed
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center">
    <div className="fixed inset-0 bg-black opacity-75"/>

    <div className="fixed bg-white rounded-lg p-4 opacity-300 z-50">
        <div>
            {children}
        </div>
        <div>
            <button className="green-button" onClick={onClose}>Close</button>
            <button className="green-button">Do Something</button>    
        </div>       
    </div>    
    </div>
  );
};

export default Modal;
