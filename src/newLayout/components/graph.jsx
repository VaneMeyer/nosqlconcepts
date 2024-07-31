import React, { useState } from 'react';
import Graph from 'react-graph-vis';
import { Container, Typography, List, ListItem, Paper, Divider } from '@mui/material';

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  },
  physics: {
    enabled: false,
  },
};

function randomColor() {
  const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

const NeoGraphC = () => {
  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: [
        { id: 1, label: "Department 1", color: "#ebedad", fields: ["depID", "location", "depname"] },
        { id: 2, label: "Department 2", color: "#ebedad", fields: ["depID", "location", "depname"] },
        { id: 3, label: "Person 1", color: "#34ebe1", fields: ["userId", "firstname", "email_address", "middlename", "depID", "salary", "lastname"] },
        { id: 4, label: "Person 2", color: "#34ebe1", fields: ["userId", "firstname", "email_address", "middlename", "depID", "salary", "lastname"] },
        { id: 5, label: "Person 3", color: "#34ebe1", fields: ["userId", "firstname", "email_address", "middlename", "depID", "salary", "lastname"] },
        { id: 6, label: "Email 1", color: "#e897f0", fields: ["email_date", "emailId"] },
        { id: 7, label: "Email 2", color: "#e897f0", fields: ["email_date", "emailId"] },
        { id: 8, label: "Email 3", color: "#e897f0", fields: ["email_date", "emailId"] }
      ],
      edges: [
        { from: 3, to: 1, label: "WORKS_IN" },
        { from: 3, to: 5, label: "KNOWS" },
        { from: 3, to: 8, label: "EMAIL_FROM" },
        { from: 6, to: 3, label: "EMAIL_TO" },
        { from: 4, to: 7, label: "EMAIL_FROM" },
        { from: 4, to: 2, label: "WORKS_IN" },
        { from: 4, to: 3, label: "KNOWS" },
        { from: 8, to: 4, label: "EMAIL_CC" },
        { from: 5, to: 2, label: "WORKS_IN" },
        { from: 8, to: 5, label: "EMAIL_TO" }
      ]
    },
    selectedNodeFields: []
  });

  const createNode = (x, y) => {
    const color = randomColor();
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [
            ...nodes,
            { id, label: `Node ${id}`, color, x, y }
          ],
          edges: [
            ...edges,
            { from, to: id }
          ]
        },
        counter: id,
        ...rest
      }
    });
  };

  const handleSelect = ({ nodes }) => {
    if (nodes.length > 0) {
      const selectedNode = state.graph.nodes.find(node => node.id === nodes[0]);
      if (selectedNode) {
        setState(prevState => ({
          ...prevState,
          selectedNodeFields: selectedNode.fields
        }));
      }
    }
  };

  const { graph, selectedNodeFields } = state;

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Graph Overview
      </Typography>
      <Paper elevation={3} style={{ padding: 10, marginBottom: 10 }}>
        <Graph
          graph={graph}
          options={options}
          events={{ select: handleSelect }}
          style={{ height: "300px", width: "100%" }}
        />
      </Paper>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          Selected Node Properties:
        </Typography>
        <List>
          {selectedNodeFields.length > 0 ? (
            selectedNodeFields.map((field, index) => (
              <React.Fragment key={index}>
                <ListItem>{field}</ListItem>
                {index < selectedNodeFields.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <ListItem>No node selected</ListItem>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default NeoGraphC;
