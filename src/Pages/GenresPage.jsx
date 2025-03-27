import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { getAllGenres } from '../Services/GenreServices';
import { useNavigate } from 'react-router-dom';

const GenresPage = () => {
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  const navigateTo = (genre) => {
    navigate('/genre/' + genre.id, { state: { genre: genre } });
  };

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
  }, [genres]);

  return (
    <Container className='d-flex flex-column align-items-center'>
      <h1 className='mt-5 fixed-top'>Genres</h1>
      <div className='justify-content-center flex-wrap gap-4'>
        {genres.map((genre) => {
          return (
            <Button
              variant='primary'
              className='m-1'
              key={genre.id}
              onClick={() => {
                navigateTo(genre);
              }}
            >
              {genre.name}
            </Button>
          );
        })}
      </div>
    </Container>
  );
};

export default GenresPage;
