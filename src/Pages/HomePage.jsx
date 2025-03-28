import React, { useEffect, useState } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import { getAllMovies } from '../Services/MovieServices';
import MovieCard from '../Components/MovieCard';

/**
 * the HomePage component displays a paginated list of popular movies fetched from an API.
 * It includes a header, a grid of movie cards, and pagination controls for navigation.
 *
 * @returns {jsxComponent} The rendered application component with navigation and routing.
 */
const HomePage = () => {
  /**
   * Stores the list of popular movies fetched from the API.
   * @type {Array}
   * @name movies
   * @default []
   */
  const [movies, setMovies] = useState([]);
  /**
   * Tracks the current page of the pagination.
   * @type {number}
   * @name currentPage
   * @default 1
   */
  const [currentPage, setCurrentPage] = useState(1);
  /**
   * The maximum number of pages available.
   * @type {number}
   * @name maxPage
   * @default 500
   */
  const [maxPage] = useState(500);
  /**
   * useEffect hook to fetch the list of popular movies whenever the currentPage changes.
   * Scrolls the window to the top after fetching the data.
   * Logs an error to the console if the API request fails.
   * @function
   * @name useEffect
   * @param {function} () - The function to execute when the component mounts.
   * @param {Array} [currentPage] - The array of dependencies that trigger the effect when changed.
   * @returns {void}
   */
  useEffect(() => {
    /**
     * Fetches a list of movies from the API and updates the state with the results.
     * Scrolls the window to the top after a short delay.
     * @async
     * @function fetchMovies
     * @returns {Promise<void>} A promise that resolves when the data is fetched and state is updated.
     */
    const fetchMovies = async () => {
      try {
        /**
         * The response object containing the list of popular movies.
         * @type {Object}
         * @name response
         * @default await getAllMovies(currentPage)
         * @throws {Error} Logs an error to the console if the API request fails.
         * @returns {Object} The response object containing the list of popular movies.
         * @example await getAllMovies(currentPage)
         * @see {@link module:Services/MovieServices~getAllMovies}
         */
        const response = await getAllMovies(currentPage);
        /**
         * Updates the state with the list of popular movies fetched from the API.
         * @function
         * @name setMovies
         * @param {Array} response.data.results - The list of popular movies fetched from the API.
         * @returns {void}
         * @example setMovies(response.data.results)
         * @see {@link module:Services/MovieServices~getAllMovies}
         */
        setMovies(response.data.results);
        setTimeout(() => {
          window.scrollTo(0, 0, 'instant');
        }, 100);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [currentPage]);

  /**
   * Renders the HomePage component. a list of popular movies fetched from an API.
   * It includes a header, a grid of movie cards, and pagination controls for navigation.
   * @function
   * @name HomePage
   * @returns {JSX.Element}
   */
  return (
    <Container className='d-flex flex-column mt-5 align-items-center'>
      <h1 className='mt-5'>Movie DB</h1>
      <div className='row justify-content-center flex-wrap gap-2'>
        {
          /**
           * maps through the list of popular movies and renders a MovieCard component for each movie.
           * @function
           * @name movies.map
           * @param {Object} movie - The movie object to render.
           */
          movies.map((movie) => {
            /**
             * Renders a MovieCard component for the movie object.
             * @function
             * @name MovieCard
             * @param {Object} movie - The movie object to render.
             * @param {string} key - The unique key for the movie card component.
             * @returns {JSX.Element} The rendered MovieCard component.
             * @example <MovieCard movieCard={movie} key={movie.id}></MovieCard>
             * @see {@link module:Components/MovieCard~MovieCard}
             */
            return <MovieCard movieCard={movie} key={movie.id}></MovieCard>;
          })
        }
      </div>
      <Pagination className='mt-3'>
        {currentPage > 1 && (
          <>
            <Pagination.First onClick={() => setCurrentPage(1)} />
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
            <Pagination.Item onClick={() => setCurrentPage(1)}>{1}</Pagination.Item>
          </>
        )}
        {currentPage - 5 > 0 && (
          <>
            <Pagination.Ellipsis onClick={() => setCurrentPage(currentPage - 5)} />
          </>
        )}
        {currentPage != 2 && currentPage > 1 && (
          <>
            <Pagination.Item onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</Pagination.Item>
          </>
        )}

        <Pagination.Item active>{currentPage}</Pagination.Item>

        {currentPage + 1 < maxPage && (
          <>
            <Pagination.Ellipsis onClick={() => setCurrentPage(currentPage + 5)} />
          </>
        )}

        {currentPage < maxPage && (
          <>
            <Pagination.Item onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
            <Pagination.Item onClick={() => setCurrentPage(maxPage)}>{maxPage}</Pagination.Item>
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
            <Pagination.Last onClick={() => setCurrentPage(maxPage)} />
          </>
        )}
      </Pagination>
    </Container>
  );
};

export default HomePage;
