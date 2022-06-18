import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe(' Teste o componente FavoritePokemons', () => {
  test('testa a mensagem quando não há pokemons favoritos', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(linkFavorite);
    const noPokeFavorite = screen.getByText('No favorite pokemon found');
    expect(noPokeFavorite).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favButton = screen.getByRole('checkbox');
    expect(favButton).toBeInTheDocument();
    userEvent.click(favButton);

    history.push('/pokemons/4');
    userEvent.click(favButton);

    history.push('/favorites');
    const pokeFav = screen.getAllByRole('img');
    const imgLength = 4;
    expect(pokeFav).toHaveLength(imgLength);
  });
});
