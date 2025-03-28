import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  FaTheaterMasks,
  FaMusic,
  FaHeart,
  FaGhost,
  FaMagic,
  FaHistory,
  FaFilm,
  FaSearch,
  FaSpaceShuttle,
  FaTv,
  FaExclamationTriangle,
  FaSkullCrossbones,
  FaHatCowboy,
} from 'react-icons/fa';
import { GiGhost, GiFamilyTree } from 'react-icons/gi';
import { BsCameraReels, BsBinoculars } from 'react-icons/bs';
import { GiMissileLauncher, GiSurprised } from 'react-icons/gi';
import { RiParentLine } from 'react-icons/ri';

/**
 * GenreCard is a memoized React functional component that displays a card for a specific genre.
 * It includes a button to navigate to a detailed view of the genre.
 * i used memo to avoid re-rendering the component if the props are the same.
 * @function
 * @param {Object} props - The props object.
 * @param {Object} props.genre - The genre object containing details about the genre.
 * @param {string} props.genre.name - The name of the genre.
 * @param {number|string} props.genre.id - The unique identifier of the genre.
 */
const GenreCard = React.memo(({ genre }) => {
  /**
   * The navigate function from the useNavigate hook allows for programmatic navigation.
   * @function
   * @name navigate
   * @returns {function} The navigate function to redirect to a different page.
   */
  const navigate = useNavigate();

  /**
   * The navigateTo function redirects the user to the genre details page for the selected genre.
   * @function
   * @name navigateTo
   * @param {number} id
   * @returns {void} Navigates to the genre details page.
   * @example navigateTo(28)
   */
  const navigateTo = (id) => {
    navigate('/genre/' + id, { state: { genre: genre } });
  };

  /** the genreToIcon object maps genre names in french to corresponding icons.
   * @type {Object}
   * @property {string} genre - The genre name in French.
   * @property {Function} icon - The corresponding icon component.
   */
  const genreToIcon = {
    Action: FaExclamationTriangle,
    Aventure: BsBinoculars,
    Animation: FaMagic,
    Comédie: RiParentLine,
    Crime: FaSkullCrossbones,
    Documentaire: BsCameraReels,
    Drame: FaTheaterMasks,
    Familial: GiFamilyTree,
    Fantastique: GiGhost,
    Histoire: FaHistory,
    Horreur: FaGhost,
    Musique: FaMusic,
    Mystère: FaSearch,
    Romance: FaHeart,
    'Science-Fiction': FaSpaceShuttle,
    Téléfilm: FaTv,
    Thriller: GiSurprised,
    Guerre: GiMissileLauncher,
    Western: FaHatCowboy,
  };

  const iconGenre = (genre) => {
    const Icon = genreToIcon[genre] || FaFilm;
    return <Icon size={24} />;
  };
  /**
   * The GenreCard component renders a card with the genre name and an Explorer button.
   * @returns {JSX.Element} The GenreCard component.
   */
  return (
    <>
      <Card className='col-2'>
        <Card.Body className='d-flex flex-column flex-grow-1'>
          <Card.Title className='bg-light text-center mb-2 text-wrap overflow-visible'>
            <u>
              <strong>{genre.name}</strong>
            </u>
          </Card.Title>
          <Card.Subtitle className='d-flex justify-content-center mb-auto'>{iconGenre(genre.name)}</Card.Subtitle>
          <Card.Text className='d-flex justify-content-center'>
            <Button onClick={() => navigateTo(genre.id)} className='w-100'>
              Explorer
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
});

GenreCard.displayName = 'GenreCard';

export default GenreCard;
