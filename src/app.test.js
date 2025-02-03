import React from 'react';
import { render, screen } from '@testing-library/react';
import AppNewLayout from './App';
import { act } from '@testing-library/react';

jest.mock('./api/auth', () => ({
  checkAuth: jest.fn(() => Promise.resolve({ role: 'user' }))
}));

describe('AppNewLayout', () => {
  test('renders without crashing', async () => {
    await act(async () => {
      render(<AppNewLayout />);
    });
    
    // Instead of looking for a generic "Loading..." text, we can:
    // 1. Either check for all loading states
    const loadingElements = screen.getAllByText('Loading...');
    expect(loadingElements.length).toBeGreaterThan(0);
    
    // 2. Or be more specific by finding the loading text within a specific section
    const taskOverviewSection = screen.getByText('Task Overview').closest('div');
    expect(taskOverviewSection).toHaveTextContent('Loading...');
  });
});