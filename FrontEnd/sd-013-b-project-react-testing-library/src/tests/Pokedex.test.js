import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Teste o componente Pokedex', () => {
  test(' testa se ha um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const textEncountered = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(textEncountered).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button',
      { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);
    const nextPokemon = screen.getByText('Charmander');
    // console.log(nextPokemon);
    expect(nextPokemon).toBeInTheDocument();
  });
  test('testa se todos os pokemons são exibidos', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button',
      { name: 'Próximo pokémon' });
    pokemons.forEach((pokemon) => {
      const nextPokemon = screen.getByText(pokemon.name);
      expect(nextPokemon).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });
  test('testa de existem os botoes de tipos', () => {
    renderWithRouter(<App />);
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    const buttons = 7;
    expect(buttonType).toHaveLength(buttons);

    const buttonTypeAll = screen.getByText('All');
    expect(buttonTypeAll).toBeInTheDocument();
    userEvent.click(buttonTypeAll);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();

    const bugButton = screen.getByText('Bug');
    userEvent.click(bugButton);
    const checkPokemon = screen.getByText('Caterpie');
    expect(checkPokemon).toBeInTheDocument();
  });
});
