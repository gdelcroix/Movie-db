import { useEffect, useState } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import { getAllMovies } from '../Services/MovieServices';
import MovieCard from '../Components/MovieCard';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage] = useState(500);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies(currentPage);
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

  console.log(movies);
  return (
    <Container className='d-flex flex-column mt-5 align-items-center'>
      <h1 className='mt-5'>Movie DB</h1>
      <div className='row justify-content-center flex-wrap gap-2'>
        {movies.map((movie) => {
          return <MovieCard movieCard={movie} key={movie.id}></MovieCard>;
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

export default HomePage;
