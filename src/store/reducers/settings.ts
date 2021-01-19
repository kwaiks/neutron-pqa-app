import { SAVE_SETTING } from "../constants/actionTypes";

const defaultState = {
    fileName: "Logging",
    interval: 1,
    duration: 30,
    pricePerKWh: 865
};

export default function dataReducer(state = defaultState, action: any) {
    switch(action.type) {
        case SAVE_SETTING:
            return action.payload;
        default:
            return state;
    }
}