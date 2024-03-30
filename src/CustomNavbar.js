import {Navbar,  Nav } from 'react-bootstrap';
const CustomNavbar = () => {
    const ticker = localStorage.getItem('stock')
    return (
        <Navbar expand="lg" className="text-white" style={{ color: 'white !important', backgroundColor: '#00008b' }}>
            <Navbar.Brand className="text-white mr-auto" href="/search/home">Stock Search</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="text-white navbar-nav ml-auto">
                <Nav.Link className="text-white ml-auto" href='/search/'>Search</Nav.Link>
                <Nav.Link className="text-white ml-auto" href="/watchlist">Watchlist</Nav.Link>
                <Nav.Link className="text-white ml-auto" href="/portfolio">Portfolio</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      );
}

export default CustomNavbar
