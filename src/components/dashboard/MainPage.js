import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function MainPage(props) {
    const [customersData, setCustomersData] = useState([]);
    const [employeesData, setEmployeesData] = useState([]);
    const [monthlyServedCustomers, setMonthlyServedCustomers] = useState(0)
    const [monthlyServedOrders, setMonthlyServedOrders] = useState(0)
    const [orderData, setorderData] = useState([]);
    const userId = JSON.parse(localStorage.getItem(props.userType))._id

    const getMonthlyData = async () => {
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/current-month-data`);
        result = await result.json();
        setMonthlyServedCustomers(result.totalPrice)
        setMonthlyServedOrders(result.monthlyOrders)
    }

    const getMonthlyServedData = async () => {
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/monthly-data/${userId}`);
        result = await result.json();
        setMonthlyServedCustomers(result.monthlyCustomers)
        setMonthlyServedOrders(result.monthlyOrders)
    }

    const getCustomers = async () => {
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customers`);

        result = await result.json();

        if (result) {
            setCustomersData(result);
        }
    }

    const getEmployees = async () => {
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/employees`);

        result = await result.json();

        if (result) {
            setEmployeesData(result);
        }
    }

    const getOrders = async () => {
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`);
        result = await result.json();
        setorderData(result);
    }

    const getCustomersServed = async () => {
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/served-order/${userId}`);

        result = await result.json();
        setorderData(result)
    }

    useEffect(() => {
        if(props.userType === "admin") {
            getOrders();
            getCustomers();
            getEmployees();
            getMonthlyData();
        }
        else {
            getCustomersServed();
            getMonthlyServedData();
        }
    })

    return (
        <>
            {/* ======================= Cards ================== */}
            <div className="cardBox" style={{gridTemplateColumns: (props.userType === "employee") ? "repeat(2, 1fr)" : "repeat(4, 1fr)"}}>
            {
                (props.userType === "employee") ?
                <>
                    <div className="card">
                        <div>
                            <div className="numbers">{monthlyServedOrders}</div>
                            <div className="cardName">Monthly Orders</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="cart-outline" />
                        </div>
                    </div>
                    <div className="card">
                        <div>
                            <div className="numbers">{monthlyServedCustomers}</div>
                            <div className="cardName">Served Customers</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="people-outline" />
                        </div>
                    </div>
                </>
                : 
                <>
                    <div className="card">
                        <div>
                            <div className="numbers">{customersData.length}</div>
                            <div className="cardName">Customers</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="people-outline" />
                        </div>
                    </div>
                    <div className="card">
                        <div>
                            <div className="numbers">{employeesData.length}</div>
                            <div className="cardName">Employees</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="person-outline" />
                        </div>
                    </div>
                    <div className="card">
                        <div>
                            <div className="numbers">{monthlyServedOrders}</div>
                            <div className="cardName">Monthly Orders</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="cart-outline" />
                        </div>
                    </div>
                    <div className="card">
                        <div>
                            <div className="numbers">{`₹${monthlyServedCustomers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                            <div className="cardName">Monthly Income</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="cash-outline" />
                        </div>
                    </div>
                </>

            }

            </div>

            {/* ================ Order Details List ================= */}
            <div className="details" style={{gridTemplateColumns: (props.userType === "employee") ? "none" : "2fr 1fr"}}>
                <div className="recentOrders">
                    <div className="cardHeader">
                        {
                            props.userType === "admin" ?
                                <>
                                    <h2>Recent Orders</h2>
                                    <Link to='/dashboard/orders' className="btn">
                                        View All
                                    </Link>
                                </>
                            :
                                <>
                                    <h2>Recently Completed Orders</h2>
                                </>
                        }
                    </div>
                    <table>
                        <thead>
                                {
                                    props.userType === "admin" ?
                                    <tr>
                                        <td>Customer</td>   
                                        <td>Location</td>
                                        <td>Status</td>
                                    </tr>
                                    : 
                                    <tr>
                                        <td>Customer</td>   
                                        <td>Location</td>
                                    </tr>

                                }
                        </thead>
                        <tbody>
                            {
                                props.userType === "admin" ? orderData && [...orderData].reverse().slice(0, 5).map((order) => {
                                    return (
                                        <tr key={order._id}>
                                            <td>{order.orderBy}</td>
                                            <td>{order.location}</td>
                                            <td>
                                                <span className={`status ${order.status}`}>{order.status}</span>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                orderData && [...orderData].reverse().slice(0, 5).map((order) => {
                                    return (
                                        <tr key={order._id}>
                                            <td>{order.orderBy}</td>
                                            <td>{order.location}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {/* ================= New Customers ================ */}
                {
                    props.userType === "admin" ? 
                        <div className="recentCustomers">
                            <div className="cardHeader">
                                <h2>Recent Customers</h2>
                            </div>
                            <table>
                                <tbody>
                                    {
                                        customersData && [...customersData].reverse().slice(0, 5).map((item) => {
                                            return (
                                                <tr key={item._id}>
                                                    <td width="60px">
                                                        <div className="imgBx">
                                                            <img src={item.profile} alt="" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <h4>
                                                            {item.name} <br /> <span>{`${item.houseNumber}, ${item.area}, ${item.landmark}, ${item.district}, ${item.pincode}`}</span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    : 
                        null
                }
            </div>
        </>
    )
}

export default MainPage
