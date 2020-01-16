import React from 'react';
import { shallow, mount } from 'enzyme';
import CategoryView from './index.jsx';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ContextStateProvider } from '../../shared/utilities/context/state.jsx';
import http from '../../shared/utilities/http';
import AppFilter from '../../shared/components/filter';

describe('<CategoryView />', () => {

    it('should have one AppFilter element', () => {
        jest.mock('http');
        const component = mount(
            <MemoryRouter>
                <ContextStateProvider>
                    <CategoryView />
                </ContextStateProvider>
            </MemoryRouter>
        );
        expect(component.find(AppFilter)).toHaveLength(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ContextStateProvider>
                    <CategoryView />
                </ContextStateProvider>
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
