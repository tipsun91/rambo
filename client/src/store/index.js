import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameReducer/reducer';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
