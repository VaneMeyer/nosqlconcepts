import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid } from '@mui/material';

const PgDatabaseSchema = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Overview Schema email
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2 }}>department</Typography>
            <Table aria-label="department table">
              <TableHead>
                <TableRow>
                  <TableCell>column</TableCell>
                  <TableCell>type</TableCell>
                  <TableCell>references</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>varchar(10)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>name</TableCell>
                  <TableCell>varchar(37)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>location</TableCell>
                  <TableCell>varchar(56)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2 }}>person</Typography>
            <Table aria-label="person table">
              <TableHead>
                <TableRow>
                  <TableCell>column</TableCell>
                  <TableCell>type</TableCell>
                  <TableCell>references</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>varchar(20)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>firstname</TableCell>
                  <TableCell>varchar(14)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>middlename</TableCell>
                  <TableCell>varchar(18)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>lastname</TableCell>
                  <TableCell>varchar(17)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>works_in</TableCell>
                  <TableCell>varchar(10)</TableCell>
                  <TableCell>department(id)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>salary</TableCell>
                  <TableCell>integer</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>email_address</TableCell>
                  <TableCell>varchar(34)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2 }}>knows</Typography>
            <Table aria-label="knows table">
              <TableHead>
                <TableRow>
                  <TableCell>column</TableCell>
                  <TableCell>type</TableCell>
                  <TableCell>references</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>pid1</TableCell>
                  <TableCell>varchar(20)</TableCell>
                  <TableCell>person(id)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>pid2</TableCell>
                  <TableCell>varchar(20)</TableCell>
                  <TableCell>person(id)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2 }}>emails</Typography>
            <Table aria-label="emails table">
              <TableHead>
                <TableRow>
                  <TableCell>column</TableCell>
                  <TableCell>type</TableCell>
                  <TableCell>references</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>varchar(60)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>message_body</TableCell>
                  <TableCell>varchar(4153)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>message_date</TableCell>
                  <TableCell>varchar(28)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>message_from</TableCell>
                  <TableCell>varchar(20)</TableCell>
                  <TableCell>person(email_address)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>message_subject</TableCell>
                  <TableCell>varchar(100)</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2 }}>cc</Typography>
            <Table aria-label="cc table">
              <TableHead>
                <TableRow>
                  <TableCell>column</TableCell>
                  <TableCell>type</TableCell>
                  <TableCell>references</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>varchar(60)</TableCell>
                  <TableCell>emails(id)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>email</TableCell>
                  <TableCell>varchar(39)</TableCell>
                  <TableCell>person(email_address)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2 }}>to</Typography>
            <Table aria-label="to table">
              <TableHead>
                <TableRow>
                  <TableCell>column</TableCell>
                  <TableCell>type</TableCell>
                  <TableCell>references</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>varchar(60)</TableCell>
                  <TableCell>emails(id)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>email</TableCell>
                  <TableCell>varchar(39)</TableCell>
                  <TableCell>person(email_address)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PgDatabaseSchema;
