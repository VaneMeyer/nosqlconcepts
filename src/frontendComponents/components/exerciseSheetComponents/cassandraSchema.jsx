import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const dataModel = [
    {
      tableName: 'department',
      columns: [
        { name: 'id', type: 'TEXT' },
        { name: 'name', type: 'TEXT' },
        { name: 'location', type: 'TEXT' },
      ],
    },
    {
      tableName: 'person',
      columns: [
        { name: 'id', type: 'TEXT' },
        { name: 'firstname', type: 'TEXT' },
        { name: 'middlename', type: 'TEXT' },
        { name: 'lastname', type: 'TEXT' },
        { name: 'works_in', type: 'TEXT' },
        { name: 'salary', type: 'INT' },
        { name: 'email_address', type: 'TEXT' },
      ],
    },
    {
      tableName: 'email',
      columns: [
        { name: 'id', type: 'TEXT' },
        { name: 'body', type: 'TEXT' },
        { name: 'cc', type: 'SET<TEXT>' },
        { name: 'date', type: 'TIMESTAMP' },
        { name: 'receiver', type: 'SET<TEXT>' },
        { name: 'sender', type: 'TEXT' },
        { name: 'subject', type: 'TEXT' },
      ],
    },
    {
      tableName: 'perdept',
      columns: [
        { name: 'department_id', type: 'TEXT' },
        { name: 'department_location', type: 'TEXT' },
        { name: 'department_name', type: 'TEXT' },
        { name: 'person_email_address', type: 'TEXT' },
        { name: 'person_firstname', type: 'TEXT' },
        { name: 'person_id', type: 'TEXT' },
        { name: 'person_lastname', type: 'TEXT' },
        { name: 'person_middlename', type: 'TEXT' },
        { name: 'person_salary', type: 'INT' },
        { name: 'person_works_in', type: 'TEXT' },
      ],
    },
    {
      tableName: 'knows',
      columns: [
        { name: 'pid1', type: 'TEXT' },
        { name: 'pid2', type: 'TEXT' },
      ],
    },
  ];

const CasDataModelTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="data model table">
        <TableHead>
          <TableRow>
            <TableCell>Table</TableCell>
            <TableCell>Columns</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataModel.map((table) => (
            <TableRow key={table.tableName}>
              <TableCell component="th" scope="row">
                {table.tableName}
              </TableCell>
              <TableCell>
                <ul>
                  {table.columns.map((column, index) => (
                    <li key={index}>
                      <strong>{column.name}</strong> ({column.type})
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};



export default CasDataModelTable;
