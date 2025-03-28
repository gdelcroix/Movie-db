import axios from 'axios';

const BEARER = import.meta.env.VITE_BEARER;
/**
 * Service module for handling TMDB people-related API requests
 * @module PeopleServices
 */

/**
 * Fetches popular people from TMDB API
 * @param {number} currentPage - The page number to fetch
 * @returns {Promise<Object>} Axios response containing popular people data
 */
function getPopularPeople(currentPage) {
  return axios.get('https://api.themoviedb.org/3/person/popular?page=' + currentPage, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${BEARER}`,
    },
  });
}
/**
 * Fetches a specific person's short infos by their ID
 * @param {number} id - The TMDB ID of the person
 * @returns {Promise<Object>} Axios response containing person details in French
 */
function getPeopleByID(id) {
  return axios.get('https://api.themoviedb.org/3/person/' + id + '?language=fr-FR', {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${BEARER}`,
    },
  });
}
/**
 * Searches for a person details by name and filters by ID to handle homonyms
 * @param {string} pName - The name of the person to search for
 * @param {number} pId - The TMDB ID to filter homonyms
 * @returns {Promise<Object>} The matching person object or undefined if not found
 * @throws {Error} If the API request fails
 */
async function getPeopleByName(pName, pId) {
  if (pName) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${BEARER}`,
        },
      };
      let requestedURL = 'https://api.themoviedb.org/3/search/person?query=' + pName + '&language=fr-FR';
      const response = await axios.get(requestedURL, options);
      const homonymyFilter = response.data.results.filter((person) => person.id === pId);
      return homonymyFilter[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export { getPopularPeople, getPeopleByID, getPeopleByName };
