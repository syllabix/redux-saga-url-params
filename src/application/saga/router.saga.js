import { router } from 'redux-saga-router';
import { put, fork } from 'redux-saga/effects';

import { history, parseURLParams } from '../util';
import { FilterActions } from '../state';


const routeSagas = {
    ['/search']: function * search() {
        let params = parseURLParams(location.search);
        console.info(params)
        yield put(FilterActions.set(params));
    }
}

export function* sagaRouter() {
    yield fork(router, history, routeSagas);
}