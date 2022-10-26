// OMDB 
var omdbAPIkey = 'a6d7ec72'
// i=tt3896198&
var searchForm = document.getElementById('searchForm')
var movieSearch = document.getElementById('movie-search-box')
searchForm.addEventListener('submit', function fetchMovieInfo
(e, movieTitle){
  e.preventDefault();
  var movieTitle = movieSearch.value;
  var omdbsample = 'https://www.omdbapi.com/?apikey='+ omdbAPIkey +'&t=' + movieTitle;
  fetch(omdbsample)
  .then(function(response){
  return response.json();
})
  .then(function(data) {
    console.log(data)
    var results = document.getElementById('results');
   
    printResults(data);

    })

})

function printResults(data){
 
  var currentMovie= document.createElement('div');
  currentMovie.classList.add('row', 'card');

  var currentMovieBody= document.createElement('div');
  currentMovieBody.classList.add('card-body');
  currentMovie.append(currentMovieBody);
   
  var movieTitle = document.createElement('h3');
  movieTitle.textContent = data.Title;
  console.log(movieTitle)
  var moviePoster= document.createElement('img')
  moviePoster= data.Poster;
  if (moviePoster !== "N/A"){
    $('.poster').attr('src', moviePoster);
  }
  console.log(moviePoster)
  var movieYear=document.createElement('p');
  movieYear.textContent= data.Year;
  var movieRating= document.createElement('p');
  movieRating.textContent= data.imdbRating;
  var movieGenre= document.createElement('p');
  movieGenre.textContent= data.Genre;
  console.log(movieGenre)

  currentMovieBody.append(movieTitle, moviePoster, movieYear,movieRating, movieGenre);
  results.append(currentMovieBody);

  
}



var tmdbAPIkey = '7b922d5ddcd9e375ab0a580e678495c9'
var tmdbsample = 'https://api.themoviedb.org/3/movie/550?api_key=' + tmdbAPIkey;

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