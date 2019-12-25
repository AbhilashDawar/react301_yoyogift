import React from 'react';
import AdminDashboard from './index.jsx';
import renderer from 'react-test-renderer';

test('adminDashboard', () => {
  const tree = renderer.create(<AdminDashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
