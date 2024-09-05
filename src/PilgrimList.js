import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PilgrimList = () => {
  const [pilgrims, setPilgrims] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPilgrims, setFilteredPilgrims] = useState([]);

  useEffect(() => {
    fetch('/api/pilgrims/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Convert response to JSON
      })
      .then(data => {
        console.log('Fetched Pilgrims:', data);
        setPilgrims(data);
        setFilteredPilgrims(data); // Initialize with all data
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to fetch pilgrim data. Please try again later.');
      });
  }, []);

  const handleSearch = () => {
    console.log('Search button clicked');
    console.log('Search term:', searchTerm);

    const filtered = pilgrims.filter(pilgrim =>
      pilgrim.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pilgrim.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pilgrim.passportNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log('Filtered Pilgrims:', filtered);

    setFilteredPilgrims(filtered);
  };

  return (
    <div>
      <h1>Pilgrim List</h1>
      <input
        type="text"
        placeholder="Search Pilgrims"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {filteredPilgrims.length > 0 ? (
          filteredPilgrims.map(pilgrim => (
            <li key={pilgrim.pilgrimId}>
              <Link to={`/pilgrims/${pilgrim.pilgrimId}`}>
                {pilgrim.firstName} {pilgrim.lastName} - {pilgrim.passportNumber}
              </Link>
            </li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
};

export default PilgrimList;
