import { createStore } from 'redux';

const initailState = [
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false }
]
function click (state = initailState, action) {
    switch (action.type) {
        case 'GET':
            return state;
        case 'PUT':
            let Data = [...state];
            Data.map((item) => {
                if (item.id === action.id) {
                    return item.active = !item.active
                } else {
                    return item
                }
            })
            return Data;
        default:
            return state;
    }
}

let store = createStore(click);
export default store;