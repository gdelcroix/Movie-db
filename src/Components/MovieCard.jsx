import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
/**
 * MovieCard component displays a card for a specific movie.
 * It includes a button to navigate to a detailed view of the movie.
 *
 * @function
 * @param {Object} props - The props object.
 * @param {Object} props.movieCard - The movie data object.
 * @param {string} props.movieCard.poster_path - The path to the movie's poster image.
 * @param {string} props.movieCard.title - The title of the movie.
 * @param {number} props.movieCard.id - The unique identifier of the movie.
 */
const MovieCard = ({ movieCard }) => {
  /**
   * The `navigate` function from the `useNavigate` hook allows for navigation to different routes.
   * It is used to navigate to the detailed view of a specific movie when the button is clicked.
   *
   * @type {Function}
   * @see {@link https://reactrouter.com/web/api/useNavigate|React Router `useNavigate`}
   */
  const navigate = useNavigate();
  /**
   * The `navigateTo` function is called when the button is clicked.
   * It navigates to the detailed view of the movie by updating the URL path.
   *
   * @param {number} id
   */
  const navigateTo = (id) => {
    navigate('/movie/' + id);
  };

  /**
   * The `MovieCard` component displays a card for a specific movie.
   * It includes the movie's poster, title, and a button to navigate to the movie's details page.
   *
   * @returns {JSX.Element}
   */
  return (
    <>
      <Card className='col-sm-5 col-md-4 col-lg-3 col-xxl-2'>
        <Card.Img src={'https://image.tmdb.org/t/p/w500' + movieCard.poster_path} alt={'image de ' + movieCard.title} />
        <Card.Body>
          <Card.Title>{movieCard.title}</Card.Title>
          <Button onClick={() => navigateTo(movieCard.id)}>Voir plus</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default MovieCard;
