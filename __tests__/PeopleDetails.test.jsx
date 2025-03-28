import React from 'react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PeopleDetailsPage from '../src/Pages/PeopleDetailsPage';
import { getPeopleByID, getPeopleByName } from '../src/Services/PeopleServices';
import '@testing-library/jest-dom';

// Mock des services et des hooks
vi.mock('../src/Services/PeopleServices', () => ({
  getPeopleByID: vi.fn(),
  getPeopleByName: vi.fn(),
}));

// Mock pour useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: {
      person: {
        id: 1,
        name: 'Actor Name',
        profile_path: 'profile_path.jpg',
        known_for_department: 'Acting',
        known_for: [
          { id: 1, title: 'Movie 1', media_type: 'movie' },
          { id: 2, title: 'Movie 2', media_type: 'movie' },
        ],
      },
    },
  }),
  useParams: () => ({ id: '1' }),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

describe('PeopleDetailsPage', () => {
  const mockPerson = {
    name: 'Actor Name',
    birthday: '1990-01-01',
    place_of_birth: 'Some City',
    deathday: null,
    biography: 'Some biography',
  };

  beforeEach(() => {
    getPeopleByName.mockResolvedValueOnce(mockPerson);
    getPeopleByID.mockResolvedValueOnce({ data: mockPerson });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render person name and profile image', () => {
    render(
      <Router>
        <PeopleDetailsPage />
      </Router>
    );

    // Vérifie que le nom et l'image de la personne sont rendus
    expect(screen.findByText('Actor Name')).toBeInTheDocument();
    expect(screen.getByAltText('image de Some biography')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/profile_path.jpg'
    );
  });

  it('should render known for department and movies correctly', async () => {
    render(
      <Router>
        <PeopleDetailsPage />
      </Router>
    );

    // Vérifie que la catégorie "Connu dans" et les films sont correctement affichés
    expect(screen.getByText('Connu dans la catégorie : Acting')).toBeInTheDocument();
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('should navigate to the movie page when a movie button is clicked', async () => {
    render(
      <Router>
        <PeopleDetailsPage />
      </Router>
    );

    const movieButton = screen.getByText('Movie 1');
    fireEvent.click(movieButton);

    // Vérifie que la navigation vers la page du film est effectuée
    expect(mockNavigate).toHaveBeenCalledWith('/movie/1');
  });

  it('should render biography and personal info', async () => {
    render(
      <Router>
        <PeopleDetailsPage />
      </Router>
    );

    // Vérifie que la biographie et les infos personnelles sont rendues
    expect(screen.getByText('Date de naissance : 1990-01-01')).toBeInTheDocument();
    expect(screen.getByText('Lieu de naissance : Some City')).toBeInTheDocument();
    expect(screen.getByText('Biographie : Some biography')).toBeInTheDocument();
  });

  it('should handle API errors gracefully', async () => {
    getPeopleByName.mockRejectedValueOnce(new Error('API error'));

    render(
      <Router>
        <PeopleDetailsPage />
      </Router>
    );

    // Vérifie que l'erreur API ne brise pas le rendu
    await waitFor(() => expect(getPeopleByName).toHaveBeenCalledTimes(1));
  });
});
