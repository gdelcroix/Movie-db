import { useNavigate, useParams } from 'react-router-dom';
import { getMovieByID } from '../Services/MovieServices';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const MovieDetailsPage = () => {
  const [mainPoster, setMainPoster] = useState([]);
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  const navigate = useNavigate();
  const navigateGenre = (genre) => {
    navigate('/genre/' + genre.id, { state: { genre: genre } });
    console.log(genre);
  };
  const navigatePeople = (person) => {
    navigate('/people/' + person.id, { state: { person: person } });
    console.log(person);
  };

  useEffect(() => {
    const fetchMovieByID = async () => {
      try {
        const response = await getMovieByID(id);
        setMovie(response);
        console.log('fetch movie :', response);
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
        </Row><h3 className='mt-3'>Synopsis</h3><p>{movie.overview}</p>
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
