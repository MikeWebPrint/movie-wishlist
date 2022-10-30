// OMDB 
var omdbAPIkey = 'a6d7ec72'
var searchForm = document.getElementById('searchForm')
var movieSearch = document.getElementById('movie-search-box')
var results = document.getElementById('results');
var mListContainer = document.querySelector('.last-viewed');
var movieTitle;


searchForm.addEventListener('submit', function fetchMovieInfo
  (e, movieTitle) {
  e.preventDefault();

  movieTitle = movieSearch.value;
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
        results.innerHTML = '<h3>Sorry, no movie by that name.  Search again.</h3>'
      } else {

        console.log(data)
        // saveFavMovies(movieTitle)
        // printLastViewed(movieStorage);

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
        favoriteButton.textContent = "Add to Favorites"
        favoriteButton.setAttribute('class', 'btn btn-fav')
        favoriteButton.addEventListener('click', function () {
          saveFavMovies(movieTitle)
        })
        currentMovieBody.append(movieActor, movieDirector, movieRated, movieYear, movieRating, movieGenre, favoriteButton);
        currentMovie.append(movieTitleDisplay, poster, currentMovieBody);
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
        // var previewButton = document.createElement('a');
        // previewButton.innerHTML = '<h4>Watch Trailer</h4>';
        // previewButton.setAttribute('href', ('https://www.youtube.com/watch?v=' + YTvideolink));
        // results.appendChild(previewButton)
        var YTiframe = document.createElement('div');
        YTiframe.setAttribute('class', 'ratio ratio-16x9')
        YTiframe.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + YTvideolink + '" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        results.appendChild(YTiframe)
        console.log(YTvideolink)
        console.log(results)

      } //this bracket closes else statement in fetch
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
favBtn.addEventListener('click', function (e) {
  e.preventDefault();
  hideSearch();
  viewFavorites();
})

function hideSearch() {
  searchForm.setAttribute('class', 'd-none')
}

function viewFavorites() {
  hideResults();
  favoritesEl.setAttribute('class', 'd-block')
  var favList = JSON.parse(localStorage.getItem('favMovies'))
  console.log(favList)
  favBtn.textContent = 'Go Back';
  favBtn.addEventListener('click', reload)


  /* Let's create variables to hold elements that will be used to create our table header*/
  let movieTable = document.createElement("table")


  /* Add bootstrap styling to table */
  movieTable.setAttribute("class", "table text-light table-striped");

  /*add movie table to div with id "table"*/
  // document.getElementById("table").textContent = '';
  document.getElementById("table").appendChild(movieTable);



  // favoritesEl.textContent = favList
  if (favList){
    for (let i = 0; i < favList.length; i++) {
      movieTitle = favList[i];
      var omdbsample = 'https://www.omdbapi.com/?apikey=' + omdbAPIkey + '&t=' + movieTitle;
      fetch(omdbsample)
        .then(function (response) {
          console.log(response)
          return response.json();
        })
        .then(function (data) {
          console.log('Stored movie: ' + favList[i])
          var moviePoster = data.Poster
          var poster = document.createElement('img')
          poster.setAttribute('src', moviePoster)
          poster.setAttribute('class', 'favImg')
          let imgCell = document.createElement('td');
          imgCell.appendChild(poster)
          let favTitle = document.createElement('td');
          // favTitle.setAttribute('class', 'text-light')
          favTitle.textContent = favList[i];
          let remBtn = document.createElement('td');
          remBtn.innerHTML = '<span class="btn btn-danger">Remove</span>';
          let favRow = document.createElement('tr');
          favRow.append(imgCell, favTitle, remBtn);
          movieTable.appendChild(favRow);
        })
  // add more instructions for each movie in the list here
    }

  }
}
function reload() {
  window.location.reload();
}
// hideSearch();
// viewFavorites()




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

function hideResults() {
  results.setAttribute('class', 'd-none')
}
