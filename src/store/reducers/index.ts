import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import { history } from '../history';
import meter from './meter';
import settings from './settings';

export default combineReducers({
    meter,
    settings,
    router: connectRouter(history)
});