import React from 'react';

function ResultsSection({ results }) {
  return (
    <section className="results-section">
      <h2>R�sultats</h2>
      {results.length === 0 && <p>Aucun r�sultat.</p>}
      {results.length > 0 && (
        <ul className="results-list">
          {results.map((result, index) => (
            <li key={index}>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ResultsSection;