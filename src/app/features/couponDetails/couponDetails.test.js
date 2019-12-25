import React from 'react';
import CouponDetails from './presenter.jsx';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

test('categoryView Component', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <CouponDetails />
        </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
