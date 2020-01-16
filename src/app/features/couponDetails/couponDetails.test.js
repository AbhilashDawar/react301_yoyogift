import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import CouponDetails from './presenter.jsx';
import AppPopUp from '../../shared/atoms/popUp/index.jsx';
import http from '../../shared/utilities/http';

describe('<CouponDetails />', () => {

    it('should not have AppPopUp (because http is mocked)', () => {
        jest.mock('http');
        const component = mount(
            <MemoryRouter>
                <CouponDetails />
            </MemoryRouter>
        );
        expect(component.find(AppPopUp)).toHaveLength(0);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <CouponDetails />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
