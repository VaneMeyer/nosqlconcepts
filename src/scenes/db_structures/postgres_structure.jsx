// student project DBMS course WS 23/24
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { ArrowDropDownCircle } from '@mui/icons-material';

export default function DbStructureTablePostgres(list_of_tables, list_of_columns) {
  var list_of_tables_graphics = [];

  for (let i = 0; i < list_of_tables.length; i++) {
    list_of_tables_graphics.push(
      <Grid sx={{ width: '50%' }}>
        <Accordion sx={{width: '500px'}}>
          <AccordionSummary
            expandIcon={<ArrowDropDownCircle />}
            aria-controls="panel2-content"
            id="panel2-header">
            <Typography>
              {list_of_tables[i]}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Column Name</TableCell>
                  <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                    align="right">
                    Datatype</TableCell>
                  <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                    align="right">
                    Foreign column</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list_of_columns[i].map((row) => (
                  <TableRow key={row.table_name + row.column_name}>
                    <TableCell component="th" scope="row">
                      {row.column_name}
                    </TableCell>
                    <TableCell align="right">{row.data_type}</TableCell>
                    <TableCell align="right">{row.foreign_column_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  };
  return list_of_tables_graphics;
}