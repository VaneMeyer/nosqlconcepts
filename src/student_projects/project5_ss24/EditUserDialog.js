import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, FormControl, TextField, InputLabel, Select, MenuItem
} from '@mui/material';

function EditUserDialog({ open, onClose, user, onSave }) {
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };


  const handleSave = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Username"
            variant="filled"
            name="user_name"
            value={editedUser.user_name}
            onChange={handleInputChange}
            disabled
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Password"
            variant="filled"
            type="password"
            name="password"
            value={editedUser.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
          <Select
            value={editedUser.role || ''}
            onChange={handleInputChange}
            name="role"
          >
            <MenuItem value="user">Student</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUserDialog;
