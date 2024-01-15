import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from "@redux-devtools/extension";

import { friendsReducer } from './friends/friendsReducer';

const rootReducer = combineReducers({
    friendsScope: friendsReducer,
    
})

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);