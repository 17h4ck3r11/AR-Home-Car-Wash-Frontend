import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useNavigate,  } from 'react-router-dom'

function MakingOrder(props) {
  return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" enforceFocus={false}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body className="grid-example">
              <Container>
                  <Row>
                      <Col xs={12} md={12} className='d-flex justify-content-center'>
                          <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704015605/Added_dlh6mc.gif" alt="" style={{ width: '70%' }} />
                      </Col>
                      <Col xs={12} md={12} className='d-flex justify-content-center'>
                          <h2>New Order has been made!</h2>
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


function MakeOrder() {
  const navigate = useNavigate();
  const [orderMade, setorderMade] = useState(false)
  const [serviceName, setServiceName] = useState('Interior + Exterior');
  const [isSubmitting, setisSubmitting] = useState(false);
  const currentUserdata = JSON.parse(localStorage.getItem('customer'));
  const getlocation = `${currentUserdata.houseNumber}, ${currentUserdata.area}, ${currentUserdata.landmark}, ${currentUserdata.district}, ${currentUserdata.pincode}`

  const handleSubmit = async (event) => {
    event.preventDefault();
    setisSubmitting(true)
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/new-order`, {
      method: 'POST',
      body: JSON.stringify({orderById: currentUserdata._id, orderBy: currentUserdata.name, orderByEmail: currentUserdata.email, orderByMobile: currentUserdata.mobile, location: getlocation, status: "pending", orderName: serviceName}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    result = await result.json();
    
    if(result) {
      setisSubmitting(false)
      setorderMade(true)
    }
  }

  return (
    <>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='mainContainer' style={{ width: '50%' }}>
          <div className='formContainer'>
            <Form onSubmit={handleSubmit}>
              <h1>MAKE ORDER</h1>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={currentUserdata.name} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" value={getlocation} disabled />
              </Form.Group>
              
              <Form.Group className='mb-3'>
                <Form.Label>Service Name</Form.Label>
                <Form.Select onChange={(e) => setServiceName(e.target.value)}  required>
                  <option disabled>Select Service </option>
                  <option value="Interior + Exterior">Interior + Exterior Washing and Polishing</option>
                  <option value="Exterior">Exterior Washing and Polishing</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit">
                {(isSubmitting) ? "Making Order..." : "Submit"}
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <MakingOrder show={orderMade} onHide={() => {
          setorderMade(false);
          navigate('/dashboard/orders')
      }} />
    </>
  )
}

export default MakeOrder
