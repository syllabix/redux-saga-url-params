import { combineReducers } from 'redux';

import { reducers as filters } from './filter';
import { reducers as routes } from './route';

const rootReducer = combineReducers({
    filters,
    routes
});

export default rootReducer;