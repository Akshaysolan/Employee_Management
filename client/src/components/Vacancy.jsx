import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AddVacancy() {
  const [categories, setCategories] = useState([]);
  const [vacanciesList, setVacanciesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVacancies, setFilteredVacancies] = useState([]);

  const fetchCategories = () => {
    axios.get("http://localhost:3000/auth/category")
      .then(result => {
        if (result.data.Status) {
          setCategories(result.data.Data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const fetchVacancies = () => {
    axios.get("http://localhost:3000/auth/vacancy")
      .then(result => {
        if (result.data.Status) {
          setVacanciesList(result.data.Data);
          setFilteredVacancies(result.data.Data); 
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCategories();
    fetchVacancies();
  }, []);

  useEffect(() => {
    setFilteredVacancies(
      vacanciesList.filter(v =>
        getCategoryName(v.category_id).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, vacanciesList]);

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const handleSearch = () => {
    setFilteredVacancies(
      vacanciesList.filter(v =>
        getCategoryName(v.category_id).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Link to="/dashboard/add_vacancies" className='btn btn-success' style={{ margin: '10px' }}>Add Vacancies</Link>
      <div className="input-group" style={{ maxWidth: '300px', margin: '10px auto' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search vacancies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
            🔍
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border">
          <h3 className="text-center">Vacancies List</h3>
          <ul className="list-group" style={{ marginLeft: '20px' }}>
            {filteredVacancies.map((v) => (
              <li key={v.id} className="list-group-item">
                <span style={{ marginRight: '20px' }}>{getCategoryName(v.category_id)}:</span>
                <span style={{ float: 'right' }}>{v.vacancies} vacancies</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddVacancy;
