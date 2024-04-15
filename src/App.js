import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './users/guest/Homepage';
import { Route, Routes } from 'react-router-dom';
// import LoginandRegister from './users/guest/LoginandRegister';
import ForgotPassword from './users/guest/ForgotPassword';
import Login from './users/guest/Login';
import Register from './users/guest/Register';
import AdminDashboard from './components/administrator/AdminDashboard';
import MainPage from './components/dashboard/MainPage';
import Employees from './components/dashboard/Employees';
import Customers from './components/dashboard/Customers';
import Setting from './components/dashboard/Setting';
import { useEffect, useState } from 'react';
import Orders from './components/dashboard/Orders';
import AddEmployee from './components/dashboard/AddEmployee';
import ListEmployees from './components/dashboard/ListEmployees';
import AddingMoreDetails from './components/dashboard/AddingMoreDetails';
import MakeOrder from './components/customer/MakeOrder';
import ReserveNewOrder from './components/employee/ReserveNewOrder';
import NotFound from './components/guest/NotFound';

function App() {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const checkUserType = () => {
      let user = localStorage.getItem('customer');
      if(user) {
        return 'customer'
      }

      user = localStorage.getItem('employee');
      if(user) {
        return 'employee'
      }

      user = localStorage.getItem('admin');
      if(user) {
        return 'admin';
      } 
    }

    setUserType(checkUserType());
  }, [])

  return (
    <div className="App">
      {
        (!userType) ? 
        <>
          <Routes>
            <Route exact path='/' element={<Homepage userType="" />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/forgot-password' element={<ForgotPassword />} />
            <Route exact path='*' element={<NotFound userType="" />} />
          </Routes>
        </>
        :
        (userType === "customer") ? 
        <>
          <Routes>
            <Route exact path='/' element={<Homepage userType="customer" />} />
            <Route exact path='/dashboard' element={<AdminDashboard userType="customer" />} >
              <Route exact path='add-more-details' element={<AddingMoreDetails userType="customer" />} />
              <Route exact path='customer' element={<MakeOrder />} />
              <Route exact path='orders' element={<Orders userType="customer" />} />
              <Route exact path='edit-profile/:id' element={<Setting userType="customer"/>} />
            </Route>
            <Route exact path='*' element={<NotFound userType="customer" />} />
          </Routes>
        </>
        : 
        (userType === "employee") ?
        <>
          <Routes>
            <Route exact path='/' element={<Homepage userType="employee" />} />
            <Route exact path='/dashboard' element={<AdminDashboard userType="employee" />} >
              <Route exact path='add-more-details' element={<AddingMoreDetails userType="employee" />} />
              <Route exact path='employee' element={<MainPage userType="employee" />} />
              <Route exact path='edit-profile/:id' element={<Setting />} />
              <Route exact path='orders' element={<Orders userType="employee" />} />
              <Route exact path='reserve-order' element={<ReserveNewOrder />} />
              <Route exact path='setting' element={<Setting userType="employee" />} />
            </Route>
            <Route exact path='*' element={<NotFound userType="employee" />} />
          </Routes>
        </>
        : 
        <>
          <Routes>
            <Route exact path='/' element={<Homepage userType="admin" />} />
            <Route exact path='/dashboard' element={<AdminDashboard userType="admin" />} >
              <Route exact path='add-more-details' element={<AddingMoreDetails userType="admin" />} />
              <Route exact path='admin' element={<MainPage userType="admin" />} />
              <Route exact path='employees' element={<Employees />} />
              <Route exact path='add-employee' element={<AddEmployee/>} />
              <Route exact path='list-employees' element={<ListEmployees />} />
              <Route exact path='customers' element={<Customers />} />
              <Route exact path='orders' element={<Orders userType="admin" />} />
              <Route exact path='edit-profile/:id' element={<Setting userType="admin" />} />
            </Route>
            <Route exact path='*' element={<NotFound userType="admin" />} />
          </Routes>
        </>
      }
    </div>
  );
}

export default App;
