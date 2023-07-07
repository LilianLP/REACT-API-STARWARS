import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import SearchBar from './components/SearchBar';
import CharacterDetails from './components/CharacterDetails';
import StarshipDetails from './components/StarshipDetails';

function App() {
  const [search, setSearch] = useState('');

  return (
    <Router>
      <div className="App">
        <SearchBar onSearch={setSearch} />
        <Routes>
          <Route path="/" element={<CharacterList search={search} />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/starship/:id" element={<StarshipDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
