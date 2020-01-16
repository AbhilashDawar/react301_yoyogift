import React from 'react';
import { shallow, mount } from 'enzyme';
import AdminDashboard from './index.jsx';
import renderer from 'react-test-renderer';
import InfoBox from '../../shared/components/infoBox';
import http from '../../shared/utilities/http';

describe('<AdminDashboard />', () => {
    it('should have one Button element', () => {
        const component = shallow((<AdminDashboard />));
        expect(component.find(InfoBox)).toHaveLength(4);
    });

    it('should mount and check useEffect hook', () => {
        jest.mock('http');
        const component = mount((<AdminDashboard />));
        expect(component.find(InfoBox)).toHaveLength(4);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<AdminDashboard />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
