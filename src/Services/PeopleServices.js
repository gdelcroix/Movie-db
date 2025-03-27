import axios from 'axios';

function getPopularPeople(currentPage) {
  return axios.get('https://api.themoviedb.org/3/person/popular?page=' + currentPage, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVkNWQ3OWIzOTQ5ZWVlMzY5NmIyNzY3ZjI5ZjIwNiIsIm5iZiI6MTcyNzY5NzQyMS4zMjIwMzUsInN1YiI6IjY2ZmE5MTQwM2EwZjVhMDhjOGYxOGE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFVGfpubYIuVO8GOwKCEVq7nDUV29W-b1ZZulj_hTYE',
    },
  });
}

function getPeopleByID(id) {
  return axios.get('https://api.themoviedb.org/3/person/' + id + '?language=fr-FR', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVkNWQ3OWIzOTQ5ZWVlMzY5NmIyNzY3ZjI5ZjIwNiIsIm5iZiI6MTcyNzY5NzQyMS4zMjIwMzUsInN1YiI6IjY2ZmE5MTQwM2EwZjVhMDhjOGYxOGE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFVGfpubYIuVO8GOwKCEVq7nDUV29W-b1ZZulj_hTYE',
    },
  });
}

async function getPeopleByName(pName, pId) {
  if (pName) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVkNWQ3OWIzOTQ5ZWVlMzY5NmIyNzY3ZjI5ZjIwNiIsIm5iZiI6MTcyNzY5NzQyMS4zMjIwMzUsInN1YiI6IjY2ZmE5MTQwM2EwZjVhMDhjOGYxOGE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFVGfpubYIuVO8GOwKCEVq7nDUV29W-b1ZZulj_hTYE',
        },
      };
      let requestedURL = 'https://api.themoviedb.org/3/search/person?query=' + pName + '&language=fr-FR';
      const response = await axios.get(requestedURL, options);
      const homonymyFilter = response.data.results.filter((person) => person.id === pId);
      return homonymyFilter[0];
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

export { getPopularPeople, getPeopleByID, getPeopleByName };
