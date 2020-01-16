// import React from 'react';
// import InfoBox from './index.jsx';
// import renderer from 'react-test-renderer';
// import { MemoryRouter } from 'react-router-dom';
// import { ContextStateProvider } from '../../utilities/context/state.jsx';
// import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
// import { teal } from '@material-ui/core/colors';

// test('InfoBox Component', () => {
//     const tree = renderer.create(
//         <MemoryRouter>
//             <ContextStateProvider>
//                 <InfoBox Icon={CardGiftcardIcon}
//                     colorit={teal.A700}
//                     title="Gift Coupons Available"
//                     value={10} />
//             </ContextStateProvider>
//         </MemoryRouter>
//     ).toJSON();
//     expect(tree).toMatchSnapshot();
// });