import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import sagas from '../store/sagas';
const config = {
  key: 'root',
  storage: AsyncStorage,
  debug: true, //to get useful logging
  version: 1,
};
const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (__DEV__) {
  // middleware.push(createLogger());
}

const enhancers = [...middleware];
const persistConfig: any = {enhancers};

const reducers = persistReducer(config, rootReducer);

export const store = configureStore({
  reducer: reducers,
  middleware: gDM =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(enhancers),
});

sagaMiddleware.run(sagas);
export const persistor = persistStore(store, persistConfig);
