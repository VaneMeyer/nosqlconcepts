import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MongoSchema = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const schema = [
    {
      collection: 'email',
      attributes: ['_id', 'ID', 'MESSAGE_BODY', 'MESSAGE_DATE', 'MESSAGE_FROM', 'MESSAGE_SUBJECT'],
    },
    {
      collection: 'person',
      attributes: ['_id', 'id', 'firstname', 'middlename', 'lastname', 'works_in', 'salary', 'email_address'],
    },
    {
      collection: 'department',
      attributes: ['_id', 'id', 'name', 'location'],
    },
    {
      collection: 'knows',
      attributes: ['_id', 'pid1', 'pid2'],
    },
    {
      collection: 'to',
      attributes: ['_id', 'id', 'email'],
    },
    {
      collection: 'cc',
      attributes: ['_id', 'id', 'email'],
    },
  ];

  return (
    <div>
        <Typography variant='h5'>Collections</Typography>
      {schema.map((item, index) => (
        <Accordion key={index} defaultExpanded={!isMobile}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{item.collection}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {item.attributes.map((attribute, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={attribute} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MongoSchema;
