import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CharacterList.css';

function CharacterList({ search }) {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch('https://swapi.dev/api/people/')
        .then(response => response.json())
        .then(data => setCharacters(data.results))
        .catch(error => console.error(error));
    }, []);

    return (
        <div className='character'> 
            {characters.filter(character => character.name.toLowerCase().includes(search.toLowerCase())).map((character, index) => (
                <div key={index}>
                    <Link to={`/character/${index + 1}`}>
                        {character.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default CharacterList;
