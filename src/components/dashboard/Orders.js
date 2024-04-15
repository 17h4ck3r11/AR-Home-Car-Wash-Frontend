import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
const moment = require('moment');

function StatusChange(props) {
  return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" enforceFocus={false}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body className="grid-example">
              <Container>
                  <Row>
                      <Col xs={12} md={12} className='d-flex justify-content-center'>
                          <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704188515/Animation_-_1704188345150_firzfq.gif" alt="" style={{ width: '70%' }} />
                      </Col>
                      <Col xs={12} md={12} className='d-flex justify-content-center'>
                          <h2 style={{textAlign: "center"}}>Status has been changed!</h2>
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

function CancelOrder(props) {
  return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" enforceFocus={false}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body className="grid-example">
              <Container>
                  <Row>
                      <Col xs={12} md={12} className='d-flex justify-content-center'>
                          <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1713088608/Animation_-_1713088531450_ohwz2i.gif" alt="" style={{ width: '100%' }} />
                      </Col>
                      <Col xs={12} md={12} className='d-flex justify-content-center'>
                          <h2 style={{textAlign: "center"}}>Your Order has been Canceled!</h2>
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


function Orders(props) {
  const [data, setdata] = useState([]);
  const userId = JSON.parse(localStorage.getItem(props.userType))._id
  const [isSubmitting, setisSubmitting] = useState(false);
  const [statusChange, setStatusChange] = useState(false)
  const [isCanceled, setisCanceled] = useState(false)

  const getdata = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`);
    result = await result.json();
    setdata(result);
  }

  const checkOrdered = (obj) => {
    return (obj.orderById === userId)
  }

  const checkServed = (obj) => {
    return (obj.servingAgentId === userId && obj.status !== "pending" && obj.status !== "canceled" && obj.status !== "completed")
  }

  const handleSearch = async (event)=>{
    let key = event.target.value;
    if(key){
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searchOrder/${key}`);
        result = await result.json()
        if(result) {
            if(props.userType === "customer") {
              let newArr = result.filter(checkOrdered);
              setdata(newArr)
            }
            else if(props.userType === "employee") {
              let newArr = result.filter(checkServed);
              setdata(newArr)
            }
            else {
              setdata(result)
            }
        }
    } else{
        if(props.userType === "admin") {
            getdata();
        }
        else if(props.userType === "customer") {
          getSpecificData();
        }
        else if(props.userType === "employee") {
          getServingOrder()
        }
    }
  }

  const getSpecificData = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user-orders/${userId}`)

    result = await result.json();

    setdata(result)
  }

  const getServingOrder = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/serving-order/${userId}`)
    result = await result.json();
    setdata(result);
  }

  const handleStatusChange = async (id, currentStatus) => {
    let newStatus = "";
    if(currentStatus === "reserved") {
      newStatus = "in-progress";
    }
    else if(currentStatus === "in-progress") {
      newStatus = "completed";
    }
    else {
      newStatus = "canceled";
    }

    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/change-status/${id}`, {
      method: "put",
      body: JSON.stringify({status: newStatus}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    result = await result.json();

    if(result) {
      const button = document.getElementById(`${id}`);
      button.innerHTML = "Update"
      setStatusChange(true)
    }
  }

  const handleCancel = async (id) => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/change-status/${id}`, {
      method: "put",
      body: JSON.stringify({status: "canceled"}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if(result) {
      const button = document.getElementById(`${id}`);
      button.innerHTML = "Cancel"
      setisCanceled(true)
    }
  }


  useEffect(() => {
    if(props.userType === "admin") {
      getdata();
    }
    else if(props.userType === "customer") {
      getSpecificData();
    }
    else {
      getServingOrder();
    }
  }, [])

  return (
    <div className='details' style={{gridTemplateColumns: "none"}}>
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Orders</h2>
          <input type="text" placeholder='Search Order' className='searchField' onChange={handleSearch} />
        </div>
        <table>
          <thead>
            {
              (props.userType === "admin") ?
                <tr>
                  <td>Customer</td>
                  <td>Employee</td>
                  <td>Order Name</td>
                  <td>Price</td>
                  <td>Date</td>
                  <td>Location</td>
                  <td>Status</td>
                </tr>
              : 
              (props.userType === "customer") ?
                <tr>
                  <td>Service Name</td>
                  <td>Price</td>
                  <td>Date</td>
                  <td>Status</td>
                  <td>Cancel</td>
                </tr>
              :
                <tr>
                  <td>Customer Name</td>
                  <td>Mobile</td>
                  <td>Email</td>
                  <td>Service Name</td>
                  <td>Price</td>
                  <td>Location</td>
                  <td>Current Status</td>
                  <td>Change Status</td>
                </tr>
            }
          </thead>
          <tbody>
            {
              (props.userType === "admin") ? 
              data && [...data].reverse().map((order) => {
                return (
                  <tr>
                    <td>{order.orderBy}</td>
                    <td>{order.servingAgent}</td>
                    <td>{`${order.orderName} Washing and Polishing`}</td>
                    <td>₹{order.price}</td>
                    <td>{moment(order.date).format('DD MMMM, YYYY')}</td>
                    <td>{order.location}</td>
                    <td>
                      <span className={`status ${order.status}`}>{order.status}</span>
                    </td>
                  </tr>
                )
              })
              :
              (props.userType === "customer") ?
              data && [...data].reverse().map((order) => {
                return (
                  <tr>
                    <td>{`${order.orderName} Washing and Polishing`}</td>
                    <td>₹{order.price}</td>
                    <td>{moment(order.date).format('DD MMMM, YYYY')}</td>
                    <td>
                      <span className={`status ${order.status}`}>{order.status}</span>
                    </td>
                    {(order.status !== "canceled" && order.status !== "completed") ? 
                      <td><Button
                            variant='danger' 
                            id={order._id}
                            onClick={() => {
                              const button = document.getElementById(`${order._id}`);
                              button.innerHTML = "Cancelling..."
                              handleCancel(order._id);
                            }}
                          >Cancel</Button></td>: null}
                  </tr>
                )
              })
              :
              data && [...data].reverse().map((order) => {
                return (
                  <tr>
                    <td>{order.orderBy}</td>
                    <td>{order.orderByMobile}</td>
                    <td>{order.orderByEmail}</td>
                    <td>{`${order.orderName} Washing and Polishing`}</td>
                    <td>₹{order.price}</td>
                    <td>{order.location}</td>
                    <td>
                      <span className={`status ${order.status}`}>{order.status}</span>
                    </td>
                    <td>
                      <Button 
                        variant='warning'
                        id={order._id}
                        onClick={() => {
                          const button = document.getElementById(`${order._id}`);
                          button.innerHTML = "Updating..."
                          handleStatusChange(order._id, order.status)
                        }}
                      >Update</Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <StatusChange show={statusChange} onHide={() => {
          setStatusChange(false);
          window.location.reload()
      }} />

    <CancelOrder show={isCanceled} onHide={() => {
          setisCanceled(false);
          window.location.reload();
      }} />

    </div>
  )
}

export default Orders
