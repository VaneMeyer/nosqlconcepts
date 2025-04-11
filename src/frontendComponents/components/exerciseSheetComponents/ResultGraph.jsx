import React, { useState, useEffect, useMemo, useCallback } from "react";
import Graph from "react-graph-vis";
import { Divider, List, ListItem, Paper, Typography } from "@mui/material";

const ResultGraph = ({ queryResult, onGetNodeAndEdgeCount }) => {
  // Memoize queryResult slice
  const processedQueryResult = useMemo(() => queryResult.slice(0, 25), [queryResult]);

  // Main functionality to get nodes and edges
  const { nodes, edges } = useMemo(() => {
    const nodes = [];
    const edges = [];
    const nodeIdSet = new Set(); // Use a Set for unique node IDs
    const edgeIdSet = new Set(); // Use a Set for unique edge IDs
    processedQueryResult.forEach((pathItem) => {
      try {
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

              // Add unique nodes
              if (!nodeIdSet.has(startNodeId)) {
                nodeIdSet.add(startNodeId);
                nodes.push({
                  id: startNodeId,
                  label: startNodeLabel,
                  properties: startNode.properties,
                });
              }

              if (!nodeIdSet.has(endNodeId)) {
                nodeIdSet.add(endNodeId);
                nodes.push({
                  id: endNodeId,
                  label: endNodeLabel,
                  properties: endNode.properties,
                });
              }

              // Add unique edges
              const edgeId = `${startNodeId}-${endNodeId}-${relationship.type}`;
              if (!edgeIdSet.has(edgeId)) {
                edgeIdSet.add(edgeId);
                edges.push({
                  from: startNodeId,
                  to: endNodeId,
                  label: relationship.type,
                });
              }
            });
          } else {
            // If there are no segments, treat it as a single node item
            const node = pathItem[pathKeys[0]];
            const nodeId = node.identity.low;
            if (!nodeIdSet.has(nodeId)) {
              nodeIdSet.add(nodeId);
              nodes.push({
                id: nodeId,
                label: Object.values(node.properties)[0],
                properties: node.properties,
              });
            }
          }
        } else {
          Object.values(pathItem).forEach((obj) => {
            if (obj.start && obj.end) {
              const edgeId = `${obj.start.low}-${obj.end.low}-${obj.type}`;
              if (!edgeIdSet.has(edgeId)) {
                edgeIdSet.add(edgeId);
                edges.push({
                  from: obj.start.low,
                  to: obj.end.low,
                  label: obj.type,
                });
              }
            } else {
              const nodeId = obj.identity.low;
              if (!nodeIdSet.has(nodeId)) {
                nodeIdSet.add(nodeId);
                nodes.push({
                  id: nodeId,
                  label: Object.values(obj.properties)[0],
                  properties: obj.properties,
                });
              }
            }
          });
        }
      } catch (error) {
        console.error("Error processing graph data:", error);
      }
    });

    return { nodes, edges };
  }, [processedQueryResult]);

  // useEffect to handle side effects for node and edge count
  useEffect(() => {
    if (onGetNodeAndEdgeCount) {
      onGetNodeAndEdgeCount(nodes.length, edges.length);
    }
  }, [nodes, edges, onGetNodeAndEdgeCount]);

  // State variables for selected node properties
  const [selectedNodeFields, setSelectedNodeFields] = useState([]);

  // Handle node selection
  const handleSelect = useCallback(({ nodes: selectedNodes }) => {
    if (selectedNodes.length > 0) {
      const selectedNode = nodes.find(node => node.id === selectedNodes[0]);
      if (selectedNode) {
        setSelectedNodeFields(Object.entries(selectedNode.properties).map(([key, value]) => `${key}: ${value}`));
      }
    }
  }, [nodes]);

  // Graph data and options
  const graphData = { nodes, edges };

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

  // Frontend
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
      {nodes.length !== 0 && (
        <div style={{ height: "600px", width: "100%" }}>
          <Graph events={{ select: handleSelect }} graph={graphData} options={graphOptions} />
        </div>
      )}
      <div>
        <p>
          Nodes: {nodes.length}, Edges: {edges.length}
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


/* import React, { useState, useEffect, useMemo  } from "react";
import { v4 as uuidv4 } from "uuid";
import Graph from "react-graph-vis";
import { Divider, List, ListItem, Paper, Typography } from "@mui/material";

const ResultGraph = ({ queryResult, onGetNodeAndEdgeCount }) => {
  queryResult = queryResult.slice(0, 25); 

 

  //################# State Variables ######################################################
 
  const [state, setState] = useState({
   
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
  
  

  const numNodes = nodes.length;
  const numEdges = edges.length;

   const graphData = {
    nodes: nodes,
    edges: edges,
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
          <Graph events={{ select: handleSelect }} key={ uuidv4() } graph={graphData} options={graphOptions} />
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

 */