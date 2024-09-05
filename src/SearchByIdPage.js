import React, { useState } from 'react';
import MapComponent from './MapComponent';

const SearchByIdPage = () => {
    const [id, setId] = useState('');
    const [pilgrim, setPilgrim] = useState(null);
    const [error, setError] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handleSearch = () => {
        if (!id) {
            setError('Please enter a pilgrim ID.');
            return;
        }

        fetch(`http://localhost:8080/api/pilgrims/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPilgrim(data);
                setError(null);
                setSearchPerformed(true); // Set this to true after a successful search
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError('Failed to fetch pilgrim details. Please try again later.');
                setPilgrim(null);
                setSearchPerformed(true); // Set this to true after a failed search
            });
    };

    return (
        <div>
            <h1>Search Pilgrim by ID</h1>
            <input
                type="number"
                placeholder="Enter pilgrim ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {searchPerformed && pilgrim ? (
                <div>
                    <h2>Pilgrim Details</h2>
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
                </div>
            ) : (
                searchPerformed && <p>No pilgrim found with ID {id}</p>
            )}
        </div>
    );
};

export default SearchByIdPage;
