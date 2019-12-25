import React from 'react';
import Home from './index.jsx';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ContextStateProvider } from '../../shared/utilities/context/state.jsx';

test('home Component', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <ContextStateProvider>
                <Home />
            </ContextStateProvider>
        </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});