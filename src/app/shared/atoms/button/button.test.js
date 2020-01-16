import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Button } from '@material-ui/core';
import AppButton from './index.jsx';

describe('<AppButton />', () => {
    it('should have one Button element', () => {
        const wrapper = shallow((<AppButton content="myButton" />));
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <AppButton />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});