import React from 'react';
import "./SkipConfirmationModal.css"

const SkipConfirmationModal = ({ 
  isOpen, 
  onConfirm, 
  onCancel,
  countryName 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="skip-confirmation-modal">
        <h3>Would you like to take a short quiz?</h3>
        <p>This is a fun way to test your basic knowlegde on {countryName}</p>
        
        <div className="modal-actions">
          <button 
            className="cancel-button"
            onClick={onCancel}
          >
            Take Quiz
          </button>
          <button 
            className="confirm-button"
            onClick={onConfirm}
          >
            Skip Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipConfirmationModal;