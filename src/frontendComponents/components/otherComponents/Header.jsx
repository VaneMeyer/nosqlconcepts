import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //################# Frontend ######################################################
  return (
    <Box mb="30px" alignItems="center" p={7}>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[100]}> {/* 400 */}
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;