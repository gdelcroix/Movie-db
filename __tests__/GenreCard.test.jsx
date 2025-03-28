import React from 'react';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GenreCard from '../src/Components/GenreCard';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('GenreCard', () => {
  const mockNavigate = vi.fn();
  useNavigate.mockReturnValue(mockNavigate);

  const mockGenre = {
    id: 28,
    name: 'Action',
  };

  test('renders genre name correctly', () => {
    render(<GenreCard genre={mockGenre} />);

    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('navigates to genre details on button click', () => {
    render(<GenreCard genre={mockGenre} />);

    const button = screen.getByText('Explorer');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/genre/28', {
      state: { genre: mockGenre },
    });
  });
});
