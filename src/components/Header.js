import React from 'react';
import Search from './Search'
import {withRouter} from 'react-router-dom';
{/* This component renders the header which contains the title and search bar */}

const Header = (props) => {
    return (
        <header>
        <h2>Search And Be Amazed!</h2>
        <Search search={props.search} history={props.history}/> {/* gives the search prop which is passed from app and refers to the performSearch Method and the history prop which will allow the search term to be appended to the url */}
        </header>        
    )
}

export default withRouter(Header);