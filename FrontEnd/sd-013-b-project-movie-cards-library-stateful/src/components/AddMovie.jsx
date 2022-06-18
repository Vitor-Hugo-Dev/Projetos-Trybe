import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfoNewCard1 from './InfoNewCard1';
import InfoNewCard2 from './InfoNewCard2';

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { onClick } = this.props;
    const { subtitle, title, imagePath, storyline, rating, genre } = this.state;
    return (
      <form method="get" data-testid="add-movie-form">
        <InfoNewCard1
          state={ { subtitle, title, imagePath } }
          handleChange={ this.handleChange }
        />
        <InfoNewCard2
          state={ { storyline, rating, genre } }
          handleChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="send-button"
          onClick={ () => {
            onClick(this.state);
            return this.setState({
              subtitle: '',
              title: '',
              imagePath: '',
              storyline: '',
              rating: 0,
              genre: 'action',
            });
          } }
        >
          Adicionar filme
        </button>
      </form>
    );
  }
}
AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddMovie;
