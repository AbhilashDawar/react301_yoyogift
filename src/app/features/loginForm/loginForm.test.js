import React from 'react';
import LoginForm from './index.jsx';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ContextStateProvider } from '../../shared/utilities/context/state.jsx';

test('loginForm Component', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <ContextStateProvider>
                <LoginForm />
            </ContextStateProvider>
        </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});