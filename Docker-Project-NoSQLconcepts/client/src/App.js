import React, { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('/users/postgres').then(res => res.json()),
      fetch('/users/mongo').then(res => res.json()),
      fetch('/users/cassandra').then(res => res.json()),
      fetch('/users/neo4j').then(res => res.json()),
    ]).then(([pg, mongo, cass, neo]) => {
      setData(neo);
      /* setData({ pg, mongo, cass, neo }); */
      
    });
  }, []);

  return (
    <div>
      <h1>Multi-DB React App</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      
      <p>test</p>
    </div>
  );
}
export default App;