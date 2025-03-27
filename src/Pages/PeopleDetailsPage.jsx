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
    const [person, setPerson] = useState();
    const [infos, setInfos] = useState({});

    const fetchPeopleByName = async () => {
        try {
            const response = await PeopleServices.getPeopleByName(encodeURI(persona.name));
            setPerson(response);
            console.log('infos :')
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchPeopleByID = async () => {
        try {
            const response = await PeopleServices.getPeopleByID(id);
            setInfos(response.data);
        } catch (error) {
            console.log(error);
        }
    }    
    
    useEffect(() => {
        fetchPeopleByName();
        fetchPeopleByID();
    }, []);

    console.log('name fetch');
    console.log(person);

    return <>
        <h1 className="mt-5">{persona.name}</h1>
            <Container className="row">
                <div className="col-4 mt-3">
                    <img src={'https://image.tmdb.org/t/p/w500/'+persona.profile_path} className="img-fluid w-90" alt={'image de '+id.name}/>
                </div>
                <div className="col-8 mt-3">
                    {persona.known_for_department && 
                        <Button>
                        Connu dans la catégorie : {persona.known_for_department}
                        </Button>}
                    <Card.Text>
                    {id.birthday && <div>Date de naissance : {id.birthday}</div>}
                    {id.place_of_birth && <div> Lieu de naissance : {id.place_of_birth}</div>}
                    {id.deathday && <div> Date de deces : {id.deathday}</div>}
                    </Card.Text>
                    {id.biography && <div className="mt-1 text-start">Biographie : {id.biography}</div>}
                    
                </div>
            </Container>
    </>;
}

export default MovieDetailsPage;
