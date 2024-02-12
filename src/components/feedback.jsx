import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from "@mui/material";

import { tokens } from "../theme";
import ResultTable from "./ResultTable";
import ImportantMsg from "./importantMsg";

const Feedback = ({ queryResult }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[100],
    color: colors.grey[900],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "10px",
  };

  const [correctResult, setCorrectResult] = useState("");
  const [feedback, setFeedback] = useState("");
  const [type, setType] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("/getCorrectResult"); //add in app.js for aech task

      //get Result of correct query
      setCorrectResult(response.data);
      console.log(response.data);
      console.log(queryResult);
      if (JSON.stringify(queryResult) === JSON.stringify(response.data)) {
        setFeedback("Your query is correct");
        setType("success");
      } else {
        setFeedback(
          `Your query is not correct. The correct result should look like the following:`
        );
        setType("error");
      }
      //console.log(transfomedData);
    } catch (error) {
      console.error("Error with receiving data:", error);
      //alert("Could not get data from database! Please try to reload window or open new tab.")
    }
  };

  const checkQueryResult = () => {
    fetchData();
  };
  return (
    <Box>
      <Button sx={muiButtonStyle} onClick={checkQueryResult}>
        Check Query
      </Button>
      <ImportantMsg message={feedback} type={type} />
      {!(JSON.stringify(queryResult) === JSON.stringify(correctResult)) && (
        <div>
          <p>Result should look like this: </p>
          <ResultTable
            resultSize={correctResult.length}
            queryResult={correctResult}
          />
        </div>
      )}
    </Box>
  );
};
export default Feedback;
