export function testreducer(state, action) {
    console.log('Test Reducer');
    console.log(state);
    switch (action.type) {
        case 'TOGGLE_PRODUCT_CODE':
            return {
                ...state,
                showProductCode: action.payload
            };
        default:
            return state;
    }
}
