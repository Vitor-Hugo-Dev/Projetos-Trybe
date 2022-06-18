import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente NotFound', () => {
  test('testa se é renderizada uma pagina de notFoud quando a rota não existe', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./rotaErrada');
    const textNotFound = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });
    expect(textNotFound).toBeInTheDocument();

    const imgNotFound = screen.getByRole('img', { name: /Pikachu crying because/i });
    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
