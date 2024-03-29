import {combineReducers,configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import filterReducer from './Filter/FilterSlice';
import listingsReducer from './Listings/Listings'
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
const rootReducer=combineReducers({user:userReducer,filter:filterReducer,Listings:listingsReducer})
const persistConfig={
    key:'root',
    storage,
    version:1,

}
const persistedReducer=persistReducer(persistConfig,rootReducer)
export const  store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    }),
})

export const persistor= persistStore(store);
