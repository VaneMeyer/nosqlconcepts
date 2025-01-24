import React from 'react';
import { render, screen } from '@testing-library/react';
import AppNewLayout from './App';
import { BrowserRouter } from 'react-router-dom';
import { act } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
 ...jest.requireActual('react-router-dom'), 
 BrowserRouter: ({ children }) => children,
 Routes: ({ children }) => children,
 Route: ({ children }) => children,
}));

jest.mock('./api/auth', () => ({
 checkAuth: jest.fn(() => Promise.resolve({ role: 'user' }))
}));

describe('AppNewLayout', () => {
 test('renders without crashing', async () => {
  await act( async () => {
    render(<BrowserRouter><AppNewLayout /></BrowserRouter>);
  })
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});