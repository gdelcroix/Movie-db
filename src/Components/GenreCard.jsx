import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const GenreCard = ({genreCard}) => {
    const navigate = useNavigate();

    const navigateTo = (id) => {
      navigate('/genre/'+id);
    }

    return <>
      <Card className='col-2'>
        <Card.Body>
          <Card.Title>{genreCard.name}
            <p><Button variant="light" onClick={() => navigateTo(genreCard.id)}>Explorer</Button></p>
          </Card.Title>
        </Card.Body>
      </Card>
    </>;
  }

export default GenreCard;