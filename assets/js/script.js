// OMDB 
var omdbAPIkey = 'a6d7ec72'
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
    printResults(data)
    console.log(data)
    var imdbId = data.imdbID;
    var YTAPIkey = 'AIzaSyDrzmBZCuAd6fYctQJe9WsiA7sfQjFDFJA'
    var YTsample = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q='+ imdbId + '+'+movieTitle+'+movie+official+trailer&key='+ YTAPIkey +'&max-results=5';
    fetch(YTsample)
    .then(function(response){
    return response.json();
  })
    .then(function(data) {
      var resultsYT = document.getElementById('resultsYT');
      var YTvideolink = data.items[0].id.videoId
      resultsYT.innerHTML = '<p>'+ movieTitle + '</p><a href="https://www.youtube.com/watch?v='+YTvideolink+'" target="_blank">Video Link HERE</a>'
      console.log(YTvideolink)
    })
    return data
    })

})

function printResults(data){
  //results.innerHTML='';
  var YTvideolink = data.items[0].id.videoId

   var currentMovie= document.createElement('div');
  currentMovie.classList.add('row', 'card');

  var currentMovieBody= document.createElement('div');
  currentMovieBody.classList.add('card-body');
  currentMovie.append(currentMovieBody);
   
  var movieTitle = document.createElement('h3');
  movieTitle.textContent = "Title: " + data.Title;
  console.log(movieTitle)
  
  var moviePoster= data.Poster;
  
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
  var previewButton= document.createElement('a');
  previewButton.textContent= 'Watch Preview';
  previewButton.setAttribute('href', ('https://www.youtube.com/watch?v=' + YTvideolink))

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

// var YTAPIkey = 'AIzaSyDrzmBZCuAd6fYctQJe9WsiA7sfQjFDFJA'
// // i=tt3896198&
// var searchFormTest = document.getElementById('searchFormTest')
// var movieSearchYT = document.getElementById('movie-search-boxYT')
// searchFormTest.addEventListener('submit', function fetchMovieInfoYT
// (e, movieTitle){
//   e.preventDefault();
//   var movieTitle = movieSearchYT.value;
//   var imdbId = 'tt0083399';
//   var YTsample = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q='+ imdbId + '+'+movieTitle+'+movie+official+trailer&key='+ YTAPIkey +'&max-results=5';
//   fetch(YTsample)
//   .then(function(response){
//   return response.json();
// })
//   .then(function(data) {
//     // console.log(data)
//     var resultsYT = document.getElementById('resultsYT');
//     var YTvideolink = data.items[0].id.videoId
//     // resultsYT.innerHTML = '<p>'+ JSON.stringify(data) + '</p><a href="https://www.youtube.com/watch?v='+YTvideolink+'" target="_blank">Video Link HERE</a>'
//     resultsYT.innerHTML = '<p>'+ movieTitle + '</p><a href="https://www.youtube.com/watch?v='+YTvideolink+'" target="_blank">Video Link HERE</a>'
//     console.log(YTvideolink)
//   })
// })