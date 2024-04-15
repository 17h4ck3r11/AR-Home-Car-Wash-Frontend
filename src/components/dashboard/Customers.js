import React, { useEffect, useState } from 'react'
import { Button, Modal, Col, Row, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function MydModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={12} className='d-flex justify-content-center'>
              <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704015604/Deleted_sg8kea.gif" alt="" style={{width: '50%'}} />
            </Col>
            <Col xs={12} md={12}>
              <h2 style={{textAlign:"center"}}>Customer has been Deleted!</h2>
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

function Customers() {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const handleSearch = async (event)=>{
    let key = event.target.value;
    if(key){
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search/${key}`);
        result = await result.json()
        if(result) {
            setdata(result)
        }
    } else{
        getData();
    }
  }

  const getData = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customers`,{
      headers:{
          authorization:JSON.parse(localStorage.getItem('token'))
      }
    });

    result = await result.json();
    
    if(result) {
      setdata(result);
    }
  }

  const changeStatus = async (id, status) => {
    let result = await fetch (`${process.env.REACT_APP_BACKEND_URL}/changeStatus/${id}`, {
      method: "PUT",
      body: JSON.stringify({blocked:status}),
      headers: {
          "Content-Type": "application/json"
      }
    });
  }

  const deleteCustomer = async (id) => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/${id}`, {
      method: 'delete'
    })

    result = await result.json();
    if(result.deletedCount) {
      const button = document.getElementById(`${id}`)
      button.innerHTML = "Delete"
      setModalShow(true)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='details' style={{gridTemplateColumns: "none"}}>
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Customers</h2>
          <input type="text" placeholder='Search Customer' className='searchField' onChange={handleSearch}/>
        </div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Mobile</td>
              <td>Email</td>
              <td>Update</td>
              <td>Block</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {
              // console.log(data)
              (data.length) ? 
                data.slice(0).reverse().map((item, index) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.mobile}</td>
                      <td>{item.email}</td>
                      <td><Button variant="success" onClick={() => navigate(`/dashboard/edit-profile/${item._id}`)}>Edit</Button></td>
                      <td><Button variant="warning" onClick={() => {
                        changeStatus(item._id, !item.blocked);
                        window.location.reload();
                        getData();
                      }}>{(item.blocked)?"Blocked":"UnBlocked"}</Button></td>
                      <td><Button 
                            variant="danger" 
                            id={item._id}
                            onClick={() => {
                              const button = document.getElementById(`${item._id}`)
                              button.innerHTML = "Deleting..."
                              deleteCustomer(item._id)
                            }}
                          >Delete</Button></td>
                    </tr>
                  )
                }
              ): <h4> No Data Exist! </h4>
            }
          </tbody>
        </table>
      </div>
      <MydModalWithGrid show={modalShow} onHide={() => {
        setModalShow(false)
        getData();
      }} />
    </div>
  )
}

export default Customers
