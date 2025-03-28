import { useLocation, useParams } from 'react-router-dom';
import { getMoviesByGenreID } from '../Services/GenreServices';
import React, { useEffect, useState } from 'react';
import { Pagination, Container } from 'react-bootstrap';
import MovieCard from '../Components/MovieCard';

/**
 * GenreDetailsPage Component
 *
 * This component displays a list of movies for a specific genre, along with pagination controls.
 * It fetches movies based on the genre ID from the URL parameters and the current page state.
 *
 */

const GenreDetailsPage = () => {
  /**
   * Extracts the genre ID from the URL parameters.
   * @type {number}
   */
  const { id } = useParams();
  /**
   * Extracts the genre name from the location state.
   * starting from useLocation() hook.
   * @type {JSON}
   */
  const location = useLocation();
  const name = location.state.genre.name;
  /**
   * Fetches movies based on the genre ID and current page number.
   * @type {Array}
   */
  const [movies, setMovies] = useState([]);
  /**
   * Tracks the current page number for pagination.
   * @type {number}
   * @default 1
   * @example 1
   */
  const [currentPage, setCurrentPage] = useState(1);
  /**
   * Represents the maximum number of pages available.
   * @type {number}
   */
  const [maxPage] = useState(500);

  /**
   * Fetches a list of movies based on the genre ID and current page number.
   * @function
   * @name fetchGenreDetailsPage
   * @returns {Promise<void>} A promise that resolves when the data is fetched and state is updated.
   */
  useEffect(() => {
    const fetchGenreDetailsPage = async () => {
      try {
        const response = await getMoviesByGenreID(id, currentPage);
        setMovies(response.data.results);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenreDetailsPage();
  }, [currentPage, id]);
  /**
   * Renders the GenreDetailsPage component.
   * @returns {JSX.Element}
   */
  return (
    <Container className='d-flex flex-column align-items-center bg-success'>
      <h1 className='mt-4'>{name}</h1>
      <div className='row justify-content-center flex-wrap gap-2'>
        {movies &&
          movies.map((movie) => {
            return <MovieCard movieCard={movie} key={movie.id} />;
          })}
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

export default GenreDetailsPage;
