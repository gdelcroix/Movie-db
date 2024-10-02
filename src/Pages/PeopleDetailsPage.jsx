import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {  Card , Button, Container } from "react-bootstrap";
import PeopleServices from "../Services/PeopleServices";

const MovieDetailsPage = () => {
    // const navigate = useNavigate();

    // const navigateTo = (movie) => {
    //   navigate('/movie/'+movie.id, {state:{ 'genre':genre}});
    //   console.log(movie);
    // }

    const { id } = useParams();
    const location = useLocation();
    const persona = location.state.person;
    console.log(persona);
    const [person, setPerson] = useState({});
    const [infos, setInfos] = useState({});

    const fetchPeopleByName = async () => {
        try {
            const response = await PeopleServices.getPeopleByName(persona.name);
            setInfos(response);
            console.log('infos')
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchPeopleByID = async () => {
        try {
            const response = await PeopleServices.getPeopleByID(id);
            setPerson(response.data);
            console.log('id')
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }    
    
    useEffect(() => {
        fetchPeopleByName();
        fetchPeopleByID();
    }, []);

    return <>
        <h1 className="mt-5">{person.name}</h1>
            <Container className="row">
                <div className="col-4 mt-3">
                    <img src={'https://image.tmdb.org/t/p/w500/'+person.profile_path} className="img-fluid w-90" alt={'image de '+person.name}/>
                </div>
                <div className="col-8 mt-3">
                    {person.known_for_department && 
                        <Button>
                        Connu dans la catégorie : {person.known_for_department}
                        </Button>}
                    <Card.Text>
                    {person.birthday && <div>Date de naissance : {person.birthday}</div>}
                    {person.place_of_birth && <div> Lieu de naissance : {person.place_of_birth}</div>}
                    {person.deathday && <div> Date de deces : {person.deathday}</div>}
                    </Card.Text>
                    {person.biography && <div className="mt-1 text-start">Biographie : {person.biography}</div>}
                    
                </div>
            </Container>
    </>;
}

export default MovieDetailsPage;
