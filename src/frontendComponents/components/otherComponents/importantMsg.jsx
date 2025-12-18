import React from "react";

const ImportantMsg = ({ message, type }) => {
  //################# Style Settings ######################################################

  let msgStyle = {};
  if (type === "success") {
    msgStyle = {
      textAlign: "center",
      fontSize: "16px",
      margin: "20px",
      fontWeight: "bold",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#bbfccb",
      color: "black"
    };
  }
  if (type === "error") {
    msgStyle = {
      textAlign: "center",
      fontSize: "16px",
      margin: "20px",
      fontWeight: "bold",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#fcd1cf",
      color: "black"
    };
  }
  if (type === "info") {
    msgStyle = {
      textAlign: "center",
      fontSize: "16px",
      margin: "20px",
      fontWeight: "bold",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#e1edf7",
      color: "black"
    };
  }
  //################# Frontend ######################################################
  return <div style={msgStyle}>{message}</div>;
};

export default ImportantMsg;
