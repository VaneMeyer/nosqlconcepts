import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Graph from "react-graph-vis";
import { Divider, List, ListItem, Paper, Typography } from "@mui/material";

const ResultGraph = ({ queryResult, onGetNodeAndEdgeCount }) => {
  queryResult = queryResult.slice(0, 25);

  //################# State Variables ######################################################
  const [stateNodes, setNodes] = useState([]);
  const [stateEdges, setEdges] = useState([]);
  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: [],
      edges: [],
    },
    selectedNodeFields: []
  });

  //################# Main Functionality to get nodes and edges ######################################################
  const nodesarr = [];
  const edgesarr = [];
  const nodes = [];
  const edges = [];
  const nodeIdArray = []; // Use an Array to keep track of unique node IDs
  const edgeIdArray = [];
  let nodeId = "";
  let edgeId = "";

  try {
    if (queryResult) {
      queryResult.forEach((pathItem) => {
        const pathKeys = Object.keys(pathItem);
        if (pathKeys.length === 1) {
          const path = pathItem[pathKeys[0]];
          if (path && path.segments) {
            path.segments.forEach((segment) => {
              const startNode = segment.start;
              const endNode = segment.end;
              const relationship = segment.relationship;

              const startNodeId = startNode.identity.low;
              const endNodeId = endNode.identity.low;

              const startNodeLabel = Object.values(startNode.properties)[0];
              const endNodeLabel = Object.values(endNode.properties)[0];

              if (!nodes.find((node) => node.id === startNodeId)) {
                nodes.push({
                  id: startNodeId,
                  label: startNodeLabel,
                  properties: startNode.properties
                });
              }

              if (!nodes.find((node) => node.id === endNodeId)) {
                nodes.push({
                  id: endNodeId,
                  label: endNodeLabel,
                  properties: endNode.properties
                });
              }

              edges.push({
                from: startNodeId,
                to: endNodeId,
                label: relationship.type,
              });
            });
          } else {
            queryResult.forEach((resultItem) => {
              if (resultItem) {
                Object.values(resultItem).forEach((obj) => {
                  if (obj.start && obj.end) {
                    edgesarr.push(obj);
                  } else {
                    nodesarr.push(obj);
                  }
                });

                nodesarr.forEach((node) => {
                  nodeId = node.identity.low;

                  if (!nodeIdArray.includes(nodeId)) {
                    nodes.push({
                      id: nodeId,
                      label: Object.values(node.properties)[0],
                      properties: node.properties
                    });
                    nodeIdArray.push(nodeId);
                  }
                });

                edgesarr.forEach((edge) => {
                  edgeId = edge.identity;
                  if (!edgeIdArray.includes(edgeId)) {
                    edges.push({
                      from: edge.start.low,
                      to: edge.end.low,
                      label: edge.type,
                    });
                    edgeIdArray.push(edgeId);
                  }
                });
              }
            });
          }
        } else {
          queryResult.forEach((resultItem) => {
            if (resultItem) {
              Object.values(resultItem).forEach((obj) => {
                if (obj.start && obj.end) {
                  edgesarr.push(obj);
                } else {
                  nodesarr.push(obj);
                }
              });

              nodesarr.forEach((node) => {
                nodeId = node.identity.low;
                if (!nodeIdArray.includes(nodeId)) {
                  nodes.push({
                    id: nodeId,
                    label: Object.values(node.properties)[0],
                    properties: node.properties
                  });
                  nodeIdArray.push(nodeId);
                }
              });

              edgesarr.forEach((edge) => {
                edgeId = edge.identity;
                if (!edgeIdArray.includes(edgeId)) {
                  edges.push({
                    from: edge.start.low,
                    to: edge.end.low,
                    label: edge.type,
                  });
                  edgeIdArray.push(edgeId);
                }
              });
            }
          });
        }
      });
    }
  } catch (error) {
    // Handle error
  }

  //################# handle Functions and other ######################################################
  const handleSelect = ({ nodes }) => {
    if (nodes.length > 0) {
      const selectedNode = graphData.nodes.find(node => node.id === nodes[0]);
      if (selectedNode) {
        setState(prevState => ({
          ...prevState,
          selectedNodeFields: Object.entries(selectedNode.properties).map(([key, value]) => `${key}: ${value}`)
        }));
      }
    }
  };

  const handleViewportChange = (event) => {
    setTimeout(() => {
      const additionalData = loadMoreData();
      setNodes((prevNodes) => [...prevNodes, ...additionalData.nodes]);
      setEdges((prevEdges) => [...prevEdges, ...additionalData.edges]);
    }, 1000);
  };

  const numNodes = nodes.length;
  const numEdges = edges.length;

  const graphData = {
    nodes: nodes,
    edges: edges,
  };

  const loadMoreData = () => {
    return {
      nodes: [{ id: 3, label: "Node 3" }], // todo
      edges: [{ from: 2, to: 3, label: "Edge 2" }], // todo
    };
  };

  const graphOptions = {
    nodes: {
      shape: "dot",
      size: 25,
      font: {
        size: 20,
      },
    },
    edges: {
      color: "#000000",
    },
    physics: {
      enabled: false,
    },
  };

  //################# useEffect Function ######################################################
  useEffect(() => {
    if (onGetNodeAndEdgeCount) {
      onGetNodeAndEdgeCount(numNodes, numEdges);
    }
  }, [numNodes, numEdges, onGetNodeAndEdgeCount]);

  const { selectedNodeFields } = state;

  //################# Frontend ######################################################
  return (
    <div
      style={{
        border: `1px solid blue`,
        borderRadius: "5px",
        padding: "50px",
      }}
    >
      <div>
        <h1>Graph Output</h1>
        <p>
          Note: The graph visualization is currently limited
          to 25 relationships. 
        </p>
      </div>
      {numNodes !== 0 && (
        <div style={{ height: "600px", width: "100%" }}>
          <Graph events={{ select: handleSelect }} key={uuidv4()} graph={graphData} options={graphOptions} />
        </div>
      )}
      <div>
        <p>
          Nodes: {numNodes}, Edges: {numEdges}
        </p>
      </div>
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
    </div>
  );
};

export default React.memo(ResultGraph);
