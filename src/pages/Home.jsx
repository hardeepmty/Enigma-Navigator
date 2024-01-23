import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      axios.get(`http://localhost:3001/api/persons?name=${searchTerm}`)
        .then(response => setSearchResult(response.data))
        .catch(error => console.error('Error fetching person:', error));
    } else {
      setSearchResult(null);
    }
  };

  return (
    <div className='card'>
      <Link to="/new"><button>Create new account</button></Link>
      <Link to="/attendance"><button>Attendance</button></Link>

      <h2 style={{ color: "white" }}>Search for Enigma member</h2>
      <div>
        <input
          type="text"
          placeholder="Enter name to search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResult && (
        <div>
          <h2>Search Result</h2>
          <ul>
            {searchResult.map(person => (
              <div className='members' style={{ color: "white", backgroundColor: "black", display: 'flex', alignItems: 'center' }} key={person._id}>
                <div>
                  <p>
                    <strong style={{ color: "white" }}>Name:</strong> {person.name}
                  </p>
                  <p>
                    <strong style={{ color: "white" }}>Domain:</strong> {person.domain}
                  </p>
                  {/* Render Github link if available */}
                  {person.github && (
                    <p>
                      <strong style={{ color: "white" }}>Github:</strong> <a href={person.github} target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>{person.github}</a>
                    </p>
                  )}
                  {/* Render LinkedIn link if available */}
                  {person.linkedin && (
                    <p>
                      <strong style={{ color: "white" }}>LinkedIn:</strong> <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>{person.linkedin}</a>
                    </p>
                  )}
                </div>
                {person.photo && (
                  <div>
                    <img src={person.photo} alt={`${person.name}'s photo`} style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} />
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
