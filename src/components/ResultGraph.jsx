import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Graph from "react-graph-vis";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const ResultGraph = ({ queryResult }) => {
  queryResult = queryResult.slice(0,25);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stateNodes, setNodes] = useState([]);
  const [stateEdges, setEdges] = useState([]);
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
          // for example match p = ()-[]-() return p
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
                  ...startNode.properties,
                });
              }

              if (!nodes.find((node) => node.id === endNodeId)) {
                nodes.push({
                  id: endNodeId,
                  label: endNodeLabel,
                  ...endNode.properties,
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
                      ...node.properties,
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
          //if we have > 1 object keys: for example match (p:Person)-[r:EMAIL_TO]-(p2:Person) return p, r, p2
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
                    ...node.properties,
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
    console.log(error);
  }

  const handleViewportChange = (event) => {
    // Hier könntest du die Logik implementieren, um zu überprüfen, ob zusätzliche Daten benötigt werden.
    // Zum Beispiel, wenn der Benutzer zum Rand des sichtbaren Bereichs navigiert.

    // Simuliere das Nachladen von Daten nach einem Verzögerungszeitraum
    setTimeout(() => {
      const additionalData = loadMoreData();
      setNodes((prevNodes) => [...prevNodes, ...additionalData.nodes]);
      setEdges((prevEdges) => [...prevEdges, ...additionalData.edges]);
    }, 1000); // Verzögerung zum Simulieren des Ladevorgangs
  };

  const numNodes = nodes.length;
  const numEdges = edges.length;

  const graphData = {
    nodes: nodes,
    edges: edges,
  };

 /*  const subEdges = edges.slice(0, 2);
  const subNodes = [];
  subEdges.forEach((element) => {
    if (!subNodes.some((node) => node.id === element.from)) {
      subNodes.push({ id: element.from });
    }

    if (!subNodes.some((node) => node.id === element.to)) {
      subNodes.push({ id: element.to });
    }
  }); */
  //use subgraph for visualization because of performance issues
/*   const subGraphData = {
    nodes: subNodes,
    edges: subEdges,
  }; */

  const loadMoreData = () => {
    return {
      nodes: [{ id: 3, label: "Node 3" }], // weitere 25 notes
      edges: [{ from: 2, to: 3, label: "Edge 2" }], // weitere 25 kanten
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
      enabled: true,
    },
  };

  return (
    <div
      style={{
        border: `1px solid ${colors.blueAccent[100]}`,
        borderRadius: "5px",
        padding: "50px",
      }}
    >
      <div>
        <p>Note: Due to some issues, the graph visualization is currently limited to 25 relationships. We are working on finding a solution.</p>
      </div>
      {numNodes !== 0 && (
        <div style={{ height: "600px", width: "100%" }}>
          <Graph key={uuidv4()} graph={graphData} options={graphOptions} />
        </div>
      )}
      <div>
        <p>
          Nodes: {numNodes}, Edges: {numEdges}
        </p>
      </div>
    </div>
  );
};

export default React.memo(ResultGraph);
//export default ResultGraph;

/* import React from "react";
import { v4 as uuidv4 } from "uuid";
import Graph from "react-graph-vis";

const ResultGraph = ({ queryResult }) => {
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
          // for example match p = ()-[]-() return p
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
                  ...startNode.properties,
                });
              }

              if (!nodes.find((node) => node.id === endNodeId)) {
                nodes.push({
                  id: endNodeId,
                  label: endNodeLabel,
                  ...endNode.properties,
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
                      ...node.properties,
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
          //if we have > 1 object keys: for example match (p:Person)-[r:EMAIL_TO]-(p2:Person) return p, r, p2
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
                    ...node.properties,
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
    console.log(error);
  }

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
      enabled: true,
    },
  };

  return (
    <div>
      {numNodes !== 0 && (
        <div style={{ height: "600px", width: "100%" }}>
          <Graph key={uuidv4()} graph={graphData} options={graphOptions} />
        </div>
      )}
      <div>
        <p>
          Nodes: {numNodes}, Edges: {numEdges}
        </p>
      </div>
    </div>
  );
};

export default ResultGraph;

 */
