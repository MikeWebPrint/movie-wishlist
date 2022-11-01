// bootstrap modal
var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
  keyboard: true,
  focus: true
})
// OMDB 
var omdbAPIkey = 'a6d7ec72'
var searchForm = document.getElementById('searchForm')
var movieSearch = document.getElementById('movie-search-box')
var results = document.getElementById('results');
var mListContainer = document.querySelector('.last-viewed');
var movieTitle;

// search for a movie by title, 
searchForm.addEventListener('submit', function (e, movieTitle) {
  e.preventDefault();
  var movieTitle = movieSearch.value;
  fetchMovieInfo(movieTitle)
})
// get dummyData to pull a YouTube video during development
import { dummyData } from './modules/ytDummyData.js'; // don't need to turn this line off
function fetchMovieInfo(movieTitle) {
  // get data from omdb
  var omdbsample = 'https://www.omdbapi.com/?apikey=' + omdbAPIkey + '&t=' + movieTitle;
  movieSearch.value = '';
  movieSearch.blur();
  results.innerHTML = ''
  fetch(omdbsample)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Response === 'False') {
        console.log('Sorry, no movie by that name')
        myModal.show()
      } else {

        console.log(data)

        // insert movie data to a card on the results part of the page
        var currentMovie = document.createElement('div');
        currentMovie.setAttribute('class', 'card p-3');
        var currentMovieBody = document.createElement('div');
        currentMovieBody.setAttribute('class', 'card-body');
        currentMovieBody.setAttribute('id', 'currentMovieBody')
        var movieTitleDisplay = document.createElement('h3');
        movieTitleDisplay.innerHTML = '<h3 class="card-title">' + data.Title + '</h3>';
        console.log(movieTitle)
        var moviePoster = data.Poster;
        if (moviePoster !== "N/A") {
          var poster = document.createElement('img')
          poster.setAttribute('id', 'poster')
          poster.setAttribute('src', moviePoster)
          poster.setAttribute('class', 'card-img-top')
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
        if (checkFavMovies(movieTitle) === true) {
          favoriteButton.textContent = "Saved"
        } else {
          favoriteButton.textContent = "Add to Favorites"
        }
        favoriteButton.setAttribute('class', 'btn btn-fav')
        favoriteButton.addEventListener('click', function () {
          saveFavMovies(movieTitle)
          favoriteButton.textContent = "Saved"
        })
        currentMovieBody.append(movieActor, movieDirector, movieRated, movieYear, movieRating, movieGenre, favoriteButton);
        currentMovie.append(movieTitleDisplay, poster, currentMovieBody);
        results.append(currentMovie);
        // pass id data from omdb to the Google api to retrieve the trailer from YouTube and add it to the page
        var imdbId = data.imdbID;
        var YTAPIkey = 'AIzaSyDrzmBZCuAd6fYctQJe9WsiA7sfQjFDFJA'
        var YTsample = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q=' + imdbId + '+' + movieTitle + '+movie+official+trailer&key=' + YTAPIkey + '&max-results=5';
        // following 7 lines of code comment out to point to dummyData instead
        // fetch(YTsample)
        //   .then(function (response) {
        //     console.log(response)
        //     return response.json();
        //   })
        //   .then(function (data) {
        //     console.log(data)
            var data = dummyData; //toggle on for dummyData
            var YTvideolink = data.items[0].id.videoId
            var YTiframe = document.createElement('div');
            YTiframe.setAttribute('class', 'ratio ratio-16x9')
            YTiframe.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + YTvideolink + '" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            results.appendChild(YTiframe)
            console.log(YTvideolink)
            console.log(results)
// the following 1 line of closing brackets for live YT use.  Comment out for dummy data
          // } )
          // the following 3 lines of brackets remain in place
          }
    })
  }


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

