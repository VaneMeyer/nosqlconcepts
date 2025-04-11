import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, CircularProgress } from "@mui/material";

const ResultTable = ({ queryResult, resultSize, title }) => {
  let columns = [];
  let rows = [];
  let rowsWithUniqueId = [];

  useEffect(()=>{
   
  },[])

  // Build the columns array based on queryResult
  if (queryResult && queryResult.length > 0) {
    let columnNames = Object.keys(queryResult[0]);
    columnNames.forEach((item) => {
      const value = queryResult[0][item];
      const isObject =
        typeof value === "object" && value !== null && !Array.isArray(value);

      if (isObject && Object.keys(value).includes("low") && value.low !== undefined) {
        columns.push({
          field: item,
          headerName: item,
          width: 200,
          valueGetter: (params) => {
            const cellValue = params.row[item];
            return cellValue && cellValue.low !== undefined ? cellValue.low : '';
          },
        });
      } else if (isObject) {
        columns.push({
          field: item,
          headerName: item,
          width: 200,
          valueGetter: (params) => {
            const cellValue = params.row[item];
            return JSON.stringify(cellValue);
          },
        });
      } else {
        columns.push({
          field: item,
          headerName: item,
          width: 200,
          valueGetter: (params) => params.row[item],
        });
      }
    });
  }

  // Handle rows and add unique IDs
  if (queryResult) {
    rows = queryResult;
    rowsWithUniqueId = rows.map((row) => ({
      id: uuidv4(),
      ...row,
    }));
  }

  // Determine pagination settings
  const minTableRows = resultSize < 5 ? resultSize : 5;
  const maxTableRows = resultSize > 100 ? 100 : resultSize;

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        {title} Output
      </Typography>
      {queryResult ? (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rowsWithUniqueId}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: minTableRows },
              },
            }}
            pageSizeOptions={[minTableRows, 25, 50, maxTableRows]}
            aria-label={`${title} Data Table`}
            sx={{
              '& .MuiDataGrid-cell': {
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeader': {
                outline: 'none',
              },
            }}
          />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ResultTable;


/* import React from "react";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";

const ResultTable = ({ queryResult, resultSize, title }) => {
  let columns = [];
  let rows = [];
  let rowsWithUniqueId = [];

  if (queryResult && queryResult.length > 0) {
    let columnNames = Object.keys(queryResult[0]);
    columnNames.forEach((item) => {
      const value = queryResult[0][item];
      const isObject =
        typeof value === "object" && value !== null && !Array.isArray(value);

      if (isObject && Object.keys(value).includes("low") && value.low !== undefined) {
        // If the value is an object with a "low" property, only display the "low" value
        columns.push({
          field: item,
          headerName: item,
          width: 200,
          valueGetter: (params) => {
            const cellValue = params.row[item];
            if(cellValue && cellValue.low !== undefined)
            {return cellValue.low;}
          },
        });
      } 
      else if (isObject) {
        columns.push({
          field: item,
          headerName: item,
          width: 200,
          valueGetter: (params) => {
            const cellValue = params.row[item];
            return JSON.stringify(cellValue); 
          },
        });
      }
      else {
        columns.push({
          field: item,
          headerName: item,
          width: 200,
          valueGetter: (params) => {
            const cellValue = params.row[item];
            return cellValue;
          },
        });
      }
    });
  }
try {
   if (queryResult) {
    rows = queryResult;
  }
  rowsWithUniqueId = rows.map((row) => ({
    id: uuidv4(),
    ...row,
  }));
} catch (error) {
  console.log("error:", error);
}
 

  let minTableRows = resultSize < 5 ? resultSize : 5;
  let maxTableRows = resultSize > 100 ? 100 : resultSize;

  return (
    <div>
      {queryResult && (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rowsWithUniqueId}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: minTableRows },
              },
            }}
            pageSizeOptions={[minTableRows, 25, 50, maxTableRows]}
          />
        </div>
      )}
    </div>
  );
};

export default ResultTable;
 */