import React, { useState } from 'react';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultsSection';

function App() {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleFilesUpload = (event) => {
    const fileList = event.target.files;
    const filesArray = [];
    for (let i = 0; i < fileList.length; i++) {
      filesArray.push(fileList[i]);
    }
    setFiles(filesArray);
    setResults([]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery || files.length === 0) {
      return;
    }
    setIsSearching(true);
    setResults([]);
    const foundResults = [];
    for (const file of files) {
      try {
        const textContent = await readFileAsText(file);
        if (textContent.includes(searchQuery)) {
          foundResults.push({
            name: file.name,
            url: URL.createObjectURL(file)
          });
        }
      } catch (err) {
        console.error('Erreur de lecture fichier:', file.name, err);
      }
    }
    setResults(foundResults);
    setIsSearching(false);
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Recherche de mots/phrases dans un dossier</h1>
        <p>Uploader un dossier, saisir le texte à rechercher et lancer la recherche.</p>
      </header>
      <main className="main">
        <UploadSection 
          onFilesUpload={handleFilesUpload} 
          onSearchChange={handleSearchChange} 
          onSearch={handleSearch}
          searchQuery={searchQuery}
          isSearching={isSearching}
        />
        <ResultsSection results={results} />
      </main>
      <footer className="footer">
        <p>©2024 MonSite. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;