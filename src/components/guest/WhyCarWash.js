import React from 'react'
import carwash1 from '../../assets/img/carwash1.jpg'
import { Row, Col } from 'react-bootstrap'

function WhyCarWash() {
  return (
    <div className='whyCarWash' id='about'>
        <Row>
            <Col md='6' style={{height: '100%'}}>
                <img src={carwash1} alt="" style={{width: '100%'}} />
            </Col>
            <Col md='6' style={{height: '100%'}}>
                <h1>WHY AR Home CAR WASH?</h1>
                <h5 style={{color: 'black', wordSpacing: '2px', lineHeight: '30px'}}>
                    AR Home Car Wash is the ultimate solution for all your car cleaning needs. With our top-notch services and cutting-edge technology, we strive to provide a seamless and convenient car wash experience like no other.
                </h5>
            </Col>
        </Row>
    </div>
  )
}

export default WhyCarWash
