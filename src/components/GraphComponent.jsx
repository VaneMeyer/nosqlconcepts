import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';

//################# Test another use case ######################################################
const GraphComponent = () => {
  const containerRef = useRef(null);
//################# useEffect Function ######################################################
  useEffect(() => {
    fetch('/bio-CE-CX-copy.edges')
      .then(response => response.text())
      .then(data => {
        const edges = data.split('\n').map(line => {
            const [from, to, weight] = line.split(' ');
            return { from, to, label: weight };  
          });

        const nodes = [...new Set(edges.flatMap(edge => [edge.from, edge.to]))].map(id => ({ id, label: id }));

        const graphData = {
          nodes,
          edges
        };

        const options = {
          
        };

        new Network(containerRef.current, graphData, options);
      });
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '600px' }}></div>;
};

export default GraphComponent;
