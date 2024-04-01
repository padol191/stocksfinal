import {Navbar,  Nav } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const CustomNavbar = () => {
    const router = useNavigate()
    const ticker = localStorage.getItem('stock')
    const [activeLink, setActiveLink] = useState('search');
    const handleNavLinkClick = (link, event) => {
      event.preventDefault();
      setActiveLink(link);
      router(link)
    };
    return (
        <Navbar expand="lg" className="fixed-top text-white" style={{ color: 'white !important', backgroundColor: '#00008b' }}>
            <Navbar.Brand className="text-white mr-auto" href="/search/home">Stock Search</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="text-white navbar-nav ml-auto">
                <Nav.Link 
                  className={`text-white ml-auto ${activeLink === 'search' ? 'active' : ''}`}
                  href='/search/home'
                  onClick={(e) => handleNavLinkClick('search', e)}
                >
                    Search
                </Nav.Link>
                <Nav.Link 
                  href="/watchlist"
                  className={`text-white ml-auto ${activeLink === 'watchlist' ? 'active' : ''}`}
                  onClick={(e) => handleNavLinkClick('watchlist', e)}
                >
                  Watchlist
                </Nav.Link>
                <Nav.Link 
                  href="/portfolio"
                  className={`text-white ml-auto ${activeLink === 'portfolio' ? 'active' : ''}`}
                  onClick={(e) => handleNavLinkClick('portfolio', e)}
                >
                  Portfolio
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      );
}

export default CustomNavbar
