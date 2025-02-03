import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ManageUsers from '../manageUsers';
import * as adminApi from '../../api/adminApi';
import * as mainApi from '../../api/mainApi';

jest.mock('../../api/adminApi');
jest.mock('../../api/mainApi');

describe('ManageUsers Component', () => {
  const mockUserNames = [
    { username: 'user1' },
    { username: 'user2' }
  ];

  const mockAreaNames = [
    { area_id: '1', area_name: 'PostgreSQL' },
    { area_id: '2', area_name: 'MongoDB' }
  ];

  const mockUserData = [
    {
      data_id: 1,
      statement_id: 1,
      query_text: 'SELECT * FROM users',
      is_executable: true,
      result_size: 10,
      is_correct: true,
      partial_solution: 'test',
      difficulty_level: 'medium',
      processing_time: 300
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set up mock implementations
    adminApi.fetchUserNames.mockResolvedValue(mockUserNames);
    mainApi.fetchAreaNames.mockResolvedValue(mockAreaNames);
    adminApi.fetchUserTaskData.mockResolvedValue(mockUserData);
    adminApi.deleteUserData.mockResolvedValue({ success: true });
    adminApi.deleteAllUserData.mockResolvedValue({ success: true });
  });

  test('renders user management interface with loading state', async () => {
    await act(async () => {
      render(<ManageUsers />);
    });
    
    // First verify loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for loading to complete and content to render
    await waitFor(() => {
      expect(screen.getByText('Admin User Management Interface')).toBeInTheDocument();
    });
  });

  test('loads and displays user data when data exists', async () => {
    await act(async () => {
      render(<ManageUsers />);
    });

    // Wait for initial data loading
    await waitFor(() => {
      expect(adminApi.fetchUserNames).toHaveBeenCalled();
      expect(mainApi.fetchAreaNames).toHaveBeenCalled();
    });

    // Verify important UI elements are present
    expect(screen.getByText('User List')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  test('handles delete functionality', async () => {
    const user = userEvent.setup();
    
    await act(async () => {
      render(<ManageUsers />);
    });

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('User List')).toBeInTheDocument();
    });

    // Find and click the delete button using the icon role
    const deleteButton = screen.getByRole('button', { name: /delete all data/i });
    await user.click(deleteButton);

    // Verify confirmation dialog appears
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);

    // Verify deletion was called
    expect(adminApi.deleteAllUserData).toHaveBeenCalled();
  });

  test('handles API errors gracefully', async () => {
    // Mock API error
    mainApi.fetchAreaNames.mockRejectedValue(new Error('Failed to fetch'));
    
    await act(async () => {
      render(<ManageUsers />);
    });

    // Verify error message appears
    await waitFor(() => {
      expect(screen.getByText(/error fetching user data/i)).toBeInTheDocument();
    });
  });
});