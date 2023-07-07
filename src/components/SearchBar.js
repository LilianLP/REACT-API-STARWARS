import React from 'react';

function SearchBar({ onSearch }) {
    return (
        <input className='searchbar' type="text" onChange={(event) => onSearch(event.target.value)} placeholder="Search characters..." />
    );
}

export default SearchBar;
