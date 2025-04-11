import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import DbStructureTable from "./DbStructureTable";
import DbStructureTablePostgres from "./db_structures/postgres_structure";
import DbStructureTableNeo4j from "./db_structures/neo4j_structure";
import cassandraDataModel from "../../images/datamodel2-transp.png";
import mongoDataModel from "../../images/datamodel4-transp.png";
import neoDataModel from "../../images/datamodel3-transp.png";
import pgdataModel from "../../images/datamodel1-transp.png";
import { fetchDbStructure } from "../../api/mainApi";
import PgDatabaseSchema from "./pgSchema";

function DbAccordion({ endpoint }) {
  const [dataModel, setDataModel] = useState("");
  const [dbTable, setDbTable] = useState(null);
  const [dbendpoint, setDbEndpoint] = useState(null);

  const [showDbStructure, setShowDbStructure] = useState(false);
  useEffect(() => {
    
    if (endpoint === "PostgreSQL") {
      setDbEndpoint("/getPostgreSQLStructure");
      setDataModel(pgdataModel);
    }
    if (endpoint === "Cassandra") {
      setDbEndpoint("/getCassandraStructure");
      setDataModel(cassandraDataModel);
    }
    if (endpoint === "MongoDB") {
      setDbEndpoint("/getMongoStructure");
      setDataModel(mongoDataModel);
    }
    if (endpoint === "Neo4J") {
      setDbEndpoint("/getNeo4JStructure");
      setDataModel(neoDataModel);
    }
  }, []);
  const fetchStructureData = async () => {
    try {
      let response = await fetchDbStructure(dbendpoint);
      response = response.data;
      
      let newDbTable;
      switch (endpoint) {
        case "PostgreSQL":
          newDbTable = DbStructureTablePostgres(
            response["tables"],
            response["columns"]
          );
          break;
        case "Neo4J":
          newDbTable = DbStructureTableNeo4j(
            response["nodes"],
            response["relationships"],
            response["node_props"],
            response["rel_props"]
          );
          break;
        default:
          newDbTable = DbStructureTable(
            response["tables"],
            response["columns"]
          );
          break;
      }
      setDbTable(newDbTable);
      setShowDbStructure((prevShowDbStructure) => !prevShowDbStructure);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Box aria-labelledby="Inspect database structure">
      <Button
        aria-label="Open database structure accordion elements"
        onClick={fetchStructureData}
      >
        Inspect and Update Database Structure
      </Button>
      {showDbStructure && (
        <Grid container spacing={2}>
          {dbTable.map((table, index) => (
            <div key={index}>{table}</div>
          ))}
         {/*  <img
            src={dataModel}
            alt="An overview of the data model of enron database which can be inspected by clicking the above accordion elements"
            width="100%"
            height="auto"
          /> */}
          {/* <PgDatabaseSchema /> */}
        </Grid>
      )}{" "}
    </Box>
  );
}

export default DbAccordion;
