import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';

import HomePage from './Pages/HomePage';
import GenresPage from './Pages/GenresPage';
import MovieDetailsPage from './Pages/MovieDetailsPage';
import GenreDetailsPage from './Pages/GenreDetailsPage';
import PeoplePage from './Pages/PeoplePage';
import PeopleDetailsPage from './Pages/PeopleDetailsPage';

/**
 * The main application component that sets up the routing for the movie database application.
 * It uses React Router to define routes for various pages, including the home page, genres page,
 * movie details page, genre details page, people page, and people details page.
 *
 * @function
 * @returns {JSX.Element} The rendered application component with navigation and routing.
 */
function App() {
  return (
    <>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<HomePage> </HomePage>}></Route>
          <Route path='/genres' element={<GenresPage> </GenresPage>}></Route>
          <Route path='/movie/:id' element={<MovieDetailsPage> </MovieDetailsPage>}></Route>
          <Route path='/genre/:id' element={<GenreDetailsPage> </GenreDetailsPage>}></Route>
          <Route path='/people' element={<PeoplePage> </PeoplePage>}></Route>
          <Route path='/people/:id' element={<PeopleDetailsPage> </PeopleDetailsPage>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
