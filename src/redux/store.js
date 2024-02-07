// store.js
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Choose your storage engine
import rootReducer from './reducers'; // Import your root reducer
import { thunk } from 'redux-thunk';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);