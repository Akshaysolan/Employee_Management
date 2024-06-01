import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from './Footer';

function Dashboard() {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  axios.defaults.withCredentials = true

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.Status) {
          navigate('/adminlogin')
        }
      })
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container-fluid flex-grow-1">
        <div className="row flex-nowrap h-100">
          {isSidebarVisible && (
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <Link
                  to="/dashboard"
                  className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                >
                  <span className="fs-5 fw-bolder d-none d-sm-inline">
                    Code With Akshay
                  </span>
                </Link>
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li className="w-100">
                    <NavLink
                      to="/dashboard"
                      className="nav-link text-white px-0 align-middle"
                      activeClassName="active"
                    >
                      <i className="fs-4 bi-speedometer2 ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                    </NavLink>
                  </li>
                  <li className="w-100">
                    <NavLink
                      to="/dashboard/employee"
                      className="nav-link px-0 align-middle text-white"
                      activeClassName="active"
                    >
                      <i className="fs-4 bi-people ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">
                        Manage Employees
                      </span>
                    </NavLink>
                  </li>
                  <li className="w-100">
                    <NavLink
                      to="/dashboard/category"
                      className="nav-link px-0 align-middle text-white"
                      activeClassName="active"
                    >
                      <i className="fs-4 bi-person ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">Category</span>
                    </NavLink>
                  </li>
                  <li className="w-100">
                    <NavLink
                      to="/dashboard/vacancy"
                      className="nav-link px-0 align-middle text-white"
                      activeClassName="active"
                    >
                      <i className="fs-4 bi-briefcase ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">Vacancies</span>
                    </NavLink>
                  </li>

                  <li className="w-100">
                    <NavLink
                      to="/dashboard/profile"
                      className="nav-link px-0 align-middle text-white"
                      activeClassName="active"
                    >
                      <i className="fs-4 bi-person ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">Profile</span>
                    </NavLink>
                  </li>
                  <li className="w-100" onClick={handleLogout}>
                    <Link className="nav-link px-0 align-middle text-white">
                      <i className="fs-4 bi-power ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div className={`col p-0 m-0 d-flex flex-column ${isSidebarVisible ? '' : 'col-12'}`}>
            <div className="p-2 d-flex justify-content-between align-items-center shadow m-0">
              <button className="btn btn-dark" onClick={toggleSidebar}>
                <i className="bi bi-list"></i>
              </button>
              <h4 className="text-center w-100 m-0">Employee Management System</h4>
              <div className="rounded-circle bg-secondary mx-2" style={{ width: '40px', height: '40px', overflow: 'hidden' }}>
                <img
                  src="https://www.bing.com/th?id=OIP.Ih6Re-aJYi0MGGnFXF-qGAHaHa&w=221&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

            </div>
            <div className="flex-grow-1 p-0 m-0">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
