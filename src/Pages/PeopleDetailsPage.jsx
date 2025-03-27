import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { getPeopleByID, getPeopleByName } from '../Services/PeopleServices';

const PeopleDetailsPage = () => {
  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate('/movie/' + id);
  };

  const { id } = useParams();
  const location = useLocation();
  const persona = location.state.person;
  const [person, setPerson] = useState({});
  const [infos, setInfos] = useState({});

  useEffect(() => {
    const fetchPeopleByName = async () => {
      console.log('person name:', persona.name);
      try {
        let pName = encodeURI(persona.name);
        let pId = persona.id;
        const response = await getPeopleByName(pName, pId);
        setPerson(response);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPeopleByID = async () => {
      try {
        const response = await getPeopleByID(id);
        setInfos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPeopleByName();
    fetchPeopleByID();
  }, [id, persona]);

  if (infos && person) {
    console.log('person:', person);
    console.log('infos:', infos);
  }

  return (
    <>
      <h1 className='mt-5'>{persona.name}</h1>
      <Container className='row'>
        <div className='col-4 mt-3'>
          <img
            src={'https://image.tmdb.org/t/p/w500/' + persona.profile_path}
            className='img-fluid w-90'
            alt={'image de ' + infos.name}
          />
        </div>
        <div className='col-8 mt-3'>
          {persona.known_for_department && <Button>Connu dans la catégorie : {persona.known_for_department}</Button>}
          {person.known_for && (
            <div>
              <h2>Connu pour :</h2>
              {person.known_for
                .filter((movie) => movie.media_type === 'movie')
                .map((movie) => {
                  console.log('map movie:', movie);
                  return (
                    <Button variant='primary' className='m-1' key={movie.id} onClick={() => navigateTo(movie.id)}>
                      {movie.title}
                    </Button>
                  );
                })}
            </div>
          )}
          <Card>
            {infos.birthday && <div>Date de naissance : {infos.birthday}</div>}
            {infos.place_of_birth && <div> Lieu de naissance : {infos.place_of_birth}</div>}
            {infos.deathday && <div> Date de deces : {infos.deathday}</div>}
          </Card>
          {infos.biography && <div className='mt-1 text-start'>Biographie : {infos.biography}</div>}
        </div>
      </Container>
    </>
  );
};

export default PeopleDetailsPage;
