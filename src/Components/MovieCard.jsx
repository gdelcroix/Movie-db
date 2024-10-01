import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movieCard}) => {
    const navigate = useNavigate();

    const navigateTo = (id) => {
      navigate('/movie/'+id);
    }

    return <>
      <Card className='col-2'>
        <Card.Img src={'https://image.tmdb.org/t/p/w500/'+movieCard.poster_path} />
        <Card.Body>
          <Card.Title>{movieCard.title}</Card.Title>
          <Card.Subtitle>{movieCard.release_date}</Card.Subtitle>
          <button onClick={() => navigateTo(movieCard.id)}>Voir plus</button>
          <Card.Text>
            {movieCard.overview}
          </Card.Text>
          </Card.Body>
      </Card>
    </>;
  }


export default MovieCard;