import axios from 'axios';

const BEARER = import.meta.env.VITE_BEARER;

/**
 * Fetches all movie genres from the Movie Database API.
 *
 * @returns {Promise<Object>} A promise that resolves to the response object containing the list of genres.
 * @throws {Error} Throws an error if the request fails.
 */
function getAllGenres() {
  return axios.get('https://api.themoviedb.org/3/genre/movie/list?language=fr', {
    headers: {
      Authorization: `Bearer ${BEARER}`,
    },
  });
}

/**
 * Fetches movies by a specific genre ID and page number.
 *
 * @param {number|string} id - The ID of the genre to filter movies by.
 * @param {number} currentPage - The current page number for pagination.
 * @returns {Promise} A promise that resolves to the response of the API call.
 */
function getMoviesByGenreID(id, currentPage) {
  return axios.get(
    'https://api.themoviedb.org/3/discover/movie?language=fr-FR&with_genres=' + id + '&page=' + currentPage,
    {
      headers: {
        Authorization: `Bearer ${BEARER}`,
      },
    }
  );
}

export { getAllGenres, getMoviesByGenreID };
