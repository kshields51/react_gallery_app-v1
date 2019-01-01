import React from 'react';
import {Link} from 'react-router-dom';
{/* This component contains the three navigation buttons that link to routes that render the three preloaded api call's data */}
const Nav = () => {
    return(
        <nav className="main-nav">
            <ul>
                <li><Link to='/button1/dogs'>Dogs</Link></li> {/*upon click the dogs route is rendered */}
                <li><Link to='/button2/cats'>Cats</Link></li> {/*upon click the cats route is rendered */}
                <li><Link to='/button3/computers'>Computers</Link></li> {/*upon click the computers route is rendered */}
            </ul>
        </nav>
    )
}

export default Nav;