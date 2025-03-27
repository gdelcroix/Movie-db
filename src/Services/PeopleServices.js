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

function getPeopleByName(name) {
    // let nom = encodeURI(id);
    console.log('name: '+name);
    const requesting = axios.create({
        baseURL: 'https://api.themoviedb.org/3/search/',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVkNWQ3OWIzOTQ5ZWVlMzY5NmIyNzY3ZjI5ZjIwNiIsIm5iZiI6MTcyNzY5NzQyMS4zMjIwMzUsInN1YiI6IjY2ZmE5MTQwM2EwZjVhMDhjOGYxOGE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFVGfpubYIuVO8GOwKCEVq7nDUV29W-b1ZZulj_hTYE'
                 },
        paramsSerializer: {
            encode: (param) => {
                encodeURIComponent(param).replaceAll(" ", "%20");
            }            
        },
    })
    requesting.get(name, {
        params: {
            $filter: name,
            language: 'fr-FR'
        },
    }).then(({data}) => console.log("request url NAME: "+ data.url));
    // }).then(function (response) {
    //     console.log(response);
    // }).catch((error) => {
    //     console.log(error);
    // }).finally((response) => {
    //     return response;
    // })
    console.log(requesting.response.data);
//    console.log(nom);
//    let requestedURL = 'https://api.themoviedb.org/3/person?query='+id+'&language=fr-FR';
//    console.log(requestedURL);
    // return axios.get(requestedURL.replaceAll(" ", "%20"), {
    //     headers: {
    //         'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVkNWQ3OWIzOTQ5ZWVlMzY5NmIyNzY3ZjI5ZjIwNiIsIm5iZiI6MTcyNzY5NzQyMS4zMjIwMzUsInN1YiI6IjY2ZmE5MTQwM2EwZjVhMDhjOGYxOGE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VFVGfpubYIuVO8GOwKCEVq7nDUV29W-b1ZZulj_hTYE'
    //     }
    //     ,
    //     paramsSerializer: {
    //         encode: (param) => param.replaceAll(" ", "%20"),
    //       }
    // });
}

export default { 
    getPopularPeople,
    getPeopleByID,
    getPeopleByName
};