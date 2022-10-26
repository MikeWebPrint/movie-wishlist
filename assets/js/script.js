// OMDB 
var omdbAPIkey = 'a6d7ec72'
// i=tt3896198&
var searchForm = document.getElementById('searchForm')
var movieSearch = document.getElementById('movie-search-box')
var results = document.getElementById('results');
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
  
   
    printResults(data);

    })

})

function printResults(data){
  //results.innerHTML='';
 
  var currentMovie= document.createElement('div');
  currentMovie.classList.add('row', 'card');

  var currentMovieBody= document.createElement('div');
  currentMovieBody.classList.add('card-body');
  currentMovie.append(currentMovieBody);
   
  var movieTitle = document.createElement('h3');
  movieTitle.textContent = "Title: " + data.Title;
  console.log(movieTitle)
  
  var moviePoster= data.Poster;
  moviePoster.classList.add('hidden');
  if (moviePoster !== "N/A"){
    $('.poster').attr('src', moviePoster);
  }
  console.log(moviePoster)
  var movieYear=document.createElement('p');
  movieYear.textContent= "Year: " + data.Year;
  var movieRating= document.createElement('p');
  movieRating.textContent= "Rating: " + data.imdbRating;
  var movieGenre= document.createElement('p');
  movieGenre.textContent= "Genre: " + data.Genre;
  console.log(movieGenre)
  var previewButton= document.createElement('button');
  previewButton.textContent= 'Watch Preview';
  var fullLength= document.createElement('button');
  fullLength.textContent= 'Watch Full Length Video';

  currentMovieBody.append(movieTitle, moviePoster, movieYear,movieRating, movieGenre, previewButton, fullLength);
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