import React, { useState } from 'react';
import { FaLink } from "react-icons/fa6";
import { ImFilePdf } from "react-icons/im";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

function DisplayComponent({ items, onRename, onDelete, onDownload }) {
  const [isEditing, setIsEditing] = useState(null);
  const [newName, setNewName] = useState('');

  const handleRename = (item) => {
    if (newName.trim() !== '') {
      onRename(item, newName);
      setIsEditing(null);
      setNewName('');
    }
  };

  return (
    <div className="display-container">
      {items.map((item, index) => (
        <div key={index} className="display-item">
          <div className="display-item-head">
            <h4>{item.name}</h4>
            {item.type === 'URL' && (
              <>
                <FaLink className="link-icon" />
                <p>Link</p>
              </>
            )}
            {item.type === 'Upload' && (
              <>
                <ImFilePdf className="file-icon" />
                <p>PDF</p>
                <div className="file-actions">
                  <button onClick={() => setIsEditing(item)}>Rename</button>
                  <button onClick={() => onDownload(item)}>Download</button>
                  <button onClick={() => onDelete(item)}>Delete</button>
                </div>
                {isEditing === item && (
                  <div className="rename-section">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="New Name"
                    />
                    <button onClick={() => handleRename(item)}>Save</button>
                    <button onClick={() => setIsEditing(null)}>Cancel</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayComponent;
