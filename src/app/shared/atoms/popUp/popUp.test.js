import React from 'react';
import AppPopUp from './index.jsx';
import renderer from 'react-test-renderer';

test('AppPopUp Component', () => {
    const tree = renderer.create(
        <AppPopUp />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});