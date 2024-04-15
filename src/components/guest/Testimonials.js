import React from 'react'
import { Carousel, Col, Row } from 'react-bootstrap'
import testimonials1 from '../../assets/img/Testimonials1.webp'
import testimonials2 from '../../assets/img/Testimonials2.jpg'
import { Slide } from 'react-awesome-reveal'

const testimonials = [
    {
        id: 1,
        image: testimonials1,
        name: "Tushar Jaiswal",
        rating: 5,
        feedback: "AR Home Car Wash provided an outstanding service that exceeded my expectations. From scheduling to execution, everything was seamless. Their team arrived promptly, delivering a meticulous interior and exterior cleaning right at my doorstep. The attention to detail was impeccable, leaving my car looking showroom-ready. The convenience of their at-home service is unbeatable. Five stars without a doubt!"
    },
    {
        id: 2,
        image: testimonials2,
        name: "Ashish Ranjan",
        rating: 5,
        feedback: "AR Home Car Wash truly impressed me with their exceptional service. Not only did they transform my car inside and out with meticulous attention to detail, but they also did it all from the convenience of my own home. Their professionalism and expertise are unmatched, making them my go-to choice for car cleaning. AR Home Car Wash deserves every bit of its five-star rating!"
    }
]

function Testimonials() {
    const getRating = (rating) => {
        let Ratings = [];
        for (let i = 0; i < rating; i++) {
            Ratings.push(<i className="fa-solid fa-star" style={{ color: 'yellow' }}></i>);
        }

        for (let i = 0; i < 5 - rating; i++) {
            Ratings.push(<i className="fa-solid fa-star" style={{ color: 'grey' }}></i>);
        }

        return Ratings
    }

    return (
        <Slide direction='left' triggerOnce>
            <div className='testimonials' id='testimonials'>
                <h1>TESTIMONIALS</h1>
                <Carousel>
                    {
                        testimonials.map((item) => {
                            return (
                                <Carousel.Item>
                                    <Row style={{ width: '100%', justifyContent: 'space-between' }}>
                                        <Col md='4'>
                                            <div className='userImage'>
                                                <img src={item.image} alt='userImage' />
                                            </div>
                                        </Col>
                                        <Col md='7'>
                                            <Row>
                                                <h3>{item.name}</h3>
                                            </Row>
                                            <Row>
                                                <div className='rating'>
                                                    {
                                                        getRating(item.rating).map((rating) => {
                                                            return rating
                                                        })
                                                    }
                                                </div>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <h5>{item.feedback}</h5>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            </div>
        </Slide>
    )
}

export default Testimonials
