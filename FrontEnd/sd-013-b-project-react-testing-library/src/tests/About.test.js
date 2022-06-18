import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testes do componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const aboutInfos = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutInfos).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const aboutText = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(aboutText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const textPokedex1 = screen.getByText(/This application simulates a Pokédex/i);
    const textPokedex2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(textPokedex1).toBeInTheDocument();
    expect(textPokedex2).toBeInTheDocument();
  });

  test('Testa se é renderizada uma imagem na pagina About.', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const aboutImg = screen.getByRole('img');
    expect(aboutImg).toBeInTheDocument();
    expect(aboutImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
// commit inicial.
