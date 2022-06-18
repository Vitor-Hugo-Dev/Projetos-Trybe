import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie() {
    movieAPI.getMovies()
      .then((obj) => {
        this.setState({
          movies: obj,
          loading: false,
        });
      });
  }

  render() {
    const { movies, loading } = this.state;

    // outra forma:
    // Render Loading here if the request is still happening
    // if (movies.length === 0) {
    //   console.log(movies);
    //   return <Loading />;
    // }
    return (
      <div data-testid="movie-list">
        {loading ? <Loading />
          : movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        {loading ? null : <Link to="/movies/new">ADICIONAR CARTÃO</Link>}
      </div>
    );
  }
}

export default MovieList;
