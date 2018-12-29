import React from 'react';
import Search from './Search';
import Nav from './Nav';


const Header = () => {
    return (
        <header>
        <h2>Search And Be Amazed!</h2>
        <Search />
        {/*add the nav */}
        <Nav />
        {/*add the logo */}
        </header>        
    )
}

export default Header;