import React, { useState, useEffect } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import { getPopularPeople } from '../Services/PeopleServices';
import PersonCard from '../Components/PersonCard';

/**
 * PeoplePage Component
 *
 * This component displays a paginated list of popular people fetched from an API.
 * It includes a header, a grid of person cards, and pagination controls for navigation.
 */
const PeoplePage = () => {
  /**
   * Stores the list of popular people fetched from the API.
   * @type {Array}
   * @default []
   */
  const [people, setPeople] = useState([]);
  /**
   * Tracks the current page number for pagination.
   * @type {number}
   * @default 1
   */
  const [currentPage, setCurrentPage] = useState(1);
  /**
   * Represents the maximum number of pages available.
   * @type {number}
   * @default 500
   */
  const [maxPage] = useState(500);

  useEffect(() => {
    /**
     * Fetches a list of popular people from the API and updates the state with the results.
     * Scrolls the window to the top after a short delay.
     * Logs an error to the console if the API request fails.
     *
     * @async
     * @function fetchPeople
     * @returns {Promise<void>} A promise that resolves when the data is fetched and state is updated.
     */
    const fetchPeople = async () => {
      try {
        /**
         * Fetches a list of popular people from the API based on the current page number.
         * @type {Array}
         * @default []
         * @see {@link module:Services/PeopleServices.getPopularPeople}
         * @returns {Array} An array of popular people objects.
         * @throws {Error} An error message if the request fails.
         * @see {@link module:Components/PersonCard}
         */
        const response = await getPopularPeople(currentPage);
        setPeople(response.data.results);
        setTimeout(() => {
          window.scrollTo(0, 0, 'instant');
        }, 100);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPeople();
  }, [currentPage]);
  /**
   * PeoplePage Component loads a paginated list of popular people fetched from an API.
   * It includes a header, a grid of person cards, and pagination controls for navigation.
   * @returns {ReactElement} The PeoplePage component
   * @see {@link module:Components/PersonCard}
   */
  return (
    <Container className='d-flex flex-column mt-5 align-items-center'>
      <h1 className='mt-5'>Acteurs</h1>
      <div className='row justify-content-center flex-wrap gap-2'>
        {people.map((person) => {
          return <PersonCard person={person} key={person.name}></PersonCard>;
        })}
      </div>
      <Pagination className='mt-3'>
        {currentPage > 1 && (
          <>
            <Pagination.First onClick={() => setCurrentPage(1)} />
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
            <Pagination.Item onClick={() => setCurrentPage(1)}>{1}</Pagination.Item>
          </>
        )}
        {currentPage - 5 > 0 && (
          <>
            <Pagination.Ellipsis onClick={() => setCurrentPage(currentPage - 5)} />
          </>
        )}
        {currentPage != 2 && currentPage > 1 && (
          <>
            <Pagination.Item onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</Pagination.Item>
          </>
        )}

        <Pagination.Item active>{currentPage}</Pagination.Item>

        {currentPage + 1 < maxPage && (
          <>
            <Pagination.Ellipsis onClick={() => setCurrentPage(currentPage + 5)} />
          </>
        )}

        {currentPage < maxPage && (
          <>
            <Pagination.Item onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
            <Pagination.Item onClick={() => setCurrentPage(maxPage)}>{maxPage}</Pagination.Item>
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
            <Pagination.Last onClick={() => setCurrentPage(maxPage)} />
          </>
        )}
      </Pagination>
    </Container>
  );
};

export default PeoplePage;
