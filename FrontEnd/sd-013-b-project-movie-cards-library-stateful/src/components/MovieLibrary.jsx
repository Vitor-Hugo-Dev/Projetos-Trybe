import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onBookmarkedChange = this.onBookmarkedChange.bind(this);
    this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    // console.log('teste');
  }

  onClick(newMovie) {
    const { movies } = this.state;
    this.setState({
      movies: [...movies, newMovie],
    });
  }

  onSelectedGenreChange({ target }) {
    const { value } = target;
    const { movies } = this.props;
    const filterListMovies = movies.filter((movie) => movie.genre === value);
    if (value === '') {
      return this.setState({
        movies,
        selectedGenre: value,
      });
    }
    this.setState({
      movies: filterListMovies,
      selectedGenre: value,
    });
  }

  onBookmarkedChange() {
    const { movies } = this.props;
    const { bookmarkedOnly } = this.state;
    const filterListMovies = movies.filter((movie) => movie.bookmarked === true);
    if (bookmarkedOnly === false) {
      return this.setState({
        movies: filterListMovies,
        bookmarkedOnly: true,
      });
    }
    this.setState({
      movies,
      bookmarkedOnly: false,
    });
  }

  onSearchTextChange({ target }) {
    const { value } = target;
    const { movies } = this.props;
    const filterListMovies = movies.filter((movie) => movie.title.includes(value)
      || movie.subtitle.includes(value)
      || movie.storyline.includes(value));
    this.setState({
      movies: filterListMovies,
      searchText: value,
    });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre, movies } = this.state;
    return (
      <div>
        <h2> My awesome movie library </h2>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.onSearchTextChange }
          bookmarkedOnl={ bookmarkedOnly }
          onBookmarkedChange={ this.onBookmarkedChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.onSelectedGenreChange }
          movies={ movies }
        />
        <MovieList movies={ movies } />
        <AddMovie onClick={ this.onClick } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      storyline: PropTypes.string,
      rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      imagePath: PropTypes.string,
    }),
  ).isRequired,
};

export default MovieLibrary;
