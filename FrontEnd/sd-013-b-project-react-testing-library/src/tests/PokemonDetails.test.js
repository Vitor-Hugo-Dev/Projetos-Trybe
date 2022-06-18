import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste componente PokemonDetails', () => {
  const pikachuRoute = '/pokemons/25';
  test('Teste se as informações do Pokémon selecionado são renderizadas', () => {
    const { history } = renderWithRouter(<App />);
    const buttonDetails = screen.getByText('More details');
    expect(buttonDetails).toBeInTheDocument();

    history.push(pikachuRoute);
    expect(buttonDetails).not.toBeInTheDocument();

    const textDetails = screen.getByRole('heading',
      { level: 2, name: 'Pikachu Details' });
    expect(textDetails).toBeInTheDocument();

    const getSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(getSummary).toBeInTheDocument();

    const getResume = screen.getByText(/with electricity/i);
    expect(getResume).toBeInTheDocument();
  });

  test('Teste se existe uma seção com os mapas com as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuRoute);
    const locationsPokemon = screen.getByRole('heading',
      { level: 2, name: /Locations of Pikachu/i });
    expect(locationsPokemon).toBeInTheDocument();

    const getMapPokemon = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(getMapPokemon).toHaveLength(2);
    expect(getMapPokemon[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(getMapPokemon[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const mapName = screen.getAllByText(/kanto/i);
    expect(mapName).toHaveLength(2);
  });

  test('Teste se o usuário pode favoritar um pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuRoute);

    const favButton = screen.getByLabelText(/favoritado?/);
    expect(favButton).toBeInTheDocument();
    expect(favButton).not.toBeChecked();
    userEvent.click(favButton);
    expect(favButton).toBeChecked();
  });
});
