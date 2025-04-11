import { Box, Typography } from "@mui/material";
import PgDatabaseSchema from "./pgSchema";

export default function DbStructure() {
  return (
    <Box>
      <Typography variant="caption" component="label" htmlFor="db-structure">
        Database Structure
      </Typography>
      <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <PgDatabaseSchema />
      </Box>
    </Box>
  );
}
