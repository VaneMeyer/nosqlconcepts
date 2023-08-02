import React, { useState } from "react";
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
        if (pathKeys.length === 1) { // for example match p = ()-[]-() return p
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
          }
        } else { //if we have > 1 object keys: for example match (p:Person)-[r:EMAIL_TO]-(p2:Person) return p, r, p2 
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
  console.log(edges);

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
      <div style={{ height: "600px", width: "100%" }}>
        <Graph key={uuidv4()} graph={graphData} options={graphOptions} />
      </div>
      <div>
        <p>
          Nodes: {numNodes}, Edges: {numEdges}
        </p>
      </div>
    </div>
  );
};

export default ResultGraph;
/*  import React from "react";
import { v4 as uuidv4 } from "uuid";
import Graph from "react-graph-vis";

const ResultGraph = ({ queryResult }) => {
  const nodes = [];
  const edges = [];
  const nodeIdArray = []; // Use an Array to keep track of unique node IDs
  try {
    if (queryResult) {
    queryResult.forEach((resultItem) => {
      if (resultItem) {
        const sourceNode = Object.values(resultItem)[0];
        const targetNode = Object.values(resultItem)[2];
        const relationship = Object.values(resultItem)[1];
        const sourceProps = Object.values(sourceNode.properties)[0];

        const targetProps = Object.values(targetNode.properties)[0];

        const sourceNodeId = sourceNode.identity.low;
        const targetNodeId = targetNode.identity.low;
        if (!nodeIdArray.includes(sourceNodeId)) {
          nodes.push({
            id: sourceNodeId,
            label: sourceProps,
            ...sourceNode.properties,
          });
          nodeIdArray.push(sourceNodeId);
        }
        if (!nodeIdArray.includes(targetNodeId)) {
          nodes.push({
            id: targetNodeId,
            label: targetProps,
            ...targetNode.properties,
          });
          nodeIdArray.push(targetNodeId);
        }

        edges.push({
          from: relationship.start.low,
          to: relationship.end.low,
          label: relationship.type,
        });
      }
    });
  }
  } catch (error) {
    console.log(error);
    
    
  }
  

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
      <div style={{ height: "600px", width: "100%" }}>
        <Graph key={uuidv4()} graph={graphData} options={graphOptions} />
      </div>
    </div>
  );
};

export default ResultGraph; */

/* import React from "react";
import { v4 as uuidv4 } from "uuid";
import Graph from "react-graph-vis";

const processQueryResult = (queryResult) => {
  const nodes = [];
  const edges = [];
  const nodeIdSet = new Set();

  if (queryResult) {
    queryResult.forEach((resultItem) => {
      if (resultItem) {
        Object.values(resultItem).forEach((value) => {
          if (value && value.identity) {
            const nodeId = value.identity.low;
            if (!nodeIdSet.has(nodeId)) {
              const label = Object.values(value.properties)[0];
              nodes.push({
                id: nodeId,
                label: label,
                ...value.properties,
              });
              nodeIdSet.add(nodeId);
            }
          }
        });

        const relationship = Object.values(resultItem)[1];
        if (relationship && relationship.start && relationship.end) {
          edges.push({
            from: relationship.start.low,
            to: relationship.end.low,
            label: relationship.type,
          });
        }
      }
    });
  }

  return { nodes, edges };
};

const ResultGraph = ({ queryResult }) => {
  const { nodes, edges } = processQueryResult(queryResult);

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
      <div style={{ height: "600px", width: "100%" }}>
        <Graph key={uuidv4()} graph={graphData} options={graphOptions} />
      </div>
    </div>
  );
};

export default ResultGraph;
 */
/* import React from "react";
import { v4 as uuidv4 } from "uuid";
import Graph from "react-graph-vis";

const processQueryResult = (queryResult) => {
  const nodes = [];
  const edges = [];

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

            const startNodeLabel = startNode.labels[0];
            const endNodeLabel = endNode.labels[0];

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
        }
      }
    });
  }

  return { nodes, edges };
};

const ResultGraph = ({ queryResult }) => {
  const { nodes, edges } = processQueryResult(queryResult);

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
      <div style={{ height: "600px", width: "100%" }}>
        <Graph key={uuidv4()} graph={graphData} options={graphOptions} />
      </div>
    </div>
  );
};

export default ResultGraph; */
/* import React from "react";
import { v4 as uuidv4 } from "uuid";
import Graph from "react-graph-vis";

const extractNodesAndEdges = (queryResult) => {
  const nodes = [];
  const edges = [];

  if (queryResult) {
    queryResult.forEach((resultItem) => {
      const keys = Object.keys(resultItem);
      keys.forEach((key) => {
        const value = resultItem[key];
        if (value && typeof value === "object" && "identity" in value) {
          const node = {
            id: value.identity.low,
            label: value.labels && value.labels.length > 0 ? value.labels[0] : "",
            ...value.properties,
          };
          if (!nodes.find((n) => n.id === node.id)) {
            nodes.push(node);
          }
        } else if (value && Array.isArray(value)) {
          value.forEach((relation) => {
            if (
              relation &&
              relation.start &&
              relation.end &&
              relation.relationship &&
              relation.relationship.type
            ) {
              const startNodeId = relation.start.identity.low;
              const endNodeId = relation.end.identity.low;

              if (!nodes.find((n) => n.id === startNodeId)) {
                nodes.push({
                  id: startNodeId,
                  label: relation.start.labels && relation.start.labels.length > 0 ? relation.start.labels[0] : "",
                  ...relation.start.properties,
                });
              }

              if (!nodes.find((n) => n.id === endNodeId)) {
                nodes.push({
                  id: endNodeId,
                  label: relation.end.labels && relation.end.labels.length > 0 ? relation.end.labels[0] : "",
                  ...relation.end.properties,
                });
              }

              edges.push({
                from: startNodeId,
                to: endNodeId,
                label: relation.relationship.type,
              });
            }
          });
        }
      });
    });
  }

  return { nodes, edges };
};

const ResultGraph = ({ queryResult }) => {
  const { nodes, edges } = extractNodesAndEdges(queryResult);

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
      <div style={{ height: "600px", width: "100%" }}>
        <Graph key={uuidv4()} graph={graphData} options={graphOptions} />
      </div>
    </div>
  );
};

export default ResultGraph; */
