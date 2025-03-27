import { useState, useEffect } from "react";
import { Container, Pagination } from "react-bootstrap";
import PeopleServices from "../Services/PeopleServices";
import PersonCard from "../Components/PersonCard";

const PeoplePage = () => {
    const [people, setPeople] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage] = useState(500);

    const fetchPeople = async () => {
        try {
          const response = await PeopleServices.getPopularPeople(currentPage);
          setPeople(response.data.results);
          setTimeout(() => {
            window.scrollTo(0, 0, "instant");
          }, 100);
        } catch (error) {
          console.log(error);
       }
    };
    useEffect(() => {
            fetchPeople();
    }, [currentPage]);

    return <Container className="d-flex flex-column mt-5 align-items-center">
        <h1 className="mt-5">Acteurs</h1>
        <div className="row justify-content-center flex-wrap gap-2"> 
        {people.map((person) => {
            return <PersonCard personCard={person} key={person.name}></PersonCard>
        })}
        </div>
        <Pagination className="mt-3">
            {currentPage > 1 && <>
                <Pagination.First onClick={() => setCurrentPage(1)}/>
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)}/>
                <Pagination.Item onClick={() => setCurrentPage(1)}>{1}</Pagination.Item>
            </>}
            {currentPage -5 > 0 && <>
                <Pagination.Ellipsis  onClick={() => setCurrentPage(currentPage - 5)}/>
            </>}
            {(currentPage != 2 && currentPage >1) && <>
                <Pagination.Item onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</Pagination.Item>
            </>}

            <Pagination.Item active>{currentPage}</Pagination.Item>
            
            {currentPage +1 < maxPage && <>
                <Pagination.Ellipsis onClick={() => setCurrentPage(currentPage + 5)} />
            </>}

            {currentPage < maxPage && <>
                <Pagination.Item onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
                <Pagination.Item onClick={() => setCurrentPage(maxPage)}>{maxPage}</Pagination.Item>
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/>
                <Pagination.Last onClick={() => setCurrentPage(maxPage)}/>            
            </>}

        </Pagination>        
    </Container>;
}

export default PeoplePage;