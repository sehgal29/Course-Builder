import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import './UploadModal.css';

function UploadModal({ onSave, onCancel }) {
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [showForm, setShowForm] = useState(true);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSave = () => {
    if (file && displayName.trim() !== '') {
      onSave({ name: displayName, type: 'Upload', file: file });
      setFile(null);
      setDisplayName('');
      setShowForm(true);
    }
  };

  const handleUploadClick = () => {
    setShowForm(false);
  };

  const handleCancel = () => {
    onCancel();
    setShowForm(true);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-head">
          <h4>Upload File</h4>
          <button className="close-btn" onClick={handleCancel}><RxCross1 size={18} /></button>
        </div>
        {showForm ? (
          <>
            <input type="file" onChange={handleFileChange} />
            <div className="modal-buttons">
              <button onClick={handleCancel} className='upload-cancel'>Cancel</button>
              <button onClick={handleUploadClick} className='upload-save'>Upload</button>
            </div>
          </>
        ) : (
          <div className="card">
            <div className="card-head">
              <h4>Create New Upload</h4>
              <button className="close-btn" onClick={handleCancel}><RxCross1 size={18} /></button>
            </div>
            <label htmlFor="displayName">Display Name</label>
            <input
              id="displayName"
              type="text"
              placeholder="Enter Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <div className="card-buttons">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadModal;
