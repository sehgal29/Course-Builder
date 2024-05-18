import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import './URLCard.css';

function URLCard({ onSave, onCancel }) {
  const [url, setUrl] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSave = () => {
    if (url.trim() !== '' && displayName.trim() !== '') {
      onSave({ name: displayName, type: 'Link', url: url });
      setUrl('');
      setDisplayName('');
    }
  };

  return (
    <div className="card">
      <div className="card-head">
        <h4>Adding URL</h4>
        <button className="close-btn" onClick={onCancel}><RxCross1 size={18}/></button>
      </div>
      <label htmlFor="url">URL</label>
      <input
        id="url"
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <label htmlFor="displayName">Display Name</label>
      <input
        id="displayName"
        type="text"
        placeholder="Enter Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <div className="card-buttons">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default URLCard;
