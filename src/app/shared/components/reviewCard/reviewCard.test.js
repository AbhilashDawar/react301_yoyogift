import React from 'react';
import ReviewCard from './index.jsx';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ContextStateProvider } from '../../utilities/context/state.jsx';

test('ReviewCard Component', () => {
    let props = {
        review: {
            userName: 'name',
            rating: 2,
            review: 'review',
        }
    };
    const tree = renderer.create(
        <MemoryRouter>
            <ContextStateProvider>
                <ReviewCard review={props.review} />
            </ContextStateProvider>
        </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});