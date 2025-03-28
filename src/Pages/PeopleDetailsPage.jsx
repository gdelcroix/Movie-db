import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { getPeopleByID, getPeopleByName } from '../Services/PeopleServices';

/**
 * PeopleDetailsPage component displays detailed information about a person,
 * including their biography, known works, and personal details such as
 * birthdate and place of birth. It fetches data from an external API based
 * on the person's name and ID.
 */
const PeopleDetailsPage = () => {
  /**
   * useNavigate hook from react-router-dom for navigation
   * @type {Function}
   */
  const navigate = useNavigate();

  /**
   * navigate to a specific movie page
   * @function
   * @name navigateTo
   * @param {number} id
   * @returns {void}
   * @example navigateTo(123)
   */
  const navigateTo = (id) => {
    navigate('/movie/' + id);
  };
  /**
   * Extracts the person ID from the URL parameters.
   * @type {number}
   * @default null
   * @example 123
   */
  const { id } = useParams();
  /**
   * Extracts the person json  from the location state.
   * starting from useLocation() hook. to store in the person state.
   * @type {JSON}
   * @example { name: 'Actor Name', profile_path: 'profile_path.jpg', known_for: [{ id: 1, title: 'Movie 1', media_type: 'movie' }] }
   */
  const location = useLocation();
  const [person, setPerson] = useState(location.state.person);

  /**
   * Stores the person information fetched from the API.
   * @type {Object}
   * @default {}
   * @example { birthday: '1990-01-01', place_of_birth: 'Some City', deathday: null, biography: 'Some biography', known_for_department: 'Acting' }
   */
  const [infos, setInfos] = useState({});

  useEffect(() => {
    /**
     * Fetches person information based on the person name and ID to avoid homonyms.
     * @function
     * @name fetchPeopleByName
     * @returns {Promise<void>} A promise that resolves when the data is fetched and state is updated.
     * @example fetchPeopleByName()
     * @see '@link module:PeopleServices.getPeopleByName'
     */
    const fetchPeopleByName = async () => {
      try {
        let pName = encodeURI(person.name);
        let pId = person.id;
        const response = await getPeopleByName(pName, pId);
        setPerson(response);
      } catch (error) {
        console.log(error);
      }
    };
    /**
     * Fetches person information based on the person ID only.
     * this one is used to get another details about the person.
     * @function
     * @name fetchPeopleByID
     * @returns {Promise<void>} A promise that resolves when the data is fetched and state is updated.
     * @example fetchPeopleByID()
     * @see '@link module:PeopleServices.getPeopleByID'
     */
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
  }, []);

  return (
    <>
      <h1 className='mt-5'>{person.name}</h1>
      <Container className='row'>
        <div className='col-4 mt-3'>
          <img
            src={'https://image.tmdb.org/t/p/w500/' + person.profile_path}
            className='img-fluid w-90'
            alt={'image de ' + infos.name}
          />
        </div>
        <div className='col-8 mt-3'>
          {person.known_for_department && <Button>Connu dans la catégorie : {person.known_for_department}</Button>}
          {person.known_for && (
            <div>
              <h2>Connu pour :</h2>
              {person.known_for
                .filter((movie) => movie.media_type === 'movie')
                .map((movie) => {
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
