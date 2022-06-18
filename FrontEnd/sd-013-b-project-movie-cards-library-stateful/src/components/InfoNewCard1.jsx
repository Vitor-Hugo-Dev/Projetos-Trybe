import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InfoNewCard1 extends Component {
  render() {
    const { state, handleChange } = this.props;
    const { subtitle, title, imagePath } = state;
    return (
      <div>
        <label htmlFor="title" data-testid="title-input-label">
          Título
          <input
            type="text"
            name="title"
            value={ title }
            data-testid="title-input"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="subtitle" data-testid="subtitle-input-label">
          Subtítulo
          <input
            type="text"
            name="subtitle"
            value={ subtitle }
            onChange={ handleChange }
            data-testid="subtitle-input"
          />
        </label>
        <label htmlFor="imagePath" data-testid="image-input-label">
          Imagem
          <input
            data-testid="image-input"
            type="text"
            name="imagePath"
            value={ imagePath }
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}
InfoNewCard1.propTypes = {
  state: PropTypes.objectOf(
    PropTypes.shape({
      subtitle: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InfoNewCard1;