// event listener on the View Favorites button
var currentMovieBody = document.getElementById('currentMovieBody')
var favBtn = document.getElementById('user-favorites');
var favoritesEl = document.getElementById('favorites-container')
favBtn.addEventListener('click', function (e) {
  e.preventDefault();
  hideSearch();
  viewFavorites();
})
// utility class to hide the search form when looking at favorites
function hideSearch() {
  searchForm.setAttribute('class', 'd-none')
}
function hideFavorites() {
  favoritesEl.setAttribute('class', 'd-none')
}
// view the list of favorite items
function viewFavorites() {
  hideResults();
  var favList = JSON.parse(localStorage.getItem('favMovies'))
  favoritesEl.setAttribute('class', 'd-block')
  favoritesEl.textContent = '';
  console.log(favList)
  favBtn.textContent = 'Go Back'; //go back to the main page
  favBtn.addEventListener('click', reload)
  /* Let's create variables to hold elements that will be used to create our table header*/
  let movieTable = document.createElement("table")
  /* Add bootstrap styling to table */
  movieTable.setAttribute("class", "table text-light table-striped");
  favoritesEl.appendChild(movieTable);

  // if no favorite items, hide the favorite panel and reload the page
  if (favList.length < 1) {
    favoritesEl.setAttribute('class', 'd-none');
    reload()
  } else {
    // iterate the list in localStorage and pull its info from omdb
    for (let i = 0; i < favList.length; i++) {
      movieTitle = favList[i];
      var omdbsample = 'https://www.omdbapi.com/?apikey=' + omdbAPIkey + '&t=' + movieTitle;
      fetch(omdbsample)
        .then(function (response) {
          console.log(response)
          return response.json();
        })
        .then(function (data) {
          // create the table and the content of each row by each movie
          console.log('Stored movie: ' + favList[i])
          var moviePoster = data.Poster
          var poster = document.createElement('img')
          poster.setAttribute('src', moviePoster)
          poster.setAttribute('class', 'favImg')
          poster.addEventListener('click', function () {
            console.log(favList[i])
            movieTitle = favList[i]
            fetchMovieInfo(movieTitle)
            showResults();
            hideFavorites();
          })
          let imgCell = document.createElement('td');
          imgCell.appendChild(poster)
          let favTitle = document.createElement('td');
          favTitle.textContent = favList[i];
          let remBtn = document.createElement('td');
          // set the functionality of the remove buttons
          remBtn.innerHTML = '<span class="btn btn-danger">Remove</span>';
          remBtn.addEventListener('click', function () {
            let itemToRemove = favList[i]
            let favMovies = JSON.parse(localStorage.getItem('favMovies'))
            console.log(favMovies[i])
            const index = favMovies.indexOf(itemToRemove)
            favMovies.splice(index, 1)
            console.log(favMovies)
            localStorage.setItem('favMovies', JSON.stringify(favMovies))
            viewFavorites()
          })
          let favRow = document.createElement('tr');
          favRow.append(imgCell, favTitle, remBtn);
          movieTable.appendChild(favRow);
        })
    }

  }
}
function reload() {
  window.location.reload();
}





// //================================= toggle style
// function hideShowElement(el) {
//   if (el.style.display === "none") {
//     el.style.display = "block";
//   } else {
//     el.style.display = "none";
//   }
// }

function saveFavMovies(movieTitle) {
  getFavMovies();
  if (getFavMovies() === null) {
    var favMovies = [];
  } else {
    var favMovies = JSON.parse(localStorage.getItem('favMovies'))
  }
  if (favMovies.indexOf(movieTitle) < 0) {
    favMovies.push(movieTitle)
  }
  localStorage.setItem('favMovies', JSON.stringify(favMovies))
}
function getFavMovies() {
  var favMovies = JSON.parse(localStorage.getItem('favMovies'))
  if (favMovies) {
    // viewFavorites(favMovies)
  }
  return favMovies
}
function checkFavMovies(movieTitle) {
  var isSaved = false;
  var favMovies = JSON.parse(localStorage.getItem('favMovies'))
  if (favMovies){
    const index = favMovies.indexOf(movieTitle)
    if (index >= 0) {
      isSaved = true;
    }
  }
  console.log('this movie is: ' + movieTitle)
  return isSaved
}

function hideResults() {
  results.setAttribute('class', 'd-none')
}
function showResults() {
  results.setAttribute('class', 'd-block')
}




