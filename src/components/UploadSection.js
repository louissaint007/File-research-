import React from 'react';

function UploadSection({ onFilesUpload, onSearchChange, onSearch, searchQuery, isSearching }) {
  return (
    <section className="upload-section">
      <div className="upload-controls">
        <label className="upload-label">
          Sélectionnez un dossier :
          <input
            type="file"
            webkitdirectory="true"
            directory="true"
            multiple
            onChange={onFilesUpload}
          />
        </label>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={onSearchChange} 
          placeholder="Mot ou phrase à rechercher"
          className="search-input"
        />
        <button onClick={onSearch} disabled={!searchQuery || isSearching}>
          Rechercher
        </button>
      </div>
      {isSearching && 
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Recherche en cours...</p>
        </div>
      }
    </section>
  );
}

export default UploadSection;