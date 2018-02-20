import React from 'react';
import { connect } from 'react-redux';

import { FilterActions } from '../state';

//jconst Search = ({filters, addFilter}) => {
//j    //TODO: Change to React Component, and implement should component update to check if update was called only as a result of a query string param update
//j    console.log(filters)
//j    return (
//j    <div className="search-page">
//j        <h1>Search Page</h1>
//j        <section className="col-sm-4 filter-list">
//j            <h5>Filter Options</h5>
//j            <button onClick={() => addFilter('bmw', 'series 4') }>BWM</button>
//j            <input placeholder="Min Price" onKeyUp={(evt) => addFilter('minPrice', evt.target.value)} />
//j        </section>
//j    </div>
//j)}

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleFilterToggle = this.handleFilterToggle.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { filters } = this.props
    return (filters !== nextProps.filters)
  }

  toggleFilter (key, filters) {
    if (key in filters && filters[key] !== null) {
      return null
    } else {
      return ['']
    }
  }

  handleFilterToggle (event) {
    const { filters, addFilter } = this.props
    const [ child, ...parents ] = event.target.value.split('.').reverse() // support nested filters?
    const name = event.target.name

    if (parents.length === 0) {
      return name.length > 0
        ? addFilter(name, child)
        : addFilter(child, this.toggleFilter(child, filters))
    }

    function getFilterValue (p, child) {
      if (filters[p] !== undefined && filters[p] !== null) {
        if (Array.isArray(filters[p])) {
          if (filters[p].includes(child)) {
            if (filters[p].length === 1) {
              return null
            } else {
              return filters[p].filter(f => f !== child)
            }
          } else {
            return [ ...filters[p], child ]
          }
        }
      }
      return [child]
    }

    const p = parents[0]
    addFilter(
      p,
      getFilterValue(p, child)
    )

  }

  render () {
    const { filters, addFilter, filterSchema } = this.props
    return (
      <div className="search-page">
        <h1>Search Page</h1>
        <section className="col-sm-4 filter-list">
          <h5>Filter Options</h5>
          <h6>Make/Model</h6>
            {filterSchema.make.map(m => {
              const isMakeActive = (filters && m in filters && filters[m] !== null)
              const makeStyle = { color: isMakeActive ? 'palevioletred' : 'black' }
              return (
                <div key={m} >
                  <button style={makeStyle} onClick={this.handleFilterToggle} value={m}>{m}</button>
                  <ul>
                    {filterSchema.model[m].map(md => {
                      const isModelActive = (filters[m] && filters[m].includes(md)) 
                      const modelStyle = { color: isModelActive ? 'palevioletred' : 'black' }
                      return (
                        <li key={m+md}>
                          <button style={modelStyle} onClick={this.handleFilterToggle} value={`${m}.${md}`}>{md}</button>
                        </li>
                      )
                    }
                   )}
                  </ul>
                </div>
              )
            }
            )}
            
            <h6>Price</h6>
            <input placeholder="Min Price" name={'minPrice'} onKeyUp={this.handleFilterToggle} />
        </section>
      </div>
    )
  }

}


const stateToProps = state => {
    return {
        filters: state.filters,
        filterSchema: {
          make: ['bmw', 'ferrari', 'volkswagen', 'renault'],
          model: {
            bmw: ['series 4', 'series 3'],
            ferrari: ['f430', 'enzo'],
            volkswagen: ['polo', 'passat'],
            renault: ['clio']
          },
          minPrice: ''
        }
    }
}

const dispatcher = dispatch => {
    return {
        addFilter: (filter, value) => {dispatch(FilterActions.update(filter, value))}
    }
}


export default connect(stateToProps, dispatcher)(Search)
