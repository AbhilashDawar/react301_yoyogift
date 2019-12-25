import React from 'react';
import AppButton from './index.jsx';
import renderer from 'react-test-renderer';

test('AppButton Component', () => {
    const tree = renderer.create(
        <AppButton />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});