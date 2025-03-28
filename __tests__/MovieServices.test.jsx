import { getAllMovies, getMovieByID } from '../src/Services/MovieServices';
import axios from 'axios';
import { vi, describe, beforeEach, it, expect } from 'vitest';

vi.mock('axios');

describe('MovieServices', () => {
  const mockMovies = {
    results: [
      { id: 1, title: 'Film Test 1' },
      { id: 2, title: 'Film Test 2' },
    ],
  };

  const mockMovieDetails = {
    id: 1,
    title: 'Film Test 1',
    credits: { cast: [] },
    images: { backdrops: [] },
  };

  beforeEach(() => {
    axios.get.mockClear();
  });

  it('should fetch all movies with correct URL and headers', async () => {
    axios.get.mockResolvedValueOnce({ data: mockMovies });

    const currentPage = 1;
    await getAllMovies(currentPage);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=${currentPage}`,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining('Bearer'),
        }),
      })
    );
  });

  it('should return an array of movies', async () => {
    axios.get.mockResolvedValueOnce({ data: mockMovies });

    const response = await getAllMovies(1);
    expect(Array.isArray(response.data.results)).toBe(true);
    expect(response.data.results).toEqual(mockMovies.results);
  });

  it('should fetch movie details with correct URL and headers', async () => {
    axios.get.mockResolvedValueOnce({ data: mockMovieDetails });

    const id = 1;
    await getMovieByID(id);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/movie/${id}?language=fr-FR&append_to_response=credits,images&include_image_language=fr,en,null`,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining('Bearer'),
        }),
      })
    );
  });

  it('should return movie details', async () => {
    axios.get.mockResolvedValueOnce({ data: mockMovieDetails });

    const response = await getMovieByID(1);
    expect(response).toEqual(mockMovieDetails);
  });

  it('should throw error on failed request for getAllMovies', async () => {
    const error = new Error('Network error');
    axios.get.mockRejectedValueOnce(error);

    await expect(getAllMovies(1)).rejects.toThrow('Network error');
  });

  it('should throw error on failed request for getMovieByID', async () => {
    const error = new Error('dummy error');
    axios.get.mockRejectedValueOnce(error);

    await expect(getMovieByID(1)).rejects.toThrow('dummy error');
  });
});
