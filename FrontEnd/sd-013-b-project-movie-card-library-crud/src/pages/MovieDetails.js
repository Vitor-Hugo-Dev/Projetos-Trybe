import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie() {
    console.log(this.props);
    const { match: { params: { id } } } = this.props;
    movieAPI.getMovie(id)
      .then((obj) => {
        this.setState({
          movie: obj,
          loading: false,
        });
      });
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;
    const { match: { params: { id } } } = this.props;
    const {
      loading,
      movie: {
        title,
        storyline,
        imagePath,
        genre,
        rating,
        subtitle } } = this.state;
    return (
      <div>
        {loading ? <Loading />
          : (
            <div data-testid="movie-details">
              <img alt="Movie Cover" src={ `../${imagePath}` } />
              <p>{`Título: ${title}`}</p>
              <p>{ `Subtitle: ${subtitle}` }</p>
              <p>{ `Storyline: ${storyline}` }</p>
              <p>{ `Genre: ${genre}` }</p>
              <p>{ `Rating: ${rating}` }</p>
              <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
              <br />
              <Link to="/">VOLTAR</Link>
              <br />
              <Link to="/" onClick={ () => movieAPI.deleteMovie(id) }>DELETAR</Link>
              {/* https://stackoverflow.com/questions/42800815/how-to-use-onclick-event-on-react-link-component */}
            </div>
          )}
      </div>
    );
  }
}
MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;
