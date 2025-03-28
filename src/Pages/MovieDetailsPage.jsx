import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieByID } from '../Services/MovieServices';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

/**
 * MovieDetailsPage Component
 *
 * This component displays detailed information about a specific movie, including its title, release date, genres, synopsis, and cast.
 * It fetches movie data from an API using the movie ID obtained from the URL parameters.
 * Users can navigate to genre-specific pages or individual cast member pages by clicking on the respective buttons.
 */
const MovieDetailsPage = () => {
  /**
   * Stores the movie poster link URL parameter for the img concatenation.
   * @name mainPoster
   * @type {string}
   * @example /123efaez.jpg
   * @default []
   */
  const [mainPoster, setMainPoster] = useState([]);
  /**
   * Extracts the movie ID from the URL parameters.
   * @name id
   * @type {number}
   * @example 123
   * @default null
   */
  const { id } = useParams();
  /**
   * Stores the movie data fetched from the API.
   * @name movie
   * @type {Object}
   * @example { id: 123, title: 'Movie Title', release_date: '2021-01-01', genres: [{ id: 1, name: 'Action' }], overview: 'Movie Synopsis' }
   * @default {}
   */
  const [movie, setMovie] = useState({});
  /**
   * import of the useNavigate hook from the react-router-dom library.
   * @name useNavigate
   * @type {function}
   */
  const navigate = useNavigate();
  /**
   * generate a navigation to the genre page based on the genre ID from json object genre.
   * @function navigateGenre
   * @param {object} genre
   * @returns {void}
   * @example navigate('/genre/1', { state: { genre: { id: 1, name: 'Action' } } });
   */
  const navigateGenre = (genre) => {
    navigate('/genre/' + genre.id, { state: { genre: genre } });
  };
  /**
   * navigate to the people page based on the person ID from json object person.
   * @function navigatePeople
   * @param {object} person
   * @returns {void}
   * @example navigate('/people/1', { state: { person: { id: 1, name: 'John Doe' } } });
   */
  const navigatePeople = (person) => {
    navigate('/people/' + person.id, { state: { person: person } });
  };

  useEffect(() => {
    /**
     * Fetches movie details by ID and updates the state with the movie data.
     * It also determines the main poster image based on the available posters
     * and their language codes ('fr', 'null', 'en') or falls back to the default poster path.
     *
     * @async
     * @function fetchMovieByID
     * @throws Will log an error to the console if the fetch operation fails.
     */
    const fetchMovieByID = async () => {
      try {
        const response = await getMovieByID(id);
        setMovie(response);
        if (response.images && response.images.posters) {
          const posters = response.images.posters;
          let filterPosters =
            posters.find((poster) => poster.iso_639_1 === 'fr') ||
            posters.find((poster) => poster.iso_639_1 === 'null') ||
            posters.find((poster) => poster.iso_639_1 === 'en');
          if (!filterPosters) {
            filterPosters = response.poster_path;
          } else {
            filterPosters = filterPosters.file_path;
          }
          setMainPoster(filterPosters);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieByID();
  }, [id]);

  /**
   * Renders the MovieDetailsPage component.
   * @returns {JSX.Element}
   */
  return (
    <Container className='d-flex flex-row justify-content-center'>
      <Col className='col-6'>
        <h1 className='mt-3'>{movie.title}</h1>
        <img className='mt-1' src={'https://image.tmdb.org/t/p/w500/' + mainPoster} alt={'image de ' + movie.title} />
      </Col>
      <Col className='col-6'>
        <Row className='m-3 justify-content-center'>
          <h2 className='mt-5'>Date de Sortie : {movie.release_date}</h2>

          {movie.genres &&
            movie.genres.map((genre) => {
              return (
                <Col key={genre.id} xs={12} sm={6} md={3} className='d-flex justify-content-center'>
                  <Button variant='primary' className='m-1' key={genre.id} onClick={() => navigateGenre(genre)}>
                    {genre.name}
                  </Button>
                </Col>
              );
            })}
        </Row>
        <h3 className='mt-3'>Synopsis</h3>
        <p>{movie.overview}</p>
        <Row className='m-3 justify-content-center'>
          <h3>Casting :</h3>
          {movie.credits &&
            movie.credits.cast.map((person) => {
              return (
                <Col key={person.id} xs={12} sm={6} md={3} className='d-flex justify-content-center mb-3'>
                  <Button variant='primary' className='m-1' key={person.id} onClick={() => navigatePeople(person)}>
                    {person.name}
                  </Button>
                </Col>
              );
            })}
        </Row>
      </Col>
    </Container>
  );
};

export default MovieDetailsPage;
