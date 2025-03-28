import React from 'react';
import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from '../src/Components/MovieCard';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('MovieCard', () => {
  const mockNavigate = vi.fn();
  useNavigate.mockReturnValue(mockNavigate);

  const mockMovie = {
    id: 123,
    title: 'Inception',
    poster_path: '/inception.jpg',
  };

  it('renders movie details correctly', () => {
    render(<MovieCard movieCard={mockMovie} />);

    expect(screen.getByText('Inception')).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/inception.jpg');
    expect(img).toHaveAttribute('alt', 'image de Inception');
  });

  it('navigates to movie details on button click', () => {
    render(<MovieCard movieCard={mockMovie} />);

    const button = screen.getByText('Voir plus');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/movie/123');
  });
});
