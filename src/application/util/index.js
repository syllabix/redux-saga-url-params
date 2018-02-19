import createBrowserHistory from 'history/createBrowserHistory';
import qs from 'qs';

const history = createBrowserHistory();

const parseURLParams = (params = '') => {
    const p = qs.parse(params, { strictNullHandling: true, ignoreQueryPrefix: true, encode: false });
    return p 
}

export {
    history,
    parseURLParams
}
