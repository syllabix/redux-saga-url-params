import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

// const Page = ({views = {}, viewId = ''}) => {
//     const View = views[viewId]
//     return <div className="page-wrapper"><View /></div>
// }

class Page extends React.Component {

    render() {
        console.log('page render')
        const { views, viewId} = this.props;
        const View = views[viewId]
        return <div className="page-wrapper"><View /></div>
    }
}

const Navigator = ({routes = [], views = {}, pathname = ''}) => (
    <Switch>
    { routes.map( (route, index) => (
        <Route key={index} exact path={route.path}>
            <Page views={views} viewId={route.component} path={route.path} curPath={pathname} />
        </Route>
    ))}
    </Switch>
)

const mapStateToProps = (state, ownProps) => {
    return {
        routes: state.routes,
        views: ownProps.views,
        pathname: ownProps.location.pathname
    }
}

export default withRouter(connect(mapStateToProps)(Navigator))
