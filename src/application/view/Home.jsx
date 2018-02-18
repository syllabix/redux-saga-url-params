import React from 'react';
import { connect } from 'react-redux';

const Home = () => (
    <div className="home-page">
        <h1>Search Filters Example:</h1>
        <h4>Filter state derived from URL params</h4>
    </div>
)

export default connect()(Home)