import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import './Card.css';

function ModuleCard({ onSave, onCancel }) {
  const [moduleName, setModuleName] = useState('');

  const handleSave = () => {
    if (moduleName.trim() !== '') {
      onSave({ name: moduleName });
      setModuleName('');
    }
  };

  return (
    <div className="card">
      <div className="card-head">
        <h4>Create New Module</h4>
        <button className="close-btn" onClick={onCancel}><RxCross1 size={18}/></button>
      </div>
      <label htmlFor="module-input">Module name</label>
      <input
        id="module-input"
        type="text"
        placeholder="Enter Module Name"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
      />
      <div className="card-buttons">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default ModuleCard;
