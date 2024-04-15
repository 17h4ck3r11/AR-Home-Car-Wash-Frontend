import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';

function ReserveOrder(props) {
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
                          <h2 style={{textAlign:'center'}}>You have Reserved New Order!</h2>
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


function ReserveNewOrder() {
    const [data, setdata] = useState([]);
    const [isReserving, setisReserving] = useState(false);
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('employee'))._id;

    const handleReserve = async (id) => {
      let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reserve-order/${id}`, {
        method: "PUT",
        body: JSON.stringify({servingAgentId: userId}),
        headers: {
          "Content-Type": "application/json"
        }
      })

      result = await result.json();  
      
      if(result) {
        const button = document.getElementById(`${id}`)
        button.innerHTML = "Reserve";
        setisReserving(true)
      }
    }

    const getPendingOrders = async () => {
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/pending-orders`);
        result = await result.json()
    
        setdata(result);
    }

    useEffect(() => {
      getPendingOrders();
    }, [])

    const handleSearch = async (event)=>{
      let key = event.target.value;
      if(key){
          let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searchOrder/${key}`);
          result = await result.json()
          if(result) {
              setdata(result)
          }
      } 
      else{
          getPendingOrders();
      }
    }

  return (
    <div className='details' style={{gridTemplateColumns: "none"}}>
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Reserve Order</h2>
          <input type="text" placeholder='Search Order' className='searchField' onChange={handleSearch} />
        </div>
        <table>
          <thead>
            <tr>
              <td>Customer</td>
              <td>Order Name</td>
              <td>Mobile</td>
              <td>Date</td>
              <td>Location</td>
              <td>Reserve</td>
            </tr>
          </thead>
          <tbody>
            {
              (data.length) ? [...data].reverse().map((order) => {
                return (
                  <tr>
                    <td>{order.orderBy}</td>
                    <td>{order.orderName}</td>
                    <td>{order.orderByMobile}</td>
                    <td>{order.date}</td>
                    <td>{order.location}</td>
                    <td>
                      <Button 
                        variant='warning' 
                        id={order._id}
                        onClick={() => {
                          const button = document.getElementById(`${order._id}`)
                          button.innerHTML = "Reserving..."
                          handleReserve(order._id)
                        }}
                      >Reserve</Button>
                    </td>
                  </tr>
                )
              }) :
              <h4>No Order To Reserve</h4>
            }
          </tbody>
        </table>
      </div>

      <ReserveOrder show={isReserving} onHide={() => {
          setisReserving(false);
          navigate('/dashboard/orders')
      }} />
    </div>
  )
}

export default ReserveNewOrder
