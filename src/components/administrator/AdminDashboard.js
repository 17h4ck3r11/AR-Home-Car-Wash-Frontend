import React, { useEffect } from 'react'
import '../Dashboard.css'
import logo from '../../assets/img/ARLogo.jpg'
import { Outlet } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

function AdminDashboard(props) {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem(props.userType))
    var userId = "";
    var image1 = ""
    var houseNumber = "";

    if (user) {
        userId = user._id
        image1 = user.profile
        houseNumber = user.houseNumber;
    }

    const checkToFillMoreDetails = () => {
        if (houseNumber === "") {
            return true;
        }
    }

    useEffect(() => {
        checkToFillMoreDetails();
    })

    return (
        <div className="Container">
            <div className="navigation">
                <ul>
                    <li style={{ cursor: 'pointer!important' }} onClick={() => navigate('/')}>
                        <img src={logo} alt="Logo" style={{ width: '150px', marginTop: '2vw' }} />
                    </li>
                    <li>
                        <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : `/dashboard/${props.userType}`}>
                            {
                                (props.userType === "customer") ?
                                    <>
                                        <span className='icon'>
                                            <ion-icon name="add-circle-outline"></ion-icon>
                                        </span>
                                        <span className='title'>New Order</span>
                                    </>
                                    :
                                    <>
                                        <span className="icon">
                                            <ion-icon name="home-outline" />
                                        </span>
                                        <span className="title">Dashboard</span>
                                    </>
                            }
                        </Link>
                    </li>
                    {
                        (props.userType === "admin") ?
                            <>
                                <li>
                                    <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : '/dashboard/employees'}>
                                        <span className="icon">
                                            <ion-icon name="person-outline" />
                                        </span>
                                        <span className="title">Employees</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : '/dashboard/customers'}>
                                        <span className="icon">
                                            <ion-icon name="people-outline" />
                                        </span>
                                        <span className="title">Customers</span>
                                    </Link>
                                </li>
                            </>
                            :
                            (props.userType === "employee") ?
                                <li>
                                    <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : '/dashboard/reserve-order'}>
                                        <span className="icon">
                                            <ion-icon name="add-circle-outline" />
                                        </span>
                                        <span className="title">Reserve Order</span>
                                    </Link>
                                </li>
                                :
                                null
                    }
                    <li>
                        <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : '/dashboard/orders'}>
                            <span className="icon">
                                <ion-icon name="cart-outline" />
                            </span>
                            <span className="title">Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : `/dashboard/edit-profile/${userId}`}>
                            <span className="icon">
                                <ion-icon name="settings-outline" />
                            </span>
                            <span className="title">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {
                            localStorage.clear();
                            navigate('/login');
                            window.location.reload();
                        }}>
                            <span className="icon">
                                <ion-icon name="log-out-outline" />
                            </span>
                            <span className="title">Sign Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="main">
                <div className="topbar" style={{ width: '100%', display: 'flex' }}>
                    <div className='logo'>
                        <img src={logo} alt="logo" style={{ width: '100px' }} />
                    </div>
                    <div className="icons">
                        <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : `/dashboard/${props.userType}`}>
                            {
                                (props.userType === "customer") ?
                                    <i><ion-icon name="add-circle-outline" /></i>
                                    :
                                    <i><ion-icon name="home-outline" /></i>
                            }
                        </Link>
                        {
                            (props.userType === "admin") ?
                                <>
                                    <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : '/dashboard/employees'}>
                                        <i><ion-icon name="person-outline" /></i>
                                    </Link>
                                    <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : '/dashboard/customers'}>
                                        <i><ion-icon name="people-outline" /></i>
                                    </Link>
                                </>
                                :
                                (props.userType === "employee") ?
                                    <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : '/dashboard/reserve-order'}>
                                        <i><ion-icon name="add-circle-outline" /></i>
                                    </Link>
                                    :
                                    null
                        }
                        <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : '/dashboard/orders'}>
                            <i><ion-icon name="cart-outline" /></i>
                        </Link>
                        <Link to={(checkToFillMoreDetails()) ? `/dashboard/add-more-details` : `/dashboard/edit-profile/${userId}`}>
                            <i><ion-icon name="settings-outline" /></i>
                        </Link>
                        <Link onClick={() => {
                                localStorage.clear();
                                navigate('/login');
                                window.location.reload();
                        }}>
                            <i><ion-icon name="log-out-outline" /></i>
                        </Link>
                    </div>
                    <div className="user">
                        <img src={image1} alt="" />
                    </div>
                </div>

                <Outlet />
                {/* {routes} */}
            </div>
        </div>
    )
}

export default AdminDashboard
