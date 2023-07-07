import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CharacterDetails.css'; 

function CharacterDetails() {
    const [character, setCharacter] = useState(null);
    const [starships, setStarships] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://swapi.dev/api/people/${Number(id)}`)
        .then(response => response.json())
        .then(data => {
            setCharacter(data);
            const starshipPromises = data.starships.map(starshipUrl => {
                const starshipId = starshipUrl.match(/\/([0-9]*)\/$/)[1];
                return fetch(starshipUrl)
                .then(response => response.json())
                .then(data => ({id: starshipId, name: data.name}));
            });
            Promise.all(starshipPromises).then(tempStarships => setStarships(tempStarships));
        })
        .catch(error => console.error(error));
    }, [id]);
    
    

    return (
        <div className='character-details'>
            {character && (
                <>
                    <h1>{character.name}</h1>
                    <p>Eye Color: {character.eye_color}</p>
                    <p>Birth Year: {character.birth_year}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Starships: {starships.map(starship => <Link key={starship.id} to={`/starship/${starship.id}`}>{starship.name}</Link>).reduce((prev, curr, index) => index !== 0 ? [prev, ', ', curr] : [curr], [])}</p>
                    <p>Created: {new Date(character.created).toLocaleString()}</p>
                    <p>Edited: {new Date(character.edited).toLocaleString()}</p>
                    <Link to="/" className="back-button">Retour à la recherche</Link>
                </>
            )}
        </div>
    );
}

export default CharacterDetails;
