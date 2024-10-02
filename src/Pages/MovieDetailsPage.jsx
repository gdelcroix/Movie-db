import { useNavigate, useParams } from "react-router-dom";
import MovieServices from "../Services/MovieServices";
import { useEffect, useState } from "react";
import {Button} from "react-bootstrap";

const MovieDetailsPage = () => {
    const navigate = useNavigate();

    const navigateTo = (genre) => {
      navigate('/genre/'+genre.id, {state:{ 'genre':genre}});
      console.log(genre);
    }
    
    const { id } = useParams();
    const [movie, setMovie] = useState({});

    const fetchMovieByID = async () => {
        try {
            const response = await MovieServices.getMovieByID(id);
            setMovie(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }    
    
    if (movie.images && movie.images.posters) {};


    useEffect(() => {
        fetchMovieByID();
    }, []);

    return <>
        <h1 className="mt-3">{movie.title}</h1>
        <img className="mt-1" src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path} alt={'image de '+movie.title}/>
        <h2>{movie.release_date}</h2>
        {movie.genres && movie.genres.map((genre) => {
            return <Button 
                variant="primary" className="m-1" key={genre.id}
                onClick={() => navigateTo(genre)}
                >{genre.name}</Button>;
        })}

        <p className="mt-3">{movie.overview}</p>
    </>;
}

export default MovieDetailsPage;
