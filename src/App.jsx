import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar';

import HomePage from './Pages/HomePage'
import GenresPage from './Pages/GenresPage'
import MovieDetailsPage from './Pages/MovieDetailsPage';
import GenreDetailsPage from './Pages/GenreDetailsPage';
import PeoplePage from './Pages/PeoplePage';
import PeopleDetailsPage from './Pages/PeopleDetailsPage';

function App() {

  return <>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage> </HomePage>}></Route>
          <Route path="/genres" element={<GenresPage> </GenresPage>}></Route>
          <Route path='/movie/:id' element={<MovieDetailsPage> </MovieDetailsPage>}></Route>
          <Route path='/genre/:id' element={<GenreDetailsPage> </GenreDetailsPage>}></Route>
          <Route path='/people' element={<PeoplePage> </PeoplePage>}></Route>
          <Route path='/people/:id' element={<PeopleDetailsPage> </PeopleDetailsPage>}></Route>
          
        </Routes>
      </Router>
    </>;
}

export default App
