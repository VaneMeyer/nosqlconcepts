import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressStatus = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Styles for mui components
  let muiBoxStyle = {};

  let startedStyle = {
    backgroundColor: "#dded82",
    color: colors.grey[100],
    fontSize: "10px",
    fontWeight: "bold",
    padding: "5px 10px",
    margin: "10px 10px",
  };
  let finishStyle = {
    backgroundColor: "#5ae0a8",
    color: colors.grey[100],
    fontSize: "10px",
    fontWeight: "bold",
    padding: "5px 10px",
    margin: "10px 10px",
  };

  if (localStorage.getItem(`${title.toLowerCase()}Status`) === "STARTED") {
    muiBoxStyle = startedStyle;
  } else if (localStorage.getItem(`${title.toLowerCase()}Status`) === "FINISHED") {
    muiBoxStyle = finishStyle;
  }

  return (
    <Box>
      <Box sx={muiBoxStyle}>
        {localStorage.getItem(`${title.toLowerCase()}Status`) || ""}{" "}
      </Box>
    </Box>
  );
};

export default ProgressStatus;
