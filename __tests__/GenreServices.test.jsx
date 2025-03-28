import { getAllGenres, getMoviesByGenreID } from '../src/Services/GenreServices';
import axios from 'axios';
import { vi, describe, beforeEach, it, expect } from 'vitest';

vi.mock('axios');

describe('GenreServices', () => {
  const mockGenres = {
    genres: [
      { id: 123, name: 'Action' },
      { id: 124, name: 'Adventure' },
    ],
  };

  beforeEach(() => {
    axios.get.mockClear();
  });

  it('should fetch genres with correct URL and headers', async () => {
    axios.get.mockResolvedValueOnce({ data: mockGenres });

    await getAllGenres();

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/genre/movie/list?language=fr',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining('Bearer'),
        }),
      })
    );
  });

  it('should return an array of genres', async () => {
    axios.get.mockResolvedValueOnce({ data: mockGenres });

    const response = await getAllGenres();
    expect(Array.isArray(response.data.genres)).toBe(true);
    expect(response.data.genres).toEqual(mockGenres.genres);
  });

  it('should fetch movies by genre with correct URL and headers', async () => {
    axios.get.mockResolvedValueOnce({ data: mockGenres });

    const id = 123;
    const currentPage = 1;
    await getMoviesByGenreID(id, currentPage);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/discover/movie?language=fr-FR&with_genres=${id}&page=${currentPage}`,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining('Bearer'),
        }),
      })
    );
  });

  it('should return genre movies data on successful request', async () => {
    axios.get.mockResolvedValueOnce({ data: mockGenres });

    const response = await getMoviesByGenreID(123);
    expect(response.data).toEqual(mockGenres);
  });

  it('should throw error on failed request', async () => {
    const error = new Error('Network error');
    axios.get.mockRejectedValueOnce(error);

    await expect(getMoviesByGenreID(123)).rejects.toThrow('Network error');
  });
});
