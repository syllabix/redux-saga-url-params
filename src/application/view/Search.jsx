import React from 'react';
import { connect } from 'react-redux';

import { FilterActions } from '../state';

const Search = ({filters, addFilter}) => {
    console.log('search render')
    return (
    <div className="search-page">
        <h1>Search Page</h1>
        <section className="col-sm-4 filter-list">
            <h5>Filter Options</h5>
            <button onClick={() => addFilter('bmw', 'series 4') }>BWM</button>
            <input placeholder="Min Price" onKeyUp={(evt) => addFilter('minPrice', evt.target.value)} />
        </section>
    </div>
)}

const stateToProps = state => {
    return {
        filters: state.filters
    }
}

const dispatcher = dispatch => {
    return {
        addFilter: (filter, value) => {dispatch(FilterActions.update(filter, value))}
    }
}


export default connect(stateToProps, dispatcher)(Search)