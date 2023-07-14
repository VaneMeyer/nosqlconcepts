import React, { useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const handleClick = async () => {
    try {
      const response = await axios.get('/api/movies'); // Passe die API-Route entsprechend deiner Backend-Konfiguration an
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Filme anzeigen</button>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
