import * as React from 'react';

let ContextState = React.createContext();

let initialState = {
    showLoader: false,
    // filterParams: {
    //     startValue: config.rangeDefaults.min,
    //     endValue: config.rangeDefaults.max,
    //     discountOption: 0
    // }
};

let reducer = (state, action) => {
    switch (action.type) {
        case "RESET":
            return initialState;
        case "SHOW":
            return { ...state, showLoader: true };
        case "HIDE":
            return { ...state, showLoader: false };
        // case "UPDATE_FILTERS":
        //     return { ...state, filterParams: action.payload };
        default:
            return { ...state };
    }
};

function ContextStateProvider(props) {
    let [state, dispatch] = React.useReducer(reducer, initialState);
    let value = { state, dispatch };

    return (
        <ContextState.Provider value={value}>{props.children}</ContextState.Provider>
    );
}

let ContextStateConsumer = ContextState.Consumer;

export { ContextState, ContextStateProvider, ContextStateConsumer };