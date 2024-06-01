import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Employee() {
  const [employee, setEmployee] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Data);
        } else {
          toast.error(result.data.Error); // Display error message as a toast
        }
      })
      .catch(err => console.log(err));
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedEmployee(null); // Remove highlight when clicking outside
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_employee/${id}`)
      .then(result => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const fetchCategories = () => {
    axios.get("http://localhost:3000/auth/category")
      .then(result => {
        if (result.data.Status) {
          setCategories(result.data.Data);
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleSearch = (e) => {
    e.stopPropagation(); // Prevent event bubbling to document click handler
    const foundEmployee = employee.find(e => e.name.toLowerCase() === searchTerm.toLowerCase());
    setSearchResult(foundEmployee ? foundEmployee.id : 'notfound');
    if (foundEmployee) {
      setSelectedEmployee(foundEmployee.id);
    } else {
      setSelectedEmployee(null);
      toast.warn('Employee not found'); // Display toast message when employee is not found
    }
  };

  const handleRowClick = (id, e) => {
    e.stopPropagation(); // Prevent event bubbling to document click handler
    setSelectedEmployee(id); // Set the clicked employee as selected
  };

  return (
    <div className='px-5 mt-3' onClick={() => setSelectedEmployee(null)}>
      <ToastContainer toastStyle={{ color: 'red' }} /> {/* Add ToastContainer component */}
      <div className="d-flex justify-content-between mb-3">
        <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
        <div className="input-group" style={{ maxWidth: '300px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
              <i className="fas fa-search"></i> 🔍
            </button>
          </div>
        </div>

        <button className='btn btn-primary'>Active</button>
      </div>

      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Department</th>
              <th>Address</th>
              <th>Salary</th>
              <th>HireDate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map(e => (
              <tr
                key={e.id}
                className={searchResult === e.id || selectedEmployee === e.id ? 'table-primary' : ''}
                onClick={(event) => handleRowClick(e.id, event)}
              >
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/${e.image}`}
                    alt=""
                    className='employee_image'
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleImageClick(e.image)}
                  />
                </td>
                <td>{e.email}</td>
                <td>{getCategoryName(e.category_id)}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>{e.hiredate}</td>
                <td>
                  <Link to={`/dashboard/edit_employee/${e.id}`} className='btn btn-info btn-sm me-2'>Edit</Link>
                  <button className='btn btn-warning btn-sm' onClick={() => handleDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',

            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <img
              src={`http://localhost:3000/Images/${selectedImage}`}
              alt=""
              className='img-fluid'
              style={{ maxWidth: '90%', maxHeight: '80vh' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;
