import React from 'react';
import AppFilter from './index.jsx';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ContextStateProvider } from '../../utilities/context/state.jsx';

test('AppFilter Component', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <ContextStateProvider>
                <AppFilter />
            </ContextStateProvider>
        </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});