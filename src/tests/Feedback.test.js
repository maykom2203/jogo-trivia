import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import Feedback from '../pages/Feedback';

describe('Cobertura de testes da tela de Feedback', () => {
  test('Se a rota da página de Feedback é "/feedback"', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
  })

  test('Se existe na página o botão "Play Again" e está ativado', () => {
    renderWithRouterAndRedux(<Feedback />);

    const playAgainButton = screen.getByRole('button', {
      name: /play again/i,
    })

    expect(playAgainButton).toBeInTheDocument();
    expect(playAgainButton).not.toBeDisabled();
  })

  test('Se existe na página o botão "Ranking" e está ativado', () => {
    renderWithRouterAndRedux(<Feedback />);

    const rankingButton = screen.getByRole('button', {
      name: /ranking/i,
    })

    expect(rankingButton).toBeInTheDocument();
    expect(rankingButton).not.toBeDisabled();
  })

  test('Se ao apertar no botão "Play Again", direciona para a rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const playAgainButton = screen.getByRole('button', {
      name: /play again/i,
    })

    userEvent.click(playAgainButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })

  test('Se ao apertar no botão "Ranking", direciona para a rota "/ranking"', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const rankingButton = screen.getByRole('button', {
      name: /ranking/i,
    })

    userEvent.click(rankingButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  })
})