import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, FormControl, TextField, InputLabel,
  Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, Paper, Box
} from '@mui/material';
import { fetchData, addUser, updateUser, fetchUserByUsername, deleteUser } from '../../api/adminEditUserApi'; 
import EditUserDialog from './EditUserDialog';
import UserDeleteDialog from './UserDeleteDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

function CreateUpdateUser({ open, onClose }) {
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');


  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      if (user_name.trim() === '') {
        setError('The username must not be empty.');
        return;
      }

      if (password.trim() === '') {
        setError('The password must not be empty.');
        return;
      }

      if (/\s/.test(user_name)) {
        setError('The username must not contain any spaces.');
        return;
      }

      // Check if the username already exists
      const userExists = await checkUsernameExists(user_name);
      if (userExists) {
        setError('The username already exists. Please choose a different username.');
        return;
      }

      // Add the new user
      const newUser = { user_name, password, role };
      await addUser(newUser);
      setUsername('');
      setPassword('');
      setRole('user');
      onClose();
      setError('');
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Error adding user. Please try again.');
    }
  };

const checkUsernameExists = async (username) => {
  try {
    const user = await fetchUserByUsername(username);
    return user !== null; // Returns true if user exists, otherwise false
  } catch (error) {
    console.error('Error at getting user information from backend:', error);
    throw error; // redirect error to handleAddUser
  }
};


const handleClose = () => {
    setUsername('');
    setPassword('');
    setRole('user');
    setError('');
    onClose();
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleAddUser}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Username"
              variant="filled"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Password"
              variant="filled"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="user">Student</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Create User
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditUser() {
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('user_name');
  const [filter, setFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDeleteUserDialog = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    fetchDataFromServer(); 
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
    fetchDataFromServer(); 
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
    fetchDataFromServer(); 
  };

  const fetchDataFromServer = async () => {
    try {
      const result = await fetchData();
      setData(result);
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleSaveUser = async (editedUser) => {
    try {
      console.log('Save user:', editedUser);
      await updateUser(editedUser); // Use updateUser to save changes to the backend
      fetchDataFromServer(); // Refresh the data from the server after updating the user
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (editedUser) => {
    try {
      console.log('Delete user:', editedUser);
      await deleteUser(editedUser.user_name); 
      fetchDataFromServer(); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };  

  const filteredData = data.filter((user) =>
  (user.user_name.toLowerCase().includes(filter.toLowerCase()) ||
  user.role.toLowerCase().includes(filter.toLowerCase())) &&
  (roleFilter === '' || user.role === roleFilter)
  );


  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'user_name') {
      if (order === 'asc') {
        return a.user_name.localeCompare(b.user_name);
      } else {
        return b.user_name.localeCompare(a.user_name);
      }
    } else if (orderBy === 'role') {
      if (order === 'asc') {
        return a.role.localeCompare(b.role);
      } else {
        return b.role.localeCompare(a.role);
      }
    }
    return 0;
  });

  return (
    <Container maxWidth="md" style={{ marginTop: '20px', position: 'relative' }}>
  <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px' }}>
    Create or Edit Users
  </Typography>
{/*   <Button
    variant="contained"
    color="primary"
    onClick={handleLogout}
    style={{ position: 'absolute', top: '10px', right: '10px' }}
  >
    Logout
  </Button> */}
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    style={{ marginTop: '40px' }} 
  >
    <Button
      variant="contained"
      color="primary"
      onClick={handleOpenDialog}
      startIcon={<AddIcon />}
      style={{ marginBottom: '10px', width: '100%', maxWidth: '200px' }}
    >
      Create User
    </Button>
  </Box>
  <CreateUpdateUser open={dialogOpen} onClose={handleCloseDialog} />
  <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }} align="center">
    User List
  </Typography>
  <Box display="flex" alignItems="center" width="100%">
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      margin="normal"
      value={filter}
      onChange={handleFilterChange}
      style={{ flex: 8 }} // Search takes 80% of the width
    />
    <FormControl variant="outlined" fullWidth="false" margin="normal" style={{ flex: 2, marginLeft: '10px', minWidth: 60 }}>
      <InputLabel>Filter Role</InputLabel>
      <Select
        value={roleFilter}
        onChange={handleRoleFilterChange}
        label="Filter Role"
        startAdornment={<FilterListIcon />}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="user">Student</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
    </FormControl>
  </Box>
  <TableContainer component={Paper} style={{ marginTop: '20px' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'user_name'}
              direction={order}
              onClick={() => handleRequestSort('user_name')}
            >
              Username
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'role'}
              direction={order}
              onClick={() => handleRequestSort('role')}
            >
              Role
            </TableSortLabel>
          </TableCell>
          <TableCell> </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.user_name}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell align="center">
              <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
                <Button variant="outlined" color="primary" onClick={() => handleEditUser(user)}>
                  <EditIcon />
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleDeleteUserDialog(user)}>
                  <DeleteIcon />
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <EditUserDialog
    open={editDialogOpen}
    onClose={handleCloseEditDialog}
    user={selectedUser}
    onSave={handleSaveUser}
  />
  <UserDeleteDialog
    open={deleteDialogOpen}
    onClose={handleCloseDeleteDialog}
    user={selectedUser}
    onSave={handleDeleteUser}
  />
</Container>
  );
}

export default EditUser;
