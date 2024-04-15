import React, { useState } from 'react'
import './Form.css'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNav from '../../components/guest/AppNav';
import AppFooter from '../../components/guest/AppFooter';

function LoadingModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={12} className='d-flex justify-content-center'>
              <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704492294/ezgif.com-optimize_vgcryk.gif" alt="" style={{ width: '50%' }} />
            </Col>
            <Col xs={12} md={12}>
              <h2 style={{ textAlign: "center" }}>Searching User...</h2>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

function SuccesModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={12} className='d-flex justify-content-center'>
              <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704188515/Animation_-_1704188345150_firzfq.gif" alt="" style={{ width: '50%' }} />
            </Col>
            <Col xs={12} md={12}>
              <h2 style={{ textAlign: "center" }}>New password has been generated and sent to your Email!</h2>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function UserNotExist(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={12} className='d-flex justify-content-center'>
              <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1711966124/Animation_-_1711965996131_g67uws.gif" alt="" style={{ width: '50%' }} />
            </Col>
            <Col xs={12} md={12}>
              <h2 style={{ textAlign: "center" }}>No User Found!</h2>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ForgotPassword() {
  const [email, setemail] = useState('');
  const [ModalShow, setModalShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [NotExist, setNotExist] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    result = await result.json();

    if (result) {
      setLoading(false);
      setModalShow(true);
    }
    else {
      setLoading(false);
      setNotExist(true);
    }
  }

  return (
    <>
      <AppNav />
      <div className='d-flex justify-content-center align-items-center forgotPassword' style={{ width: '100vw', height: '60vh' }}>
        <div className='mainContainer'>
          <div className='formContainer'>
            <form onSubmit={handleSubmit}>
              <h1>Forgot Password</h1>
              <input type="email" placeholder='Enter the registered Email'
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <button type='submit'>Generate New Password</button>
            </form>
          </div>
        </div>
      </div>
      <LoadingModal show={Loading} />
      <SuccesModal show={ModalShow} onHide={() => {
        setModalShow(false);
        navigate('/login');
      }} />
      <UserNotExist show={NotExist} onHide={() => {
        setNotExist(false);
        navigate('/register');
      }} />
      <AppFooter />
    </>
  )
}

export default ForgotPassword
