//student project DBMS course WS 23/24
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function DbStructureTable(list_of_collections, list_of_fields, key) {
  var list_of_tables = [];

  for (let i = 0; i < list_of_collections.length; i++) {
    list_of_tables.push(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{list_of_collections[i]}</TableCell>
          </TableRow>
          <TableRow>
          <ul>
                const it = 0
                {Object.keys(list_of_fields[i]).map(key => {
                  if(it == 0){it += 1; return <TableCell>{key}</TableCell>}
                  return <TableCell align="right">{key}</TableCell>
                })}
              </ul>
          </TableRow>
        </TableHead>
        <TableBody>
          {list_of_fields[i].map((row) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <ul>
                const it = 0
                {Object.keys(list_of_fields[i]).map(key => {
                  if(it == 0){it += 1; return <TableCell component="th" scope="row">{list_of_fields[key]}</TableCell>}
                  return <TableCell align="right">{list_of_fields[key]}</TableCell>
                })}
              </ul>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  return list_of_tables;
}