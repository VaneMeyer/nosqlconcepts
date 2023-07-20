import React from "react";
import { v4 as uuidv4 } from "uuid";
import Graph from "react-graph-vis";

const ResultGraph = ({ queryResult }) => {
  const nodes = [];
  const edges = [];
  const nodeIdArray = []; // Use an Array to keep track of unique node IDs
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
