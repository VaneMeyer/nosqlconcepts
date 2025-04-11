import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Box, Typography, Paper, List, ListItem, ListItemText, Alert } from '@mui/material';

function NewInformationC() {
  return (
    <Box component="section" sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          NoSQLconcepts Project Information
        </Typography>
        <Typography variant="body1" paragraph>
          This React application is being developed as part of the DigiTeLL project "NoSQLconcepts". 
          Currently, this is a work in progress. If you encounter any issues, please feel free to report them to <b>v.meyer@em.uni-frankfurt.de</b>.
        </Typography>
        <Alert severity="info" sx={{ marginBottom: 2 }}>
          Note: The database drivers used for executing queries include pg for PostgreSQL, cassandra-driver for Cassandra, 
          neo4j-driver for Neo4J, and mongoose for MongoDB. These drivers do not offer 100% flexibility in query execution. 
        </Alert>
        <Typography variant="h6" component="h2" gutterBottom>
          Known Issues:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Schema Evolution (creating and updating tables, collections, etc.)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Only one query can be executed at a time" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};
  {/*return (
    <Container>
      <h1>Information</h1>
       <Alert severity="success">This is a success Alert.</Alert>
      <Alert severity="info">This is an info Alert.</Alert>
      <Alert severity="warning">This is a warning Alert.</Alert>
      <Alert severity="error">This is an error Alert.</Alert> 
    </Container>
  );
}*/}

export default NewInformationC;
