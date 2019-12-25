import React from 'react';
import CategoryList from './index.jsx';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ContextStateProvider } from '../../utilities/context/state.jsx';

test('CategoryList Component', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <ContextStateProvider>
                <CategoryList />
            </ContextStateProvider>
        </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});