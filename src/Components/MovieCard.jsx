import {Card , Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movieCard}) => {
    const navigate = useNavigate();

    const navigateTo = (id) => {
      navigate('/movie/'+id);
    }
    // console.log(movieCard);
    return <>
      <Card className='col-sm-5 col-md-4 col-lg-3 col-xxl-2'>
        <Card.Img src={'https://image.tmdb.org/t/p/w500/'+movieCard.poster_path} alt={'image de '+movieCard.title}/>
        <Card.Body>
          <Card.Title>{movieCard.title}</Card.Title>
          <Card.Subtitle>{movieCard.release_date}</Card.Subtitle>
          <Button onClick={() => navigateTo(movieCard.id)}>Voir plus</Button>
          <Card.Text>
            {movieCard.overview}
          </Card.Text>
          </Card.Body>
      </Card>
    </>;
  }

export default MovieCard;