import React from 'react';
import { connect } from 'react-redux';

import { FilterActions } from '../state';
import _get from 'lodash/get';

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
    this.handleFilterToggle = this.handleFilterToggle.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { filters } = this.props
    return (filters !== nextProps.filters)
  }

  toggleFilter (key) {
    const { addFilter, filters } = this.props
    if (key in filters && filters[key] !== null) {
      console.log('- ', key) 
      addFilter(key, null)
    } else {
      console.log('+ ', key) 
      addFilter(key, [''])
    }
  }

  handleFilterToggle (event) {
    const { filters, addFilter } = this.props
    const [ child, ...parents ] = event.target.value.split('.').reverse()
    if (parents.length === 0) {
      return this.toggleFilter(child)
    }
    parents.forEach((p, i) => {
      if (filters[p] !== undefined && filters[p] !== null) {
        if (Array.isArray(filters[p])) {
          if (filters[p].includes(child)) {
						if (filters[p].length === 1) {
							addFilter(p, null)
						} else {
              const rest = filters[p].filter(f => f !== child)
              addFilter(p, rest)
            }
          } else {
            const newFilters = [ ...filters[p], child ]
            addFilter(p, newFilters)
          }
        }
      } else {
        addFilter(p, [child])
      }
    })
  }

  handleFilter (event) {
    const { filters, addFilter } = this.props
    const path = event.target.value.split('.')
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
              const makeStyle = { color: (filters && m in filters && filters[m] !== null) ? 'palevioletred' : 'black' }
              return (
                <div key={m} >
                  <b><button style={makeStyle} onClick={this.handleFilterToggle} value={m}>{m}</button></b>
                  <ul>
                    {filterSchema.model[m].map(md => {
                      const modelStyle = { color: (filters[m] && filters[m].includes(md)) ? 'palevioletred' : 'black' }
                      return (
                        <li key={m+md}><button style={modelStyle} onClick={this.handleFilterToggle} value={`${m}.${md}`}>{md}</button></li>
                      )
                    }
                   )}
                  </ul>
                </div>
              )
            }
            )}
            
            <h6>Price</h6>
            <input placeholder="Min Price" onKeyUp={(evt) => addFilter('minPrice', evt.target.value)} />
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
