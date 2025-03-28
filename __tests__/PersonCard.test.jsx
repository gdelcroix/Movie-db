import React from 'react';
import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonCard from '../src/Components/PersonCard';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('PersonCard', () => {
  const mockNavigate = vi.fn();
  useNavigate.mockReturnValue(mockNavigate);

  const mockPerson = {
    id: 1,
    name: 'Test Person',
    profile_path: '/test-path.jpg',
  };

  it('renders person name and image correctly', () => {
    render(<PersonCard personCard={mockPerson} />);

    // Vérifie si le texte s'affiche
    expect(screen.getByText('Test Person')).toBeInTheDocument();

    // Vérifie si l'image s'affiche avec le bon src et alt
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/test-path.jpg');
    expect(img).toHaveAttribute('alt', 'image de Test Person');
  });

  it('navigates to person details on button click', () => {
    render(<PersonCard personCard={mockPerson} />);

    const button = screen.getByText('Voir plus');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/people/1', {
      state: { person: mockPerson },
    });
  });
});
