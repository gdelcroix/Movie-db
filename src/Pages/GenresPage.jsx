import React, { useState, useEffect, useMemo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getAllGenres } from '../Services/GenreServices';
import GenreCard from '../Components/GenreCard';

/**
 * GenresPage component fetches and displays a list of movie genres.
 *
 * This component uses React hooks such as `useState`, `useEffect`, and `useMemo` to manage
 * and optimize the rendering of genres. It fetches the genres from an API using the `getAllGenres` function
 * and displays them in a responsive layout using Bootstrap components.
 *
 * @returns {JSX.Element} The rendered GenresPage component.
 *
 * @example
 *   return <GenresPage />;
 */
const GenresPage = () => {
  /**
   * Stores the list of genres fetched from the API.
   * @type {Array}
   */
  const [genres, setGenres] = useState([]);

  /**
   * Fetches the list of genres from the API when the component mounts.
   * @function
   * @name fetchGenres
   * @returns {Promise<void>} A promise that resolves when the data is fetched and state is updated.
   */
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getAllGenres();
        setGenres(response.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenres();
  }, []);
  /**
   * Memoizes the genres array to optimize rendering.
   * @type {Array}
   * @default genres
   * @example genres
   *
   */
  const memoizedGenres = useMemo(() => genres, [genres]);
  /**
   * Renders the GenresPage component.
   *
   * @returns {JSX.Element}
   */
  return (
    <Container className='d-flex flex-column align-items-center'>
      <Row className='mt-5'>
        <Col className='col-3'>
          <h2>Genres</h2>
        </Col>
      </Row>
      <Row className='mt-5 justify-content-center flex-wrap gap-4'>
        {memoizedGenres &&
          memoizedGenres.map((genre) => {
            return (
              <GenreCard genre={genre} key={genre.id}>
                {genre.name}
              </GenreCard>
            );
          })}
      </Row>
    </Container>
  );
};

export default GenresPage;
