import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('teste o componente <App />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      const navBar = screen.getByRole('navigation');
      const linkHome = screen.getByRole('link', { name: 'Home' });
      const linkAbout = screen.getByRole('link', { name: 'About' });
      const linkFavorite = screen.getByRole('link', { name: /favorite/i });

      expect(navBar).toBeInTheDocument();
      expect(linkHome).toBeInTheDocument();
      expect(linkAbout).toBeInTheDocument();
      expect(linkFavorite).toBeInTheDocument();
    });

  test('testa o link Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const homeText = screen.getByRole('heading', { level: 2, name: /Encountered/i });
    expect(homeText).toBeInTheDocument();
  });

  test('testa o link About', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const aboutText = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(aboutText).toBeInTheDocument();
  });

  test('testa o link Favoritos', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(linkFavorite);
    const favoriteText = screen.getByRole('heading',
      { level: 2, name: /favorite pokémons/i });
    expect(favoriteText).toBeInTheDocument();
  });
});
