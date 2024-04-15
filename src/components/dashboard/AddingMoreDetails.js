import React, { useState } from 'react'
import '../../users/guest/Form.css'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

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


function AddingMoreDetails(props) {
    const userId = JSON.parse(localStorage.getItem(props.userType))._id
    const [houseNumber, sethouseNumber] = useState('');
    const [area, setarea] = useState('');
    const [landmark, setlandmark] = useState('');
    const [district, setdistrict] = useState('');
    const [pincode, setpincode] = useState('');
    const [file, setfile] = useState(null);

    const [isSubmitting, setisSubmitting] = useState(false);
    const [accountUpdated, setaccountUpdated] = useState(false);

    const navigate = useNavigate();

    const handleImage = (data) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
    
        reader.onloadend = () => {
            setfile(reader.result);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisSubmitting(true);

        let userId = JSON.parse(localStorage.getItem(props.userType))._id;
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "arhomecarwash");
        data.append("cloud_name", "dtqlvrklv");
        let imageResult = await fetch("https://api.cloudinary.com/v1_1/dtqlvrklv/image/upload", {
            method: "post",
            body: data
        })

        imageResult = await imageResult.json();

        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add-more-details/${userId}`, {
            method: 'put',
            body: JSON.stringify({houseNumber: houseNumber, area: area, landmark: landmark, district: district, pincode: pincode, profile: (imageResult.secure_url)}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json();

        if(result._id) {
            setaccountUpdated(true);
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='mainContainer' style={{ width: '50%' }}>
                    <div className='formContainer'>
                        <Form encType='multipart/form-data' onSubmit={handleSubmit}>
                            <h1>ADD MORE DETAILS</h1>

                            <h5 style={{color: 'red', width: '100%', textAlign: 'center'}}>Please fill these details first!</h5>

                            <Form.Group className="mb-3" >
                                <Form.Label>House Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter House Number"
                                    onChange={(e) => sethouseNumber(e.target.value)}
                                    value={houseNumber}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
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
                                    required
                                    onChange={(e) => handleImage(e.target.files[0])}
                                />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                {(isSubmitting) ? "ADDING DETAILS..." : "SUBMIT"}
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>

            <SuccesfulCreation show={accountUpdated} onHide={() => {
                setaccountUpdated(false);
                localStorage.clear();
                navigate(`/login`)
                window.location.reload();
            }} />
        </>

    )
}

export default AddingMoreDetails
