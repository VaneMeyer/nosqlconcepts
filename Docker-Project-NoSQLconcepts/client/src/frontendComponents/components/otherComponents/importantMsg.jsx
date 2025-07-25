import React from 'react';


const ImportantMsg = ({ message, type }) => {
  //################# Style Settings ######################################################
   

    let msgStyle = {};
    if (type === "success") {
      msgStyle = {fontSize: "16px", margin:"20px", fontWeight: "bold", padding: "10px", borderRadius:"5px", backgroundColor: "#bbfccb" }
    }
    if (type === "error") {
      msgStyle = {fontSize: "16px", margin:"20px", fontWeight: "bold", padding: "10px", borderRadius:"5px", backgroundColor:"#fcd1cf" };
    }
    if (type === "info") {
      msgStyle = {fontSize: "16px", margin:"20px", fontWeight: "bold", padding: "10px", borderRadius:"5px", backgroundColor:"#e1edf7" };
    }
    //################# Frontend ######################################################
  return (
    <div style={msgStyle}>
      {message}
    </div>
  );
};

export default ImportantMsg;
