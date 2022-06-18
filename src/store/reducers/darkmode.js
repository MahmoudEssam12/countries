const INITIAL_STATE = {
    mode: "dark"
}

export function darkmodeReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_DARKMODE":
            return {
                mode: action.payload
            };
        default:
            return state;
    }
}