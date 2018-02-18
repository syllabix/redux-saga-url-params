import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

const MainNavigation = ({routes}) => (
    <header className="main-navigation">
        <h1>URL Params Filter Example</h1>
        <nav>
        {routes.map( (route, index) => <NavLink exact to={route.path} key={index}>{route.name}</NavLink>)}
        </nav>
    </header>
)

const mapStateToProps = state => {
    return {
        routes: state.routes
    }
}

export default withRouter(connect(mapStateToProps)(MainNavigation))