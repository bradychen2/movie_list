const express = require('express')
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting for index
app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

// routes setting for search
app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movies => {
    return movies.title.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: keyword })
})

app.get('/movies/:movie_id', (req, res) => {
  console.log('movie_id: ', req.params.movie_id)
  const movie = movieList.results.find(
    movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movie })
})

app.listen(port, () => {
  console.log(`Express server is listening on http://localhost:${port}`)
})