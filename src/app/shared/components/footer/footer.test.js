import React from 'react';
import AppFooter from './index.jsx';
import renderer from 'react-test-renderer';

test('AppFooter Component', () => {
    const tree = renderer.create(
        <AppFooter />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});