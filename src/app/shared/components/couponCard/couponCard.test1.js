// import React from 'react';
// import CouponCard from './index.jsx';
// import renderer from 'react-test-renderer';
// import { MemoryRouter } from 'react-router-dom';
// import { ContextStateProvider } from '../../utilities/context/state.jsx';

// test('CouponCard Component', () => {
//     let props = {
//         imageUrl: 'image',
//         name: 'name',
//         desc: 'desc'
//     }
//     const tree = renderer.create(
//         <MemoryRouter>
//             <ContextStateProvider>
//                 <CouponCard gift={props} />
//             </ContextStateProvider>
//         </MemoryRouter>
//     ).toJSON();
//     expect(tree).toMatchSnapshot();
// });