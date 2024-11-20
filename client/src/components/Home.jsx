import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [totalVacancies, setTotalVacancies] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
    vacanciesCount();
  }, []);

  const vacanciesCount = () => {
    axios.get('http://localhost:3000/auth/vac_count')
      .then(result => {
        if (result.data.Status) {
          setTotalVacancies(result.data.Data[0].vacancies);
        }
      });
  };
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Data[0].admin);
        }
      });
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Data[0].employee);
        }
      });
  };

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Data[0].salaryOfEmp);
        }
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_admin/${id}`)
      .then(result => {
        if (result.data.Status) {
          AdminRecords();
        } else {
          alert(result.data.Error);
        }
      });
  };


  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Data);
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <>
      <div className='p-3 d-flex justify-content-around mt-3' >
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{backgroundColor:'burlywood', height: 'calc(100% + 20px)', borderRadius:'10px'}}>
          <div className='text-center pb-1'>
            <h4><i className="bi bi-person-badge"></i> Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{backgroundColor:'burlywood', height: 'calc(100% + 20px)', borderRadius:'10px'}}>
          <div className='text-center pb-1'>
            <h4><i className="bi bi-people"></i> Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
      
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{backgroundColor:'burlywood', height: 'calc(100% + 20px)', borderRadius:'10px'}}>
          <div className='text-center pb-1'>
            <h4><i className="bi bi-currency-dollar"></i> Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>

      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{backgroundColor:'burlywood', height: 'calc(100% + 20px)', borderRadius:'10px'}}>
        <div className='text-center pb-1'>
          <h4><i className="bi bi-briefcase"></i> Recruitment</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{totalVacancies}</h5>
        </div>
      </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{backgroundColor:'burlywood', height: 'calc(100% + 20px)', borderRadius:'10px'}}>
          <div className='text-center pb-1'>
            <h4><i className="bi bi-book"></i> Training</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5></h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{backgroundColor:'burlywood', height: 'calc(100% + 20px)', borderRadius:'10px'}}>
          <div className='text-center pb-1'>
            <h4><i className="bi bi-graph-up"></i> Performance</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5></h5>
          </div>
        </div>
      </div>
      <hr/>
      <div className='mt-4 px-5 pt-3' style={{marginTop:'30px'}}>
        <h3 style={{textAlign:'center'}}>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th style={{ textAlign: 'right', paddingRight: '35px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                <tr key={a.email}>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td style={{ textAlign: 'right', paddingRight: '10px' }}>
                    <Link to={`/dashboard/edit_admin/${a.id}`}>
                      <button className='btn btn-info btn-sm me-2'>Edit</button>
                    </Link>
                    <button className='btn btn-warning btn-sm' onClick={() => handleDelete(a.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
