import axios from "axios";

function getAllGenres(){
    return axios.get('https://api.themoviedb.org/3/genre/movie/list?language=fr',{
        headers: {
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVkNWQ3OWIzOTQ5ZWVlMzY5NmIyNzY3ZjI5ZjIwNiIsIm5iZiI6MTcyNzY5NzQyMS4zMjIwMzUsInN1YiI6IjY2ZmE5MTQwM2EwZjVhMDhjOGYxOGE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFVGfpubYIuVO8GOwKCEVq7nDUV29W-b1ZZulj_hTYE'
            }
        });
    };

function getMoviesByGenreID(id,currentPage) {
    return axios.get("https://api.themoviedb.org/3/discover/movie?language=fr-FR&with_genres="+id+"&page="+currentPage,{
        headers: {
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVkNWQ3OWIzOTQ5ZWVlMzY5NmIyNzY3ZjI5ZjIwNiIsIm5iZiI6MTcyNzY5NzQyMS4zMjIwMzUsInN1YiI6IjY2ZmE5MTQwM2EwZjVhMDhjOGYxOGE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFVGfpubYIuVO8GOwKCEVq7nDUV29W-b1ZZulj_hTYE'
            }
        });
}

export default {
    getAllGenres,
    getMoviesByGenreID
};