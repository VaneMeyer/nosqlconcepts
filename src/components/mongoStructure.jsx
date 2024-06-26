//student project DBMS course WS 23/24
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { ArrowDropDownCircle } from '@mui/icons-material';

export default function MongoDbStructureTable(list_of_collections, list_of_fields) {
    list_of_collections = ["email" , "person", "department", "knows", "to", "cc" ]
    list_of_fields = ["_id", "ID", "MESSAGE_BODY", "MESSAGE_DATE", "MESSAGE_FROM", "MESSAGE_SUBJECT"]
  var list_of_tables = [];

  for (let i = 0; i < list_of_collections.length; i++) {
    list_of_tables.push(
      <Grid sx={{ width: '30%' }}>
        <Accordion sx={{width: '500px'}}>
          <AccordionSummary
            expandIcon={<ArrowDropDownCircle />}
            aria-controls="panel2-content"
            id="panel2-header">
            <Typography>
              {list_of_collections[i]}
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
                    Data Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                 {list_of_fields.foreach((row) => ( 
                  <TableRow >
                    <TableCell>_id</TableCell>
                   {/*  <TableCell align="right">{row.datatype}</TableCell> */}
                  </TableRow>
                 ))}  
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  };
  return list_of_tables;
}