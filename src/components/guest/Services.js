import React from 'react'
import { Col, Row } from 'react-bootstrap'
import interior from '../../assets/img/interior.jpg'
import exterior from '../../assets/img/exterior.jpg'

function Services() {
    const scroll = () => {
        const staticSection = document.querySelector('.static');
        const scrollingSection = document.querySelector('.scrolling');

        document.addEventListener('wheel', (e) => {
            e.preventDefault();
            scrollingSection.scrollTop += e.deltaY;
        });

        scrollingSection.addEventListener('scroll', () => {
            staticSection.scrollTop = scrollingSection.scrollTop;
        });

        window.addEventListener('resize', () => {
            staticSection.style.height = `${window.innerHeight}px`;
            scrollingSection.style.height = `${window.innerHeight}px`;
        });
    }

    const disableScroll = () => {
        const scrollingSection = document.querySelector('.scrolling');
        
        document.removeEventListener('wheel', () => {

        })

        scrollingSection.removeEventListener('scroll', () => {

        })

        window.removeEventListener('resize', () => {

        })
    }

    return (
            <Row className='services' onMouseEnter={scroll} onMouseLeave={disableScroll} id='services' >
                <Col md='5' className='sidebar static' style={{ height: '100%' }}>
                    <h1>SERVICES WE OFFER!</h1>
                    <h5 style={{ textAlign: 'justify' }}>
                        Get ready to elevate your driving experience with AR Home Car Wash! Our expert team is dedicated to reviving the allure of your vehicle, inside and out. From meticulously cleaning every nook and cranny to restoring that showroom shine, we're here to make your car gleam with pride. Discover the ultimate in automotive pampering and let AR Home Car Wash transform your ride into a radiant masterpiece on the road!
                    </h5>
                </Col>

                <Col md='7' className='scrolling' style={{ scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', height: '100vh' }}>
                    <div>
                        <Row className='service'>
                            <Col md='6' className='image'>
                                <img src={interior} alt="interior" />
                            </Col>
                            <Col md='6'>
                                <h3>INTERIOR WASHING</h3>
                                <h5>
                                    Experience the ultimate in interior car care with AR Home Car Wash! Our skilled team is committed to rejuvenating every inch of your vehicle's interior, leaving it spotless, fresh, and inviting. From thorough vacuuming and stain removal to meticulous detailing of surfaces, we'll ensure your car's interior shines as brilliantly as its exterior. Treat yourself and your vehicle to the luxury it deserves with AR home Car Wash – where cleanliness meets comfort, every time you drive.
                                </h5>
                                <br />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row className='service' style={{ scrollBehavior: 'smooth' }}>
                            <Col md='6' className='image'>
                                <img src={exterior} alt="interior" />
                            </Col>
                            <Col md='6'>
                                <h3>EXTERIOR WASHING</h3>
                                <h5>
                                    Elevate your driving experience with AR Home Car Wash! Our dedicated team specializes in restoring the beauty of your vehicle's exterior to its pristine glory. From precision washing and waxing to meticulous attention to detail, we're here to ensure your car sparkles and shines on every journey. Discover the art of automotive perfection with AR Home Car Wash – where every wash is a celebration of your vehicle's stunning exterior.
                                </h5>
                                <br />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
    )
}

export default Services
