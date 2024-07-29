// student project DBMS course WS 23/24
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { ArrowDropDownCircle } from '@mui/icons-material';

export default function DbStructureTablePostgres(list_of_nodes, list_of_rels, list_of_node_props, list_of_rel_props) {
  var list_of_tables_graphics = [];

  for (let i = 0; i < list_of_nodes.length; i++) {
    list_of_tables_graphics.push(
      <Grid sx={{ width: '50%' }}>
        <Accordion sx={{width: '500px'}}>
          <AccordionSummary
            expandIcon={<ArrowDropDownCircle />}
            aria-controls="panel2-content"
            id="panel2-header">
            <Typography>
              {list_of_nodes[i].name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}>
                    type</TableCell>
                  <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                    align="right">
                    label</TableCell>
                  <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                    align="right">
                    Property</TableCell>
                  <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                    align="right">
                    Datatype</TableCell>
                 {/*  <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                    align="right">
                    Mandatory</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {list_of_node_props[i].map((row) => (
                  <TableRow key={row.type + row.property}>
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell align="right">{row.label}</TableCell>
                    <TableCell align="right">{row.property}</TableCell>
                    <TableCell align="right">{row.datatype}</TableCell>
                    {/* <TableCell align="right">{row.mandatory}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  };

  for (let i = 0; i < list_of_rels.length; i++) {
    list_of_tables_graphics.push(
      <Grid sx={{ width: '50%' }}>
        <Accordion sx={{width: '500px'}}>
          <AccordionSummary
            expandIcon={<ArrowDropDownCircle />}
            aria-controls="panel2-content"
            id="panel2-header">
            <Typography>
              {list_of_rels[i].name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}>
                    type</TableCell>
                  <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                    align="right">
                    Property</TableCell>
                  <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                    align="right">
                    Datatype</TableCell>
                  {/* <TableCell
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                    align="right">
                    Mandatory</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {list_of_rel_props[i].map((row) => (
                  <TableRow key={row.type + row.property}>
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell align="right">{row.property}</TableCell>
                    <TableCell align="right">{row.datatype}</TableCell>
                    {/* <TableCell align="right">{row.mandatory}</TableCell> */}
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