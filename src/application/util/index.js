import createBrowserHistory from 'history/createBrowserHistory';
import qs from 'qs';

const history = createBrowserHistory();

const parseURLParams = (params = '') => {
    const options = {
      strictNullHandling: true, // necessary for toggling params (otherwise qs doesn't differentiate between empty strings and null)
      ignoreQueryPrefix: true, // don't include ? at start of params
      encode: false // debuggging
    }
    return qs.parse(params, options);  
}

export {
    history,
    parseURLParams
}
