import { createActions, handleActions, combineActions } from 'redux-actions';
import routes from '../../route'

const routeActions = createActions({
    ROUTES: {
        ADD: (route) => (route)
    }
});

const actionCreators = routeActions.routes;
const { add } = actionCreators;

const reducers = handleActions({
    [add]: (state, action) => (
        Object.assign({}, state, action.payload)
    )
}, routes);

export {
    actionCreators,
    reducers
}