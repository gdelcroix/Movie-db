import { useLocation, useParams } from "react-router-dom";
import GenreServices from "../Services/GenreServices";
import { useEffect, useState } from "react";
import {Pagination, Container} from "react-bootstrap";
import MovieCard from "../Components/MovieCard";

const GenreDetailsPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const name = location.state.genre.name;
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage] = useState(500);

    const GenreDetailsPage = async () => {
        try {
            const response = await GenreServices.getMoviesByGenreID(id,currentPage);
            setMovies(response.data.results);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        } catch (error) {
            console.log(error);
        }
    }    
    
    useEffect(() => {
        GenreDetailsPage();
    }, [currentPage]);

    return <Container className="d-flex flex-column align-items-center bg-success">
        <h1 className="mt-4">{name}</h1>
        <div className="row justify-content-center flex-wrap gap-2"> 
        {movies && movies.map((movie) => {
            return <MovieCard movieCard={movie} key={movie.id}/>
        })}
        </div>
         <Pagination className="mt-3">
             {currentPage > 1 && <>
                 <Pagination.First onClick={() => setCurrentPage(1)}/>
                 <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)}/>
                 <Pagination.Item onClick={() => setCurrentPage(1)}>{1}</Pagination.Item>
             </>}
             {currentPage -5 > 0 && <>
                 <Pagination.Ellipsis  onClick={() => setCurrentPage(currentPage - 5)}/>
             </>}
             {(currentPage != 2 && currentPage >1) && <>
                 <Pagination.Item onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</Pagination.Item>
             </>}

             <Pagination.Item active>{currentPage}</Pagination.Item>
            
             {currentPage +1 < maxPage && <>
                 <Pagination.Ellipsis onClick={() => setCurrentPage(currentPage + 5)} />
             </>}

             {currentPage < maxPage && <>
                 <Pagination.Item onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
                 <Pagination.Item onClick={() => setCurrentPage(maxPage)}>{maxPage}</Pagination.Item>
                 <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/>
                 <Pagination.Last onClick={() => setCurrentPage(maxPage)}/>            
             </>}
         </Pagination>
     </Container>;
}

export default GenreDetailsPage;