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
    results.innerHTML = '<p>'+ JSON.stringify(data) + '</p>'
  })
})

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

var YTAPIkey = 'AIzaSyDrzmBZCuAd6fYctQJe9WsiA7sfQjFDFJA'
// i=tt3896198&
var searchFormTest = document.getElementById('searchFormTest')
var movieSearchYT = document.getElementById('movie-search-boxYT')
searchFormTest.addEventListener('submit', function fetchMovieInfoYT
(e, movieTitle){
  e.preventDefault();
  var movieTitle = movieSearchYT.value;
  var imdbId = 'tt0078788';
  var YTsample = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q='+ imdbId + '+'+movieTitle+'+movie+official+trailer&key='+ YTAPIkey +'&max-results=5';
  fetch(YTsample)
  .then(function(response){
  return response.json();
})
  .then(function(data) {
    // console.log(data)
    var resultsYT = document.getElementById('resultsYT');
    var YTvideolink = data.items[0].id.videoId
    // resultsYT.innerHTML = '<p>'+ JSON.stringify(data) + '</p><a href="https://www.youtube.com/watch?v='+YTvideolink+'" target="_blank">Video Link HERE</a>'
    resultsYT.innerHTML = '<p>'+ movieTitle + '</p><a href="https://www.youtube.com/watch?v='+YTvideolink+'" target="_blank">Video Link HERE</a>'
    console.log(YTvideolink)
  })
})