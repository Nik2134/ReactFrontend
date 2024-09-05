import React, { useState } from 'react';
import MapComponent from './MapComponent';

const SearchPage = () => {
    const [id, setId] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [campNumber, setCampNumber] = useState('');
    const [name, setName] = useState('');
    const [pilgrims, setPilgrims] = useState([]);
    const [error, setError] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handleSearch = () => {
        let query = '';
        if (id) query += `id=${id}&`;
        if (passportNumber) query += `passportNumber=${passportNumber}&`;
        if (campNumber) query += `campNumber=${campNumber}&`;
        if (name) query += `name=${name}&`;

        if (!query) {
            setError('Please enter at least one search criterion.');
            return;
        }

        fetch(`http://localhost:8080/api/pilgrims/search?${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPilgrims(data);
                setError(null);
                setSearchPerformed(true);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError('Failed to fetch pilgrim details. Please try again later.');
                setPilgrims([]);
                setSearchPerformed(true);
            });
    };

    return (
        <div>
            <h1>Search Pilgrims</h1>
            <input
                type="number"
                placeholder="Enter pilgrim ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter passport number"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter camp number"
                value={campNumber}
                onChange={(e) => setCampNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {searchPerformed && pilgrims.length > 0 ? (
                <ul>
                    {pilgrims.map(pilgrim => (
                        <li key={pilgrim.pilgrimId}>
                            <p><strong>ID:</strong> {pilgrim.pilgrimId}</p>
                            <p><strong>First Name:</strong> {pilgrim.firstName}</p>
                            <p><strong>Last Name:</strong> {pilgrim.lastName}</p>
                            <p><strong>Passport Number:</strong> {pilgrim.passportNumber}</p>
                            <p><strong>Nationality:</strong> {pilgrim.nationality}</p>
                            <p><strong>Contact Number:</strong> {pilgrim.contactNumber}</p>
                            <p><strong>Emergency Contact:</strong> {pilgrim.emergencyContact}</p>
                            <p><strong>Camp Number:</strong> {pilgrim.campNumber}</p>
                            <p><strong>Itinerary ID:</strong> {pilgrim.itineraryId}</p>
                            <h3>Current Location</h3>
                            {pilgrim.currentLocation ? (
                                <MapComponent geoJsonData={pilgrim.currentLocation} />
                            ) : (
                                <p>No location data available</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                searchPerformed && <p>No pilgrims found matching the criteria.</p>
            )}
        </div>
    );
};

export default SearchPage;
