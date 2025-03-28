import React from 'react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import GenreDetailsPage from '../src/Pages/GenreDetailsPage';
import { getMoviesByGenreID } from '../src/Services/GenreServices';
import '@testing-library/jest-dom';

// Mock des services et des hooks
vi.mock('../src/Services/GenreServices', () => ({
  getMoviesByGenreID: vi.fn(),
}));

const mockGenre = { id: 123, name: 'Action' };
vi.mock('react-router-dom', () => ({
  ...vi.requireActual('react-router-dom'),
  useParams: () => ({ id: 123 }),
  useLocation: () => ({
    state: {
      genre: mockGenre,
    },
  }),
}));

describe('GenreDetailsPage', () => {
  const mockMovies = {
    data: {
      results: [
        { id: 1, title: 'Movie 1', poster_path: '/path1.jpg', release_date: '2021-01-01', overview: 'Overview 1' },
        { id: 2, title: 'Movie 2', poster_path: '/path2.jpg', release_date: '2021-02-01', overview: 'Overview 2' },
      ],
    },
  };

  beforeEach(() => {
    getMoviesByGenreID.mockResolvedValue(mockMovies); // Mock des réponses de l'API
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the genre name', () => {
    render(
      <Router>
        <GenreDetailsPage />
      </Router>
    );

    // Vérifie que le nom du genre est affiché correctement
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('should fetch and render movies correctly', async () => {
    render(
      <Router>
        <GenreDetailsPage />
      </Router>
    );

    // Vérifie que l'appel à l'API est effectué et les films sont rendus
    await waitFor(() => expect(getMoviesByGenreID).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('should navigate to the correct page when a pagination item is clicked', async () => {
    render(
      <Router>
        <GenreDetailsPage />
      </Router>
    );

    // Vérifie que la pagination fonctionne correctement
    const nextButton = screen.getByText('Next');
    act(() => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      expect(getMoviesByGenreID).toHaveBeenCalledWith('123', 2); // Vérifie que la page suivante est appelée
    });

    const mockMoviesResponsePage2 = {
      data: {
        results: [
          { id: 3, title: 'Movie 3' },
          { id: 4, title: 'Movie 4' },
        ],
      },
    };
    getMoviesByGenreID.mockResolvedValue(mockMoviesResponsePage2);

    // Vérifie que les films de la deuxième page sont affichés
    await waitFor(() => {
      expect(screen.getByText('Movie 3')).toBeInTheDocument();
      expect(screen.getByText('Movie 4')).toBeInTheDocument();
    });
  });

  it('should render pagination correctly and handle page changes', async () => {
    render(
      <Router>
        <GenreDetailsPage />
      </Router>
    );

    // Vérifie que la pagination est bien rendue avec les numéros de page corrects
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    // Simule un clic sur le bouton "Next" pour changer de page
    act(() => {
      fireEvent.click(screen.getByText('Next'));
    });

    await waitFor(() => expect(getMoviesByGenreID).toHaveBeenCalledWith('123', 2)); // Vérifie que la page suivante est appelée
  });

  it('should handle API errors gracefully', async () => {
    getMoviesByGenreID.mockRejectedValueOnce(new Error('API error'));

    render(
      <Router>
        <GenreDetailsPage />
      </Router>
    );

    // Vérifie qu'il n'y a pas d'erreur dans le rendu, même si l'API échoue
    await waitFor(() => expect(getMoviesByGenreID).toHaveBeenCalledTimes(1));
  });
});
