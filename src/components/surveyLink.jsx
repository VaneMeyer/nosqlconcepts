import React from "react";
import { Button, Link, Typography } from "@mui/material";
import SurveyIcon from "@mui/icons-material/Assignment"; // Beispiel für ein Icon

function SurveyLink() {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <Typography variant="h6" gutterBottom>
        We value your feedback!
      </Typography>
      <Button
        component={Link}
        href="https://survey.studiumdigitale.uni-frankfurt.de/nosqlconcepts/" 
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        color="primary"
        startIcon={<SurveyIcon />}
        aria-label="Go to survey"
      >
        Take the Survey
      </Button>
    </div>
  );
}

export default SurveyLink;
