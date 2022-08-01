import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer/reducer';
import gameReducer from './gameReducer/reducer';

export default configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});
