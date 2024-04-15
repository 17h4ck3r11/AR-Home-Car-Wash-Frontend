import React, { useEffect, useState } from 'react'
import '../../users/guest/Form.css'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

function SuccesfulCreation(props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" enforceFocus={false}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    <Row>
                        <Col xs={12} md={12} className='d-flex justify-content-center'>
                            <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704015604/Updated_s1lkpv.gif" alt="" style={{ width: '70%' }} />
                        </Col>
                        <Col xs={12} md={12} className='d-flex justify-content-center'>
                            <h2 style={{textAlign: "center"}}>Your Profile has been Updated!</h2>
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


function Setting(props) {
    const params = useParams();
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [mobile, setmobile] = useState('')
    const [gender, setgender] = useState('')
    const [houseNumber, sethouseNumber] = useState('')
    const [area, setarea] = useState('')
    const [district, setdistrict] = useState('')
    const [landmark, setlandmark] = useState('')
    const [pincode, setpincode] = useState('')
    const [file, setfile] = useState('')
    const [profile, setprofile] = useState('')
    
    const [passwordType, setpasswordType] = useState(true);
    const [isSubmitting, setisSubmitting] = useState(false);
    const [isUpper, setisUpper] = useState(false);
    const [isLower, setisLower] = useState(false);
    const [isSpecial, setisSpecial] = useState(false);
    const [isNumeric, setisNumeric] = useState(false);
    const [isGreater, setisGreater] = useState(false);
    const [accountCreation, setaccountCreation] = useState(false);
    const [accountCreated, setaccountCreated] = useState(false);
    const navigate = useNavigate();

    const handleImage = (data) => {
        if(data) {
            const reader = new FileReader();
            reader.readAsDataURL(data);
        
            reader.onloadend = () => {
                setfile(reader.result);
            }
        }
        else {
            setfile(profile);
        }
    }


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
        setisSubmitting(true);
        var imageUrl = "";

        if(file !== '') {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "arhomecarwash");
            data.append("cloud_name", "dtqlvrklv");
            const imageResult = await fetch("https://api.cloudinary.com/v1_1/dtqlvrklv/image/upload", {
                method: "post",
                body: data
            })

            imageResult = await imageResult.json();
            imageUrl = await imageResult.secure_url;
        }

        if (mobile.length === 10) {
            setaccountCreation(true)
            let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/updateProfile/${params.id}`, {
                method: 'put',
                body: JSON.stringify({ name: name, gender: gender, mobile: mobile, email: email, password: password, houseNumber: houseNumber, area: area, landmark: landmark, profile: (imageUrl.length) ? imageUrl : profile, district: district, pincode: pincode }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            result = await result.json();

            if (result.error) {
                setaccountCreation(false)
                setisSubmitting(false);
            }
            else {
                setisSubmitting(false);
                setaccountCreated(true);
            }
        }
        else {
            setisSubmitting(false);
            setaccountCreation(false);
            let errormsg = document.getElementById('errormsg');
            errormsg.classList.add('active');
        }
    }

    const handlePasswordType = () => {
        setpasswordType(!passwordType);
    }

    useEffect(() => {
        const getData = async () => {
            let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${params.id}`);
            result = await result.json();

            if(result) {
                setname(result.name);
                setgender(result.gender);
                setemail(result.email);
                setmobile(result.mobile);
                setpassword(result.password);
                sethouseNumber(result.houseNumber);
                setarea(result.area);
                setlandmark(result.landmark);
                setdistrict(result.district);
                setpincode(result.pincode);
                setprofile(result.profile);
            }

            handleValidation(result.password)
        }

        getData();
    }, [])

    return (
        <>
        <div className='d-flex justify-content-center align-items-center'>
            <div className='mainContainer' style={{width: '50%'}}>
                <div className='formContainer'>
                    {/* <form onSubmit={handleSubmit}> */}
                   <Form encType='multipart/form-data' onSubmit={handleSubmit}>
                        <h1>EDIT PROFILE</h1>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                onChange={(e) => setname(e.target.value)}
                                value={name}
                                required
                            />
                        </Form.Group>

                        <select value={gender} onChange={(e) => setgender(e.target.value)}>
                            <option disabled>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                            <option value="Unknown">Prefer not to Say</option>
                        </select>
                        
                        <Form.Group className="mb-3" >
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Mobile"
                                onChange={(e) => setmobile(e.target.value)}
                                value={mobile}
                                required
                            />
                        </Form.Group>

                        <span id='errormsg' style={{ textAlign: "left", width: "100%", marginLeft: '0.25vw', marginBottom: "0.5vw", color: "red", fontWeight: "700" }}>Please enter valid Contact number!</span>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Email"
                                onChange={(e) => setemail(e.target.value)}
                                value={email}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type={(passwordType) ? "password" : "text"}
                                placeholder="Enter Password"
                                onChange={(e) => {
                                    setpassword(e.target.value);
                                    handleValidation(e.target.value);
                                }}
                                value={password}
                                required
                            />
                        </Form.Group>

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

                            <Form.Group className="mb-3">
                                <Form.Label>House Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter House Number"
                                    onChange={(e) => sethouseNumber(e.target.value)}
                                    value={houseNumber}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Area</Form.Label>
                                <Form.Control
                                    type="text" 
                                    placeholder="Enter Area Name" 
                                    onChange={(e) => setarea(e.target.value)}
                                    value={area}
                                    required 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Landmark</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Landmark" 
                                    onChange={(e) => setlandmark(e.target.value)}
                                    value={landmark}
                                     
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>District</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter District" 
                                    onChange={(e) => setdistrict(e.target.value)}
                                    value={district}
                                    required 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Pincode" 
                                    onChange={(e) => setpincode(e.target.value)}
                                    value={pincode}
                                    required 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Profile</Form.Label>
                                <Form.Control
                                    accept='image/*'
                                    type="file"
                                    onChange={(e) => handleImage(e.target.files[0])}
                                />

                                <div className="image d-flex justify-content-center">
                                    <img src={(file.length) ? file: profile} alt="" style={{ width: '30%', marginTop: "1.5vw" }} />
                                </div>
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                {(isSubmitting) ? "EDITING DETAILS..." : "SUBMIT"}
                            </Button>
                        </Form>
                    </div>
            </div>
        </div>

        <SuccesfulCreation show={accountCreated} onHide={() => {
            setaccountCreated(false);
            navigate(`/login`);
            localStorage.clear();
            window.location.reload();
        }} />
        </>
    )
}

export default Setting
