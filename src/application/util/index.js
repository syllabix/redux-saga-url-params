import createBrowserHistory from 'history/createBrowserHistory';
import qs from 'qs';

const history = createBrowserHistory();

const parseURLParams = (params = '') => {
    let search = params.replace(/^\?/, '');
    return qs.parse(search);
}

export {
    history,
    parseURLParams
}