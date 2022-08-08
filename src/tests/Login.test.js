import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Cobertura de testes da tela de Login', () => {
  test('Se a rota da página inicial é "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })

  test('Se existe na página o botão "Play" e está desativado', () => {
    renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', {
      name: /play/i,
    })

    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();
  })

  test('Se existe na página o botão "Configurações" e está ativado', () => {
    renderWithRouterAndRedux(<App />);

    const settingButton = screen.getByRole('button', {
      name: /configurações/i,
    })

    expect(settingButton).toBeInTheDocument();
    expect(settingButton).not.toBeDisabled();
  })

  test('Se ao preencher nome e email é possível apertar no botão "Play"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nome = screen.getByTestId(/input-player-name/i);
    const email = screen.getByTestId(/input-gravatar-email/i);
    const playButton = screen.getByRole('button', {
      name: /play/i,
    })

    userEvent.type(nome, /test/i);
    userEvent.type(email, 'test@test.com');

    userEvent.click(playButton);
  })

  test('Se ao apertar no botão "Configurações", direciona para a rota "/settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingButton = screen.getByRole('button', {
      name: /configurações/i,
    })

    userEvent.click(settingButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  })

  test('Se ao preencher nome e email e apertar no botão "Play" direciona para a rota "/game"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nome = screen.getByTestId(/input-player-name/i);
    const email = screen.getByTestId(/input-gravatar-email/i);
    const playButton = screen.getByRole('button', {
      name: /play/i,
    })

    userEvent.type(nome, 'test');
    userEvent.type(email, 'test@test.com');

    userEvent.click(playButton);

    await waitForElementToBeRemoved(email);

    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  })
})
