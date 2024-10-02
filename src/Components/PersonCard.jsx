import {Card , Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PersonCard = ({personCard}) => {
    const navigate = useNavigate();

    const navigateTo = (id) => {
      navigate('/people/'+id, {state:{ 'person':personCard}});
    }
console.log(personCard);
    return <>
      <Card className='col-sm-5 col-md-4 col-lg-3 col-xxl-2'>
        <Card.Img src={'https://image.tmdb.org/t/p/w500/'+personCard.profile_path} alt={'image de '+personCard.name}/>
        <Card.Body>
          <Card.Title>{personCard.name}</Card.Title>
          <Button onClick={() => navigateTo(personCard.id)}>Voir plus</Button>
          </Card.Body>
      </Card>
    </>;
  }


export default PersonCard;