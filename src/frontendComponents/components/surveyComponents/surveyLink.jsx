import React from "react";
import { Button, Link, Typography } from "@mui/material";
import SurveyIcon from "@mui/icons-material/Assignment"; // Beispiel für ein Icon
import GradientButton from "../exerciseSheetComponents/gradientButton";

function SurveyLink() {
  return (
    <div style={{ textAlign: "right", marginRight: "10px" }}> 
     {/*  <Typography variant="h6" gutterBottom>
        We value your feedback!
      </Typography> */}
      <GradientButton
        component={Link}
        href="https://survey.studiumdigitale.uni-frankfurt.de/nosqlconcepts/" 
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        color="primary"
        startIcon={<SurveyIcon />}
        aria-label="Go to survey"
      >
        Feedback
      </GradientButton>
    </div>
  );
}

export default SurveyLink;
