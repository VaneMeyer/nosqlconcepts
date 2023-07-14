import React from "react";
import { v4 as uuidv4 } from 'uuid';

import { DataGrid } from "@mui/x-data-grid";

const ResultTable = ({ queryResult, resultSize }) => {
  let columns = [];
  if (queryResult) {
    let columnNames = Object.keys(queryResult[0]);
    columnNames.forEach((item) => {
      columns.push({ field: item, headerName: item, width:200 });
    });
  } 
  let rows = []
if (queryResult) {
    rows = queryResult;
} 
let rowsWithUniqueId = rows.map((row) => ({
    id: uuidv4(),
    ...row
}))


  
  let minTableRows = resultSize < 5 ? resultSize : 5;
  let maxTableRows = resultSize > 100 ? 100 : resultSize;
  return (
    <div>
      {queryResult && (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rowsWithUniqueId}
            columns={columns}
            getRowId={(row) => row.id } 
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: minTableRows },
              },
            }}
            pageSizeOptions={[minTableRows,25, 50, maxTableRows]}
          />
        </div>
      )}
    </div>
  );
};

export default ResultTable;
