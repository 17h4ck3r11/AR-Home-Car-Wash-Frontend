import React, { useState } from 'react'
import './Form.css'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import AppNav from '../../components/guest/AppNav'
import AppFooter from '../../components/guest/AppFooter'


function SuccesfulCreation(props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" enforceFocus={false}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    <Row>
                        <Col xs={12} md={12} className='d-flex justify-content-center'>
                            <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1712081582/Animation_-_1712081358354_yfj1ox.gif" alt="" style={{ width: '100%' }} />
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


function MydModalWithPasswordValidation(props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" enforceFocus={false}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    <Row>
                        <Col xs={12} md={12} className='d-flex justify-content-center'>
                            <h4>Password must follow listed rules:</h4>
                        </Col>
                        <Col xs={12} md={12}>
                            <ul>
                                <li>It must contain 8 or more characters.</li>
                                <li>It must be alphanumeric.</li>
                                <li>It must contain an special symbol.</li>
                                <li>It must contain a UPPERCASE.</li>
                                <li>It must contain a lowercase.</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='warning' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


function Register() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [mobile, setmobile] = useState('')
    const [gender, setgender] = useState('Male')
    const [isEmailExist, setisEmailExist] = useState(false)
    const [isMobileExist, setisMobileExist] = useState(false)
    const [passwordType, setpasswordType] = useState(true)
    const [isUpper, setisUpper] = useState(false);
    const [isLower, setisLower] = useState(false);
    const [isSpecial, setisSpecial] = useState(false);
    const [isNumeric, setisNumeric] = useState(false);
    const [isGreater, setisGreater] = useState(false);
    const [accountCreation, setaccountCreation] = useState(false);
    const [validation, setvalidation] = useState(false);
    const [accountCreated, setaccountCreated] = useState(false);
    const navigate = useNavigate();

    const handleValidation = (value) => {
        const lower = new RegExp('(?=.*[a-z])');
        const upper = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const special = new RegExp('(?=.*[!@#%&])');
        const length = new RegExp('(?=.{8,})')

        if (lower.test(value)) {
            setisLower(true);
        }
        else {
            setisLower(false);
        }
        if (upper.test(value)) {
            setisUpper(true)
        }
        else {
            setisUpper(false);
        }
        if (number.test(value)) {
            setisNumeric(true)
        }
        else {
            setisNumeric(false);
        }
        if (special.test(value)) {
            setisSpecial(true)
        }
        else {
            setisSpecial(false);
        }
        if (length.test(value)) {
            setisGreater(true)
        }
        else {
            setisGreater(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mobile.length === 10) {
            setaccountCreation(true)
            let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                method: 'post',
                body: JSON.stringify({ name: name, gender: gender, mobile: mobile, email: email, password: password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            result = await result.json();

            if (result.errorAt) {
                setaccountCreation(false);
                if (result.errorAt.email) {
                    setisEmailExist(true)
                }
                else if (result.errorAt.mobile) {
                    setisMobileExist(true)
                }
            }
            else if (result.error) {
                setaccountCreation(false)
                setvalidation(true)
            }
            else {
                setaccountCreated(true);
                localStorage.setItem("customer", JSON.stringify(result.result))
                localStorage.setItem("token", JSON.stringify(result.auth))
            }
        }
        else {
            setaccountCreation(false);
            let errormsg = document.getElementById('errormsg');
            errormsg.classList.add('active');
        }
    }

    const handlePasswordType = () => {
        setpasswordType(!passwordType);
    }

    return (
        <>  
            <AppNav />
            <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '150vh' }}>
                <div className='mainContainer'>
                    <div className='formContainer'>
                        <form onSubmit={handleSubmit}>
                            <h1>SIGN UP</h1>
                            <input type="text" placeholder='Name' value={name}
                                onChange={(e) => {
                                    setname(e.target.value);
                                }}
                            />
                            <select value={gender} onChange={(e) => setgender(e.target.value)}>
                                <option disabled>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Transgender">Transgender</option>
                                <option value="Unknown">Prefer not to Say</option>
                            </select>
                            <input type="text" placeholder='Mobile' value={mobile}
                                onChange={(e) => {
                                    setmobile(e.target.value);
                                    setisMobileExist(false)
                                }}
                            />
                            <span id='existingError' style={{ textAlign: "left", width: "100%", marginLeft: '0.25vw', marginBottom: "0.5vw", color: "red", fontWeight: "700", display: (isMobileExist) ? "block" : "none" }}> Contact number already registered! </span>
                            <span id='errormsg' style={{ textAlign: "left", width: "100%", marginLeft: '0.25vw', marginBottom: "0.5vw", color: "red", fontWeight: "700" }}>Please enter valid Contact number!</span>

                            <input type="email" placeholder='Email' value={email}
                                onChange={(e) => {
                                    setemail((e.target.value).toLowerCase());
                                    setisEmailExist(false);
                                }}
                            />
                            <span id='existingError' style={{ textAlign: "left", width: "100%", marginLeft: '0.25vw', marginBottom: "0.5vw", color: "red", fontWeight: "700", display: (isEmailExist) ? "block" : "none" }}> Email Address already registered! </span>

                            <input type={(passwordType) ? "password" : "text"} placeholder='Password' value={password}
                                onChange={(e) => {
                                    setpassword(e.target.value);
                                    handleValidation(e.target.value);
                                }}
                            />

                            <div className='passwordValidation' style={{ width: '100%' }}>
                                <ul>
                                    <li style={{ color: (isGreater) ? '#4bb543' : 'red' }}><FontAwesomeIcon icon={(isGreater) ? faCheck : faXmark} style={{ marginRight: '0.5vw' }} /> 8 or more characters!</li>
                                    <li style={{ color: (isUpper) ? '#4bb543' : 'red' }}><FontAwesomeIcon icon={(isUpper) ? faCheck : faXmark} style={{ marginRight: '0.5vw' }} /> At least 1 Uppercase!</li>
                                    <li style={{ color: (isLower) ? '#4bb543' : 'red' }}><FontAwesomeIcon icon={(isLower) ? faCheck : faXmark} style={{ marginRight: '0.5vw' }} /> At least 1 Lowercase!</li>
                                    <li style={{ color: (isSpecial) ? '#4bb543' : 'red' }}><FontAwesomeIcon icon={(isSpecial) ? faCheck : faXmark} style={{ marginRight: '0.5vw' }} /> At least 1 Special character!</li>
                                    <li style={{ color: (isNumeric) ? '#4bb543' : 'red' }}><FontAwesomeIcon icon={(isNumeric) ? faCheck : faXmark} style={{ marginRight: '0.5vw' }} /> At least 1 Numeric value!</li>
                                </ul>
                            </div>

                            <Form.Check type="switch" id="custom-switch" label="Show Password" onChange={handlePasswordType} />

                            <Link to='/login'>Already a Valuable Customer ?</Link>
                            <button type='submit' onClick={() => setaccountCreation(true)}>{(accountCreation) ? "CREATING ACCOUNT..." : "SIGN UP"}</button>
                        </form>
                    </div>
                </div>
            </div>

            <MydModalWithPasswordValidation show={validation} onHide={() => {
                setvalidation(false);
            }} />

            <SuccesfulCreation show={accountCreated} onHide={() => {
                setaccountCreated(false);
                navigate('/dashboard/add-more-details');
                window.location.reload();
            }} />
            <AppFooter />
        </>

    )
}

export default Register
