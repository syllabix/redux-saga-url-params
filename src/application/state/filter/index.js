import { createActions, handleActions, combineActions } from 'redux-actions';

const filterActions = createActions({
    FILTER: {
        COMMIT_UPDATE: (filter, value) => ({[filter]: value}),
        UPDATE: (filter, value) => ({[filter]: value}),
        SET: (filters) => (filters),
        CLEAR: () => ({})
    }
});

const actionCreators = filterActions.filter;
const { set, clear, update, commitUpdate } = actionCreators;

const reducers = handleActions({
    [combineActions(set, clear)]: (state, action) => (
        Object.assign({}, state, action.payload)
    ),
    [commitUpdate]: (state, action) => {
        const filterState = Object.assign({}, state.filters, action.payload)
        return Object.assign({}, state, filterState)
    }
}, {});

export {
    actionCreators,
    reducers
}
