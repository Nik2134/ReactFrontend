import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function PilgrimDetails({ pilgrimId }) {
    const [pilgrim, setPilgrim] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch Pilgrim data by ID
       // fetch(`http://localhost:8080/api/pilgrims/${pilgrimId}`)
       fetch(`http://localhost:8080/api/pilgrims/all`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setPilgrim(data))
            .catch(error => setError(error));
    }, [pilgrimId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!pilgrim) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Pilgrim Details</h2>
            <p><strong>Pilgrim ID:</strong> {pilgrim.pilgrimId}</p>
            <p><strong>User ID:</strong> {pilgrim.userId}</p>
            <p><strong>Name:</strong> {pilgrim.firstName} {pilgrim.lastName}</p>
            <p><strong>Passport Number:</strong> {pilgrim.passportNumber}</p>
            <p><strong>Nationality:</strong> {pilgrim.nationality}</p>
            <p><strong>Contact Number:</strong> {pilgrim.contactNumber}</p>
            <p><strong>Emergency Contact:</strong> {pilgrim.emergencyContact}</p>
            <p><strong>Camp Number:</strong> {pilgrim.campNumber}</p>
            <p><strong>Itinerary ID:</strong> {pilgrim.itineraryId}</p>

            {pilgrim.currentLocation && (
                <>
                    <h3>Current Location</h3>
                    <MapContainer 
                        center={[pilgrim.currentLocation.coordinates[1], pilgrim.currentLocation.coordinates[0]]} 
                        zoom={13} 
                        style={{ height: "400px", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[pilgrim.currentLocation.coordinates[1], pilgrim.currentLocation.coordinates[0]]}>
                            <Popup>
                                {pilgrim.firstName} {pilgrim.lastName}'s Location
                            </Popup>
                        </Marker>
                    </MapContainer>
                </>
            )}
        </div>
    );
}

export default PilgrimDetails;
