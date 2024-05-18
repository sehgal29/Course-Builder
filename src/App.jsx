import React, { useState, useEffect } from 'react';
import { BsPlus } from 'react-icons/bs';
import { CiDatabase } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import { LiaUploadSolid } from "react-icons/lia";
import { LiaDownloadSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImFilePdf } from "react-icons/im";
import { FiEdit3 } from "react-icons/fi";
import './App.css';
import ModuleCard from './Card'; // Ensure this path is correct
import URLCard from './URLCard'; // Ensure this path is correct
import UploadModal from './UploadModal'; // Ensure this path is correct

function App() {
  const [modules, setModules] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editModuleIndex, setEditModuleIndex] = useState(null);
  const [optionsIndex, setOptionsIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAddClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (type) => {
    setSelectedOption(type);
    setShowModal(true);
    setShowOptions(false);
  };

  const handleSave = (data) => {
    const { name, type, url, file } = data;
    if (editModuleIndex !== null) {
      const updatedModules = modules.map((module, index) =>
        index === editModuleIndex ? { ...module, name } : module
      );
      setModules(updatedModules);
      setEditModuleIndex(null);
      setShowOptions(false); // Hide options after editing
    } else {
      setModules([...modules, { name, type, url, file }]);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditModuleIndex(null);
  };

  const handleEdit = (index) => {
    setEditModuleIndex(index);
    setShowModal(true);
    setShowOptions(false); // Hide options when editing
  };

  const handleDelete = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const handleDownload = (file, name) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleOptionsMenu = (index) => {
    setOptionsIndex(optionsIndex === index ? null : index);
  };

  return (
    <>
      <div className={`nav-head ${scrolled ? 'scrolled' : ''}`}>
        <h2>Course Builder</h2>
        <button className="add-btn" onClick={handleAddClick}><BsPlus size={24} /> ADD</button>
        {showOptions && (
          <div className="dropdown">
            <div onClick={() => handleOptionClick('Create Module')}><CiDatabase /> Create Module</div>
            <div onClick={() => handleOptionClick('URL')}><FaLink /> Add a Link</div>
            <div onClick={() => handleOptionClick('Upload')}><LiaUploadSolid /> Upload</div>
          </div>
        )}
      </div>
      <div className={`content ${showModal ? 'blurred' : ''}`}>
        {modules.map((module, index) => (
          <div key={index} className="module-item">
            <div className="link-container">
              {module.type === 'URL' ? (
                <>
                  <FaLink className="link-icon" size={17} />
                  <p>Link</p>
                </>
              ) : (
                <>
                  <ImFilePdf className='pdf-icon' />
                  <div className="pdf-display">
                    <p>PDF</p>
                  </div>
                </>
              )}
              <div className="input-link">
                <span><h4>{module.name}</h4></span>
              </div>
            </div>
            <span className="options" onClick={() => toggleOptionsMenu(index)}>⋮</span>
            {optionsIndex === index && (
              <div className="options-menu">
                {module.type === 'Upload' ? (
                  <>
                    <div className="edit-btn" onClick={() => handleEdit(index)}>
                      <FiEdit3 className="edit-icon" /> Rename
                    </div>
                    
                    <div className="download-btn edit-icon" onClick={() => handleDownload(module.file, module.name)}>
                      <LiaDownloadSolid className="download-icon edit-icon" /> Download
                    </div>
                    <p className='upload-para-line'/>
                    <div className="delete-btn" onClick={() => handleDelete(index)}>
                      <RiDeleteBin6Line className="delete-icon" /> Delete
                    </div>
                  </>
                ) : (
                  <>
                    <div className="edit-btn" onClick={() => handleEdit(index)}>
                      <FiEdit3 className="edit-icon" /> Edit Module name
                    </div>
                    <div className="delete-btn" onClick={() => handleDelete(index)}>
                      <RiDeleteBin6Line className="delete-icon" /> Delete
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {showModal && selectedOption === 'Create Module' && (
        <div className="modal-overlay">
          <ModuleCard onSave={handleSave} onCancel={handleCancel} />
        </div>
      )}
      {showModal && selectedOption === 'URL' && (
        <div className="modal-overlay">
          <URLCard onSave={handleSave} onCancel={handleCancel} />
        </div>
      )}
      {showModal && selectedOption === 'Upload' && (
        <div className="modal-overlay">
          <UploadModal onSave={handleSave} onCancel={handleCancel} />
        </div>
      )}
    </>
  );
}

export default App;
