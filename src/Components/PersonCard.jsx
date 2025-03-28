import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * A React component that displays a card for a person, including their image, name, 
 * and a button to navigate to their detailed page.
 *
 * @function
 * @param {Object} props - The props object.
 * @param {Object} props.person - The data for the person to display.
 * @param {string} props.person.profile_path - The path to the person's profile image.
 * @param {string} props.person.name - The name of the person.
 * @param {number} props.person.id - The unique identifier of the person.
 *
 * @returns {JSX.Element} A card component displaying the person's details.
 */
const PersonCard = ({ person }) => {
  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate('/people/' + id, { state: { person: person } });
  };
  return (
    <>
      <Card className='col-sm-5 col-md-4 col-lg-3 col-xxl-2'>
        <Card.Img
          src={'https://image.tmdb.org/t/p/w500' + person.profile_path}
          alt={'image de ' + person.name}
        />
        <Card.Body>
          <Card.Title>{person.name}</Card.Title>
          <Button onClick={() => navigateTo(person.id)}>Voir plus</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default PersonCard;
