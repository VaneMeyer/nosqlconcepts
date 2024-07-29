import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

function InformationC() {
  return (
    <Container>
      <h1>Information</h1>
      <Alert severity="success">This is a success Alert.</Alert>
      <Alert severity="info">This is an info Alert.</Alert>
      <Alert severity="warning">This is a warning Alert.</Alert>
      <Alert severity="error">This is an error Alert.</Alert>
    </Container>
  );
}

export default InformationC;
