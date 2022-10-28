// OMDB 
var omdbAPIkey = 'a6d7ec72'
var searchForm = document.getElementById('searchForm')
var movieSearch = document.getElementById('movie-search-box')
var results = document.getElementById('results');
var movieStorage = JSON.parse(localStorage.getItem('movie')) || [];
var mListContainer = document.querySelector('.last-viewed');

searchForm.addEventListener('submit', function fetchMovieInfo
  (e, movieTitle) {
  e.preventDefault();

  var movieTitle = movieSearch.value;
  var omdbsample = 'https://www.omdbapi.com/?apikey=' + omdbAPIkey + '&t=' + movieTitle;
  movieSearch.value = '';
  movieSearch.blur();
  results.innerHTML = ''
  fetch(omdbsample)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      movieStorage.push(data.Title);
      localStorage.setItem("movie", JSON.stringify(movieStorage))

      // printLastViewed(movieStorage);

      var currentMovie = document.createElement('div');
      currentMovie.setAttribute('class', 'row card');
      var currentMovieBody = document.createElement('div');
      currentMovieBody.setAttribute('class', 'card-body');
      currentMovieBody.setAttribute('id', 'currentMovieBody')
      var movieTitleDisplay = document.createElement('h3');
      movieTitleDisplay.textContent = "Title: " + data.Title;
      console.log(movieTitle)
      var moviePoster = data.Poster;
      if (moviePoster !== "N/A") {
        var poster = document.createElement('img')
        poster.setAttribute('id', 'poster')
        poster.setAttribute('src', moviePoster)
        results.appendChild(poster)
      }
      var movieActor = document.createElement('p');
      movieActor.textContent = "Actors: " + data.Actors;
      var movieDirector = document.createElement('p');
      movieDirector.textContent = "Director: " + data.Director;
      var movieRated = document.createElement('p');
      movieRated.textContent = "Rated: " + data.Rated;
      var movieYear = document.createElement('p');
      movieYear.textContent = "Year: " + data.Year;
      var movieRating = document.createElement('p');
      movieRating.textContent = "Rating: " + data.imdbRating;
      var movieGenre = document.createElement('p');
      movieGenre.textContent = "Genre: " + data.Genre;
      var favoriteButton = document.createElement('button');
      
     
      
      


      currentMovieBody.append(movieTitle, movieActor, movieDirector,movieRated, movieYear, movieRating, movieGenre, favoriteButton);
      currentMovie.append(currentMovieBody);
      results.append(currentMovie);
      var imdbId = data.imdbID;
      var YTAPIkey = 'AIzaSyDrzmBZCuAd6fYctQJe9WsiA7sfQjFDFJA'
      var YTsample = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q=' + imdbId + '+' + movieTitle + '+movie+official+trailer&key=' + YTAPIkey + '&max-results=5';
      // following code commented out to point to dummyData instead
      // fetch(YTsample)
      // .then(function(response){
      //   console.log(response)
      //   return response.json();
      // })
      // .then(function(data) {
      //   console.log(data)
      var data = dummyData;
      var YTvideolink = data.items[0].id.videoId
      var previewButton = document.createElement('a');
      previewButton.innerHTML = '<h4>Watch Trailer</h4>';
      previewButton.setAttribute('href', ('https://www.youtube.com/watch?v=' + YTvideolink));
      results.appendChild(previewButton)
      var YTiframe = document.createElement('div');
      YTiframe.setAttribute('class', 'ratio ratio-16x9')
      YTiframe.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + YTvideolink + '" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      results.appendChild(YTiframe)
      console.log(YTvideolink)


    })
})
// when switching back from dummyData, uncomment the following brackets
// })

import { dummyData } from './modules/ytDummyData.js';
console.log(dummyData);

// function printLastViewed(){
//   mListContainer.innerHTML='';

//  for(var i = 0; i < movieStorage.length; i++)
//   {
//    var movieList=document.createElement('li');
//    movieList.innerHTML += movieStorage[i];

//     mListContainer.append(movieList);

//   }
//   console.log(movieList);
// }

var currentMovieBody = document.getElementById('currentMovieBody')
var favBtn = document.getElementById('user-favorites');
var favoritesEl = document.getElementById('favorites-container')
favBtn.addEventListener('click', function () {
  hideSearch();
  viewFavorites();
})

function hideSearch() {
  searchForm.setAttribute('class', 'd-none')
}
function viewFavorites() {
  favoritesEl.setAttribute('class', 'd-block')
}
function reload() {
  window.location.reload();
}
// hideSearch();
viewFavorites()
