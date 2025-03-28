import axios from 'axios';

const BEARER = import.meta.env.VITE_BEARER;
/**
 * Fetches a list of movies from The Movie Database (TMDb) API for a given page.
 *
 * @param {number} currentPage - The page number to fetch movies for.
 * @returns {Promise<Object>} A promise that resolves to the response object containing movie data.
 */
function getAllMovies(currentPage) {
  return axios.get('https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=' + currentPage, {
    headers: {
      Authorization: `Bearer ${BEARER}`,
    },
  });
}

/**
 * Fetches detailed information about a movie by its ID from The Movie Database (TMDb) API.
 *
 * @async
 * @function
 * @param {number|string} id - The ID of the movie to fetch.
 * @returns {Promise<Object>} A promise that resolves to the movie details, including credits and images.
 * @throws {Error} Throws an error if the API request fails.
 */
async function getMovieByID(id) {
  try {
    const completeResp = await axios.get(
      'https://api.themoviedb.org/3/movie/' +
        id +
        '?language=fr-FR&append_to_response=credits,images&include_image_language=fr,en,null',
      {
        headers: {
          Authorization: `Bearer ${BEARER}`,
        },
      }
    );
    return completeResp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getAllMovies, getMovieByID };
