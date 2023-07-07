import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './StarshipDetails.css';

function StarshipDetails() {
    const [starship, setStarship] = useState(null);
    const [pilots, setPilots] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://swapi.dev/api/starships/${Number(id)}`)
            .then(response => response.json())
            .then(data => {
                setStarship(data);
                const pilotPromises = data.pilots.map(pilotUrl => {
                    const pilotId = pilotUrl.match(/\/([0-9]*)\/$/)[1];
                    return fetch(pilotUrl)
                        .then(response => response.json())
                        .then(data => ({ id: pilotId, name: data.name }));
                });
                Promise.all(pilotPromises).then(tempPilots => setPilots(tempPilots));
            })
            .catch(error => console.error(error));
    }, [id]);

    return (
        <div>
            {starship && (
                <>
                    <h1>{starship.name}</h1>
                    <p>Model: {starship.model}</p>
                    <p>Manufacturer: {starship.manufacturer}</p>
                    <p>Pilots: {pilots.map(pilot => <Link key={pilot.id} to={`/character/${pilot.id}`}>{pilot.name}</Link>).reduce((prev, curr, index) => index !== 0 ? [prev, ', ', curr] : [curr], [])}</p>
                    <Link to="/" className="back-button">Retour à la recherche</Link>
                </>
            )}
        </div>
        
    );
    
}

export default StarshipDetails;
