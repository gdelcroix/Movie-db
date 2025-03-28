import React from 'react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieDetailsPage from '../src/Pages/MovieDetailsPage';
import { getMovieByID } from '../src/Services/MovieServices';
import '@testing-library/jest-dom';

// Mock des services et des hooks
vi.mock('../src/Services/MovieServices', () => ({
  getMovieByID: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({ 
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }) => <div>{children}</div>,
 }));

describe('MovieDetailsPage', () => {
  const mockMovie = {
    title: 'Test Movie',
    release_date: '2021-01-01',
    overview: 'Test movie overview',
    genres: [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Drama' },
    ],
    credits: {
      cast: [
        { id: 1, name: 'Actor 1' },
        { id: 2, name: 'Actor 2' },
      ],
    },
    images: {
      posters: [
        { iso_639_1: 'en', file_path: 'path-en.jpg' },
        { iso_639_1: 'fr', file_path: 'path-fr.jpg' },
      ],
    },
  };

  beforeEach(() => {
    getMovieByID.mockResolvedValueOnce(mockMovie); // Mock des réponses de l'API
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render movie title and poster', async () => {
    render(
      <Router>
        <MovieDetailsPage />
      </Router>
    );

    // Vérifie que le titre du film et l'affiche sont correctement rendus
    expect(await screen.findByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByAltText('image de Test Movie')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/path-fr.jpg'
    );
  });

  it('should render movie release date and genres correctly', async () => {
    render(
      <Router>
        <MovieDetailsPage />
      </Router>
    );

    // Vérifie que la date de sortie et les genres sont bien affichés
    expect(screen.getByText('Date de Sortie : 2021-01-01')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
  });

  it('should navigate to the genre page when genre button is clicked', async () => {
    render(
      <Router>
        <MovieDetailsPage />
      </Router>
    );

    const genreButton = screen.getByText('Action');
    fireEvent.click(genreButton);

    // Vérifie que la navigation fonctionne correctement pour le genre
    expect(mockNavigate).toHaveBeenCalledWith('/genre/1', {
      state: { genre: { id: 1, name: 'Action' } },
    });
  });

  it('should navigate to the person details page when actor button is clicked', async () => {
    render(
      <Router>
        <MovieDetailsPage />
      </Router>
    );

    const actorButton = screen.getByText('Actor 1');
    fireEvent.click(actorButton);

    // Vérifie que la navigation fonctionne correctement pour l'acteur
    expect(mockNavigate).toHaveBeenCalledWith('/people/1', {
      state: { person: { id: 1, name: 'Actor 1' } },
    });
  });

  it('should render movie overview', async () => {
    render(
      <Router>
        <MovieDetailsPage />
      </Router>
    );

    // Vérifie que le synopsis du film est bien affiché
    expect(await screen.findByText('Test movie overview')).toBeInTheDocument();
  });

  it('should handle API errors gracefully', async () => {
    getMovieByID.mockRejectedValueOnce(new Error('API error'));

    render(
      <Router>
        <MovieDetailsPage />
      </Router>
    );

    // Vérifie que l'erreur API ne brise pas le rendu
    await waitFor(() => expect(getMovieByID).toHaveBeenCalledTimes(1));
  });
});
