import React, { useState } from 'react'
import './Form.css'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AppFooter from '../../components/guest/AppFooter';
import AppNav from '../../components/guest/AppNav';

function MydModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={12} className='d-flex justify-content-center'>
              <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704012173/authenticated_vm9ota.gif" alt="" style={{width: '50%'}} />
            </Col>
            <Col xs={12} md={12}>
              <h2 style={{textAlign:"center"}}>AUTHENTICATED!</h2>
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

function BlockedModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={12} className='d-flex justify-content-center'>
              <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1706957426/Animation_-_1706957288235_ftf8sx.gif" alt="" style={{ width: '50%' }} />
            </Col>
            <Col xs={12} md={12}>
              <h2 style={{ textAlign: "center" }}>You have been BLOCKED by Admin!</h2>
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

function Login() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('')
  const [modalShow, setModalShow] = useState(false);
  const [passwordType, setpasswordType] = useState(true)
  const [blocked, setBlocked] = useState(false);
  const [isAuthenticating, setisAuthenticating] = useState(false);
  const [fillDetail, setFillDetail] = useState(false)
  const navigate = useNavigate();

  const handlePasswordType = () => {
    setpasswordType(!passwordType)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisAuthenticating(true);

    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    result = await result.json();

    if(result) {
      if (result.user.blocked) {
        setBlocked(true);
      }
      else if (result.auth && result.user.role === "customer") {
        setModalShow(true)
        if(result.user.houseNumber === "") {
            setFillDetail(true)
        }
        localStorage.setItem('customer', JSON.stringify(result.user));
        localStorage.setItem('token', JSON.stringify(result.auth));
      }

      else if (result.auth && result.user.role === "employee") {
        setModalShow(true)
        localStorage.setItem('employee', JSON.stringify(result.user));
        localStorage.setItem('token', JSON.stringify(result.auth));
      }

      else if (result.auth && result.user.role === "admin") {
        setModalShow(true);
        setisAuthenticating(false);
        localStorage.setItem('admin', JSON.stringify(result.user));
        localStorage.setItem('token', JSON.stringify(result.auth));
      }
    }
    else {
      let loginerr = document.getElementById('loginerror');
      loginerr.classList.add('active')
    }
    setisAuthenticating(false)
  }

  return (
    <>
      <AppNav />
      <div className='d-flex justify-content-center align-items-center forgotPassword' style={{ width: '100vw', height: '60vh' }}>
        <div className='mainContainer'>
          <div className='formContainer'>
            <form onSubmit={handleSubmit}>
              <h1>SIGN IN</h1>
              <span id='loginerror' style={{textAlign:"center", width: "100%", marginLeft: '0.25vw', marginTop: "0.5vw", color: "red", fontWeight: "700"}}>Please enter correct login details!</span>
              <input type="email" placeholder='Email' value={email}
                onChange={(e) => {
                  setemail((e.target.value).toLowerCase());
                  const loginerr = document.getElementById('loginerror');
                  loginerr.classList.remove('active');
                }}
              />
              <input type={(passwordType) ? "password" : "text"} placeholder='Password' value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                  const loginerr = document.getElementById('loginerror');
                  loginerr.classList.remove('active');
                }}
              />

              <Form.Check type="switch" id="custom-switch" label="Show Password" onChange={handlePasswordType} />
              <div className='d-flex'>
                <Link to='/forgot-password'>Forgot Password </Link>
                <Link to='/register'>New here ?</Link>
              </div>
              <button type='submit'>{(isAuthenticating) ? "Authenticating..." : "SIGN IN"}</button>
            </form>
          </div>
        </div>
      </div>

      <MydModalWithGrid show={modalShow} onHide={() => {
        setModalShow(false);
        if(fillDetail) {
          navigate('/dashboard/add-more-details');
          window.location.reload();
        }
        else {
          navigate('/');
          window.location.reload(); 
        }
      }} />

      <BlockedModal show={blocked} onHide={()=>{
          setBlocked(false);
      }} />
      <AppFooter />
    </>

  )
}

export default Login
