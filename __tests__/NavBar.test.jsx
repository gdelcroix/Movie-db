import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '../src/Components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('NavBar', () => {
  it('renders Navbar with links', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    // Vérifie que les liens "Home", "Genres" et "Acteurs" sont présents
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Genres')).toBeInTheDocument();
    expect(screen.getByText('Acteurs')).toBeInTheDocument();
  });

  it('navigates to the correct page when links are clicked', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    // Simule un clic sur les liens et vérifie la navigation
    fireEvent.click(screen.getByText('Home'));
    expect(window.location.pathname).toBe('/'); // Vérifie que la navigation a eu lieu vers la page d'accueil

    fireEvent.click(screen.getByText('Genres'));
    expect(window.location.pathname).toBe('/genres'); // Vérifie que la navigation a eu lieu vers "/genres"

    fireEvent.click(screen.getByText('Acteurs'));
    expect(window.location.pathname).toBe('/people'); // Vérifie que la navigation a eu lieu vers "/people"
  });

  it('displays Navbar brand link correctly', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    // Vérifie que le lien de la marque redirige vers la page d'accueil
    const brandLink = screen.getByText('Home');
    expect(brandLink).toHaveAttribute('href', '/');
  });
});
