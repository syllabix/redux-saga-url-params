import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { history, parseURLParams } from '../util';
import { FilterActions } from '../state';
import qs from 'qs';

const getFilters = state => state.filters

function * filterUpdate(action) {
    const curFilters = yield select(getFilters)
    const params = qs.stringify(Object.assign({}, curFilters, action.payload));
    history.replace(`?${params}`)
}

export function* handleFilterUpdate() {
    yield takeLatest(FilterActions.update.toString(), filterUpdate);
}