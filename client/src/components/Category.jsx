import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Category() {

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        console.log(result.data);
        if (result.data.Status) {
          const sortedCategories = result.data.Data.sort((a, b) => a.name.localeCompare(b.name));
          setCategory(sortedCategories); 
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);
  
  return (
    <div className='px-5 mt-3' style={{backgroundColor:'Azure'}}>
       <div className='d-flex justify-content-center'>
         <h3>Category List</h3>
       </div>
       <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
       <div className='mt-3'>
         <table className='table'>
            <thead>
               <tr>
                  <th>Name</th>
               </tr>
            </thead>
            <tbody>
              {
                category.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                  </tr>
                ))
              }
            </tbody>
         </table>
       </div>
    </div>
  )
}

export default Category;
