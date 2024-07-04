import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import styles from './Navbar.module.css';
import logo from '../../../src/Assets/Mask Group 1.jpg';
import trash from '../../../src/Assets/Group 41708.svg';

function Header() {
  return (
    <Navbar expand="lg" className={styles.bgNavbar}>
      <div className='container-fluid'>
        <Navbar.Brand href="#home" className={styles.navbarBrand}><span>Cognizant AIA D<sup>2</sup></span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='me-auto'>
            {/* <Nav.Link href="#myProject" className={`${styles.navLinks} me-3`}>Home</Nav.Link> */}
            
          </Nav>
          
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;