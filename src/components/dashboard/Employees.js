import { faList, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Employees() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <div className="cardBox" style={{height: 'fit-content', gridTemplateColumns: 'repeat(2, 1fr)'}}>
        <div className="card">
          <div>
            <Link to='/dashboard/add-employee' style={{textDecoration: 'none'}}><div className="numbers" style={{textAlign: 'center'}}><FontAwesomeIcon icon={faPlus} /> Add Employee </div></Link>
          </div>
        </div>
        <div className="card">
          <div>
            <Link to='/dashboard/list-employees' style={{textDecoration: 'none'}}><div className="numbers" style={{textAlign: 'center'}}><FontAwesomeIcon icon={faList} /> List Employees </div></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Employees
