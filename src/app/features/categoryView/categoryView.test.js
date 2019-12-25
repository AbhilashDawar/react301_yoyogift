import React from 'react';
import CategoryView from './index.jsx';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ContextStateProvider } from '../../shared/utilities/context/state.jsx';

test('categoryView Component', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <ContextStateProvider>
                <CategoryView />
            </ContextStateProvider>
        </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
