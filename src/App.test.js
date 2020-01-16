import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { ThemeProvider } from '@material-ui/styles';

test('<App />', () => {
  const component = shallow(<App />);
  expect(component.find(ThemeProvider)).toHaveLength(1);
});
