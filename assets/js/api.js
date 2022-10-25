// OMDB 
var omdbAPIkey = a6d7ec72
var omdbsample = 'https://www.omdbapi.com/?apikey=a6d7ec72&i=tt3896198&t=The+Birds';


function fetchMovieInfo(omdbsample){
  fetch(omdbsample)
  .then(function(response){
  return response.json();
})
  .then(function(data) {
    console.log(data)
  })
}

var tmdbAPIkey = 7b922d5ddcd9e375ab0a580e678495c9
var tmdbsample = 'https://api.themoviedb.org/3/movie/550?api_key=7b922d5ddcd9e375ab0a580e678495c9';

function fetchMovieInfo(tmdbsample){
  fetch(tmdbsample)
  .then(function(response){
  return response.json();
})
  .then(function(data) {
    console.log(data)
  })
}

// tmdb image base path for posters:
// https://image.tmdb.org/t/p/w200
// or
// https://image.tmdb.org/t/p/w500
// or
// https://image.tmdb.org/t/p/original