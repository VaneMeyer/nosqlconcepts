import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ManageExercises from '../manageExercises';
import * as adminApi from '../../api/adminApi';
import { act } from 'react-dom/test-utils';

// Mock the entire adminApi module
jest.mock('../../api/adminApi', () => ({
  fetchExercises: jest.fn(),
  fetchAreaNames: jest.fn(),
  addExercise: jest.fn(),
  deleteExercise: jest.fn(),
  updateExercise: jest.fn()
}));

// Suppress console.error during tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('ManageExercises Component', () => {
  const mockExercises = [{
    statement_id: 1,
    area_id: 'pg1',
    area_name: 'PostgreSQL',
    statement_text: 'Find all users',
    topic: 'Basic Select',
    subtasknumber: '1.1',
    maxtime: '30m'
  }];

  const mockAreaNames = [{
    area_id: 'pg1',
    area_name: 'PostgreSQL'
  }];

  beforeEach(() => {
    jest.clearAllMocks();
    adminApi.fetchExercises.mockResolvedValue(mockExercises);
    adminApi.fetchAreaNames.mockResolvedValue(mockAreaNames);
    adminApi.deleteExercise.mockResolvedValue({ success: true });
    adminApi.addExercise.mockResolvedValue({ success: true });
  });

  test('renders exercises table with data', async () => {
    await act(async () => {
      render(<ManageExercises />);
    });

    await waitFor(() => {
      expect(screen.getByText('Find all users')).toBeInTheDocument();
      expect(adminApi.fetchExercises).toHaveBeenCalled();
    });
  });

  test('opens add exercise dialog', async () => {
    await act(async () => {
      render(<ManageExercises />);
    });

    const addButton = screen.getByRole('button', {
      name: /add exercise/i
    });
    
    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(/^area/i)).toBeInTheDocument();
  });

  test('handles exercise deletion', async () => {
    await act(async () => {
      render(<ManageExercises />);
    });

    // Wait for table to render
    await waitFor(() => {
      expect(screen.getByText('Find all users')).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId('DeleteIcon').closest('button');

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    const confirmButton = screen.getByRole('button', { 
      name: /confirm/i 
    });

    await act(async () => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(adminApi.deleteExercise).toHaveBeenCalled();
    });
  });

  test('filters exercises by area', async () => {
    await act(async () => {
      render(<ManageExercises />);
    });

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Find all users')).toBeInTheDocument();
    });

    const filterSelect = screen.getByLabelText(/filter by area/i);

    // Open select dropdown
    await act(async () => {
      fireEvent.mouseDown(filterSelect);
    });

    // Find and click PostgreSQL option
    const option = screen.getByRole('option', { 
      name: /postgresql/i 
    });

    await act(async () => {
      fireEvent.click(option);
    });

    // Verify filtered results
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(2); // Header + 1 filtered row
    });
  });
});