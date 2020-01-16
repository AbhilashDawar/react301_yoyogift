import React from 'react';
import { shallow, mount } from 'enzyme';
import { Typography } from '@material-ui/core';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ContextStateProvider } from '../../shared/utilities/context/state.jsx';
import Home from './index.jsx';
import http from '../../shared/utilities/http';

jest.mock('axios');
describe('<Home />', () => {

    it('should have one Typography element', () => {
        jest.spyOn(http, 'GET').mockImplementation(() => Promise.resolve([
            {
                "id": "17-909-7507",
                "name": "DOYLE-NITZSCHE",
                "brand": "Levi's",
                "desc": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
                "imageUrl": "https://shop.r10s.jp/marukawa7/cabinet/test86/0117000298-20.jpg",
                "buyoutPoints": 1000,
                "categoryId": 1,
                "rating": 1,
                "discounts": 45
            },
            {
                "id": "17-909-7507",
                "name": "DOYLE-NITZSCHE",
                "brand": "Levi's",
                "desc": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
                "imageUrl": "https://shop.r10s.jp/marukawa7/cabinet/test86/0117000298-20.jpg",
                "buyoutPoints": 1000,
                "categoryId": 1,
                "rating": 1,
                "discounts": 45
            },
            {
                "id": "17-909-7507",
                "name": "DOYLE-NITZSCHE",
                "brand": "Levi's",
                "desc": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
                "imageUrl": "https://shop.r10s.jp/marukawa7/cabinet/test86/0117000298-20.jpg",
                "buyoutPoints": 1000,
                "categoryId": 1,
                "rating": 1,
                "discounts": 45
            },
            {
                "id": "17-909-7507",
                "name": "DOYLE-NITZSCHE",
                "brand": "Levi's",
                "desc": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
                "imageUrl": "https://shop.r10s.jp/marukawa7/cabinet/test86/0117000298-20.jpg",
                "buyoutPoints": 1000,
                "categoryId": 1,
                "rating": 1,
                "discounts": 45
            },
            {
                "id": "17-909-7507",
                "name": "DOYLE-NITZSCHE",
                "brand": "Levi's",
                "desc": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
                "imageUrl": "https://shop.r10s.jp/marukawa7/cabinet/test86/0117000298-20.jpg",
                "buyoutPoints": 1000,
                "categoryId": 1,
                "rating": 1,
                "discounts": 45
            },
            {
                "id": "17-909-7507",
                "name": "DOYLE-NITZSCHE",
                "brand": "Levi's",
                "desc": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
                "imageUrl": "https://shop.r10s.jp/marukawa7/cabinet/test86/0117000298-20.jpg",
                "buyoutPoints": 1000,
                "categoryId": 1,
                "rating": 1,
                "discounts": 45
            },
        ]));
        act(() => {
            const component = mount(
                <MemoryRouter>
                    <ContextStateProvider>
                        <Home />
                    </ContextStateProvider>
                </MemoryRouter>
            );
        })
        expect(component.find(Typography)).toHaveLength(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ContextStateProvider>
                    <Home />
                </ContextStateProvider>
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
