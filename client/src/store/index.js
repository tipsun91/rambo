// import { createStore } from 'redux';
// // import { composeWithDevTools } from 'redux-devtools-extension';
// import reducer from './rootReducer';

// const store = createStore(reducer);

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameReducer/reducer';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
