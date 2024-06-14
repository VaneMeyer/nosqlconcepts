import React from "react";
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
