import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddVacancy() {
    const [vacancies, setVacancies] = useState({
        category_id: "",
        vacancies: ""
    });

    const navigate = useNavigate();
    const [category, setCategory] = useState([]); 

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/auth/add_vacancies', vacancies)
        .then(result => {
           if(result.data.Status){
             navigate('/dashboard');
           }
           else{
              alert(result.data.Error);
           }
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get("http://localhost:3000/auth/category")
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.Data); 
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add Vacancy</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            name="category"
                            id="category"
                            className="form-select"
                            value={vacancies.category_id}
                            onChange={(e) => setVacancies({ ...vacancies, category_id: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {category.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputVacancies" className="form-label">Vacancies</label>
                        <input
                            type="number"
                            className="form-control rounded-0"
                            id="inputVacancies"
                            placeholder="eg. 10"
                            autoComplete="off"
                            value={vacancies.vacancies}
                            onChange={(e) => setVacancies({ ...vacancies, vacancies: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100" style={{marginTop:'20px'}}>
                            Add Vacancies
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddVacancy;
