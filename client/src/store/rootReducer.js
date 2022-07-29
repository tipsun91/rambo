import { combineReducers } from 'redux';
import gameReducer from './gameReducer/reducer';

export default combineReducers({
  game: gameReducer,
});
