import React from 'react'
import video from '../../assets/img/video.mp4'
import { Row, Col } from 'react-bootstrap'
import { Zoom } from 'react-awesome-reveal';

function HappyClients() {
    function animate(obj, initVal, lastVal, duration) {
        let startTime = null;

        const step = (currentTime) => {
            if (!startTime) {
                startTime = currentTime;
            }

            const progress = Math.min((currentTime - startTime) / duration, 1);
            obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                window.cancelAnimationFrame(window.requestAnimationFrame(step));
            }
        };
        window.requestAnimationFrame(step);
    }

    let mouseOver = () => {
        let text1 = document.getElementById("animate-students-count");
        let text2 = document.getElementById("animate-placements-count");
        let text3 = document.getElementById("animate-faculties-count");

        animate(text1, 0, 50, 1000);
        animate(text2, 0, 10, 1000);
        animate(text3, 0, 5, 1000);
    }

    return (
        <Zoom direction='in' triggerOnce>
        <div className='happyClients' onMouseEnter={mouseOver}>
            <video autoPlay muted loop id="myVideo" >
                <source src={video} type="video/mp4" />
            </video>
            <Row className="d-flex justify-content-between align-items-center my-5 counter">
                <Col md="3" style={{ textAlign: "center" }}>
                    <h1 style={{ paddingLeft: "5%", color: "white", marginTop: "1.1em" }}>
                        <span id="animate-students-count">50</span>+
                    </h1>
                    <p style={{ fontSize: "1.3em" }}>HAPPY CLIENTS</p>
                </Col>
                <Col md="3" style={{ textAlign: "center" }}>
                    <h1 style={{ paddingLeft: "5%", color: "white", marginTop: "1.1em" }}>
                        {" "}
                        <span id="animate-placements-count">10</span>+
                    </h1>
                    <p style={{ fontSize: "1.3em" }}>EXPERIENCED WORKERS</p>
                </Col>
                <Col md="3" style={{ textAlign: "center" }}>
                    <h1 style={{ color: "white", marginTop: "1.1em" }}>
                        <span id="animate-faculties-count">5</span>+
                    </h1>
                    <p style={{ fontSize: "1.3em" }}>YEARS OF EXPERIENCE</p>
                </Col>
            </Row>
        </div>
        </Zoom>
    )
}

export default HappyClients
