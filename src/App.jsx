
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage'
import GenresPage from './Pages/GenresPage'
import NavBar from './Components/NavBar';
import MovieDetailsPage from './Pages/MovieDetailsPage';
import GenreDetailsPage from './Pages/GenreDetailsPage';
import './App.css'

function App() {

  return <>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage> </HomePage>}></Route>
          <Route path="/genres" element={<GenresPage> </GenresPage>}></Route>
          <Route path='/movie/:id' element={<MovieDetailsPage> </MovieDetailsPage>}></Route>
          <Route path='/genre/:id/:name' element={<GenreDetailsPage> </GenreDetailsPage>}></Route>
        </Routes>
      </Router>
    </>;
}

export default App
