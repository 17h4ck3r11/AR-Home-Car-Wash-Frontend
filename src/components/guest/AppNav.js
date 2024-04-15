import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/img/ARLogo.jpg'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function AppNav(props) {

    const isMoreDetailFilled = () => {
      if(props.userType && (JSON.parse(localStorage.getItem(props.userType)).houseNumber) === "") {
        return true;
      }
    }

    return (
        <Navbar expand="lg" className="bg-body" style={{padding: '0'}}>
            <Container fluid style={{padding: '0.5vw 2vw'}}>
                <Link to='/' >
                    <img src={logo} alt="" style={{height: '100%'}} />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='custom-toggler' style={{borderColor: 'white'}} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="" style={{width: '100%', display: 'flex', justifyContent: "flex-end", gap: '35px', alignItems: 'center'}}>
                        <HashLink to='/#about'>About</HashLink>
                        <HashLink to='/#services'>Services</HashLink>
                        <HashLink to='/#pricing'>Pricings</HashLink>
                        <HashLink to='/#testimonials'>Testimonials</HashLink>
                        <Link to={(!props.userType) ? '/register' : (isMoreDetailFilled()) ? '/dashboard/add-more-details' : `/dashboard/${props.userType}`} style={{padding:'0'}}><Button variant='warning' style={{margin:'0!important'}}><h5 style={{color:'white', fontWeight: '700'}}>{(!props.userType || props.userType === "customer") ? "Book Now!" : "Dashboard"}</h5></Button></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNav
