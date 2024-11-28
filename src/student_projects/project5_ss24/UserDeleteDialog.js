import React, { useState , useEffect} from 'react';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, FormControl, Typography
} from '@mui/material';

function UserDeleteDialog({ open, onClose, user, onSave }) {
  const [deletedUser, setDeletedUser] = useState({ ...user });

  useEffect(() => {
    setDeletedUser({ ...user });
  }, [user]);

  const handleDelete = () => {
    onSave(deletedUser);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`Delete User ${deletedUser.user_name}`}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure that you want to delete user "{deletedUser.user_name}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleDelete} color="primary">Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDeleteDialog;

