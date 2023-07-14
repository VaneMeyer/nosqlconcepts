import React, { useState } from 'react';
import axios from 'axios'; 


const MongoQueryComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    
    axios
      .post('/api/mongodb-query', { query }) 
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error('Error with query:', error);
      });
  };

  return (
    <div>
      <div onSubmit={handleFormSubmit}>
        <input type="text" value={query} onChange={handleQueryChange} />
        <button type="submit">Run</button>
      </div>

      <div>
        {/* {results.map((result) => (
          <div key={result._id}>{result.query}</div> 
        ))} */}
        {results.map((result, index) => (
          <div key={index}>{JSON.stringify(result)}</div>
        ))}
      </div>
    </div>
  );
};

export default MongoQueryComponent;
