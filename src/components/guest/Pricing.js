import React from 'react'
import Cards from './Cards'
import { Button, Col, Row } from 'react-bootstrap'
import interior from '../../assets/img/Interior.png'
import exterior from '../../assets/img/Exterior.png'
import transparentInterior from '../../assets/img/InteriorTransparent.png'
import transparentExterior from '../../assets/img/ExteriorTransparent.png'
import { Bounce, Slide } from 'react-awesome-reveal'

function Pricing() {
    let obj = [
        {
            id: 1,
            frontImage: interior,
            transparentImage: transparentInterior
        },
        {
            id: 2,
            frontImage: exterior,
            transparentImage: transparentExterior
        }
    ]
    return (
        <>
            <Slide direction='left' triggerOnce>
            <div className='pricing d-flex align-items-center justify-content-between' id='pricing'>
                <Row style={{ width: '100%' }}>
                    <Col md='4'>
                        <h1>PRICINGS</h1>
                        <h5 style={{ textAlign: 'justify' }}>
                            Transform your car inside and out with our expert car washing service. From spotless exteriors to pristine interiors, we use eco-friendly products and top-notch techniques to leave your vehicle looking brand new. Drive with confidence and style after experiencing our comprehensive care.
                        </h5>
                        <Button variant='warning'><h5 style={{ color: 'white' }}>Book Now!</h5></Button>
                    </Col>

                    <Col md='8' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {
                            obj.map((items) => {
                                return <Cards {...items} key={items.id}/>
                            })
                        }
                    </Col>
                </Row>
            </div>
            </Slide>
            <Bounce direction='in'>
            <h1 className='discount'>Get extra <span >15% OFF</span> on your first booking!</h1>
            </Bounce>
        </>
    )
}

export default Pricing
