import { useNavigate, useParams } from "react-router-dom";
import MovieServices from "../Services/MovieServices";
import { useEffect, useState } from "react";
import {Button} from "react-bootstrap";

const MovieDetailsPage = () => {
    const navigate = useNavigate();

    const navigateTo = (id,genre) => {
      navigate('/genre/'+id+'/'+genre);
    }
    
    const { id } = useParams();
    const [movie, setMovie] = useState({});

    const fetchMovieByID = async () => {
        try {
            const response = await MovieServices.getMovieByID(id);
            console.log(response.data);
            
            setMovie(response.data);
        } catch (error) {
            console.log(error);
        }
    }    
    
    useEffect(() => {
        fetchMovieByID();
    }, []);

    return <>
        <h1 className="mt-3">{movie.title}</h1>
        <img className="mt-1" src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path} alt={movie.title}/>
        <h2>{movie.release_date}</h2>
        {movie.genres && movie.genres.map((genre) => {
            return <Button 
                variant="primary" className="m-1" key={genre.id}
                onClick={() => navigateTo(genre.id,genre.name)}
                >{genre.name}</Button>;
        })}

        <p className="mt-3">{movie.overview}</p>
    </>;
}

export default MovieDetailsPage;
