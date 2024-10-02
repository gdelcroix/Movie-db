import axios from 'axios';

function getPopularPeople(currentPage) {
    return axios.get("https://api.themoviedb.org/3/person/popular?page="+currentPage, {
        headers: {
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVkNWQ3OWIzOTQ5ZWVlMzY5NmIyNzY3ZjI5ZjIwNiIsIm5iZiI6MTcyNzY5NzQyMS4zMjIwMzUsInN1YiI6IjY2ZmE5MTQwM2EwZjVhMDhjOGYxOGE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFVGfpubYIuVO8GOwKCEVq7nDUV29W-b1ZZulj_hTYE'
        }
    });
}

function getPeopleByID(id) {
    return axios.get("https://api.themoviedb.org/3/person/"+id+"?language=fr-FR", {
        headers: {
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVkNWQ3OWIzOTQ5ZWVlMzY5NmIyNzY3ZjI5ZjIwNiIsIm5iZiI6MTcyNzY5NzQyMS4zMjIwMzUsInN1YiI6IjY2ZmE5MTQwM2EwZjVhMDhjOGYxOGE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFVGfpubYIuVO8GOwKCEVq7nDUV29W-b1ZZulj_hTYE'
        }
    });
}

function getPeopleByName(id) {
    let nom = encodeURIComponent(id);
    let requestedURL = 'https://api.themoviedb.org/3/person?query=' + nom + '&language=fr-FR';
    console.log('url');
    console.log(requestedURL);
    return axios.get(requestedURL, {
        headers: {
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVkNWQ3OWIzOTQ5ZWVlMzY5NmIyNzY3ZjI5ZjIwNiIsIm5iZiI6MTcyNzY5NzQyMS4zMjIwMzUsInN1YiI6IjY2ZmE5MTQwM2EwZjVhMDhjOGYxOGE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFVGfpubYIuVO8GOwKCEVq7nDUV29W-b1ZZulj_hTYE'
        },
        paramsSerializer: {
            encode: (param) => encodeURIComponent(param).replaceAll(" ", "%20"),
          }
    });
}

export default { 
    getPopularPeople,
    getPeopleByID,
    getPeopleByName
};