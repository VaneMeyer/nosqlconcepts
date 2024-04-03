//is it in use? delete?
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  useTheme,
} from "@mui/material";

import { tokens } from "../theme";
import ResultTable from "./ResultTable";
import ImportantMsg from "./importantMsg";

const Feedback = ({ queryResult }) => {

  //################# Style Settings ######################################################
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
//################# State Variables ######################################################
  const [correctResult, setCorrectResult] = useState("");
  const [feedback, setFeedback] = useState("");
  const [type, setType] = useState("");

  //################# get/post data from/to DB ######################################################
  const fetchData = async () => {
    try {
      const response = await axios.get("/getCorrectResult"); 

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
      
    } catch (error) {
      console.error("Error with receiving data:", error);
      
    }
  };
//################# Functions ######################################################
  const checkQueryResult = () => {
    fetchData();
  };
  //################# Frontend ######################################################
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
