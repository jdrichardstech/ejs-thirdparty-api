const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const fetch = require('node-fetch');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const url = 'https://randomuser.me/api/?results=100';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const sortedData = data.results.sort((a, b) => {
        return a.name.last > b.name.last ? 1 : -1;
      });
      return res.render('index', { data: sortedData });
    });
});

app.get('/movies', (req, res) => {
  const url =
    'https://api.themoviedb.org/3/discover/movie?api_key=4160bdc56f74445097c8012631f85743&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2019&year=2019';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results.length);
      res.render('movies', { data: data.results });
    });
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
