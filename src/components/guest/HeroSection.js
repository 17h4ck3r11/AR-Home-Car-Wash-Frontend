import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import heroImg from '../../assets/img/HeroImage.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

function HeroSection() {
    useEffect(() => {
        const image = new Image();
        image.src = heroImg;
    }, [])

    return (
        <div className='heroSection d-flex align-items-center justify-content-between'>
            <img src={heroImg} alt="" style={{ zIndex: '-1' }} />
            <Row style={{ width: "100vw", justifyContent: 'space-between'}}>
                <Col md='6' className='section d-flex flex-column'>
                    <h4 style={{ color: 'white', fontWeight: '600', width: '100%' }}><span style={{ color: 'yellow', fontWeight: '700' }}>#1</span> Remote Car Washing Service in Prayagraj.</h4>
                    <h2>Shine On Demand: <span style={{ color: "yellow" }}>Your Car's Refresh Button</span></h2>
                {/* </Col>
                <Col md='6'> */}
                    <Button variant='warning' ><h4 style={{color:'white'}}>Book an Appointment</h4></Button>
                </Col>
            {/* </Row> */}
            <Col md='2' className='contact'>
                <ul style={{ padding: '5% 0' }}>
                    <a href='mailto:contact.arhomecarwash@gmail.com' rel="noreferrer" target='_blank'><li style={{ padding: '5% 0' }}><FontAwesomeIcon icon={faEnvelope} /> contact.arhomecarwash@gmail.com</li></a>
                    <a href='telephone:9415109484' rel="noreferrer" target='_blank'><li style={{ padding: '5% 0' }}><FontAwesomeIcon icon={faPhone} />+91 94151 09484</li></a>
                    <a rel="noreferrer" href='https://www.google.com/maps/place/Prayag+Railway+Station+Rd,+Karanpur,+Allen+Ganj,+Prayagraj,+Uttar+Pradesh+211002' target='_blank'><li style={{ padding: '5% 0' }}><FontAwesomeIcon icon={faLocationDot} />Near Prayag Station, Prayagraj, Uttar Pradesh, 211002</li></a>
                    <li style={{ padding: '5% 0' }}><FontAwesomeIcon icon={faClock} />Mon - Sun: 24/7</li>
                </ul>
            </Col>
            </Row>
        </div>
    )
}

export default HeroSection
