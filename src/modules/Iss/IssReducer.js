/**
 * Created by patrykmazurkiewicz on 18/04/2017.
 */
import { GET_COORDS, GET_AREA } from './IssActions';

const initialState = {
    coords: {},
    area: ''
};

const IssReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COORDS:
            return {
                ...state,
                coords: action.coords
            };

        case GET_AREA:
            return {
                ...state,
                area: action.area
            };

        default:
            return state;
    }
};

export default IssReducer;