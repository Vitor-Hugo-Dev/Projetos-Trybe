import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InfoNewCard2 extends Component {
  render() {
    const { state, handleChange } = this.props;
    const { storyline, rating, genre } = state;
    return (
      <div>
        <label htmlFor="storyline" data-testid="storyline-input-label">
          Sinopse
          <textarea
            name="storyline"
            value={ storyline }
            cols="30"
            rows="5"
            data-testid="storyline-input"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="rating" data-testid="rating-input-label">
          Avaliação
          <input
            type="number"
            value={ rating }
            name="rating"
            onChange={ handleChange }
            data-testid="rating-input"
          />
        </label>
        <label htmlFor="genre" data-testid="genre-input-label">
          Gênero
          <select
            name="genre"
            value={ genre }
            data-testid="genre-input"
            onChange={ handleChange }
          >
            <option value="action" data-testid="genre-option">
              Ação
            </option>
            <option value="comedy" data-testid="genre-option">
              Comédia
            </option>
            <option value="thriller" data-testid="genre-option">
              Suspense
            </option>
          </select>
        </label>
      </div>
    );
  }
}
InfoNewCard2.propTypes = {
  state: PropTypes.objectOf(
    PropTypes.shape({
      storyline: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      genre: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InfoNewCard2;
