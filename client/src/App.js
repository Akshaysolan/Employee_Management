import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import Category from './components/Category';
import AddCategory from './components/AddCategory';
import AddEmployee from './components/AddEmployee';
import Profile from './components/Profile';
import Mainpage from './components/Mainpage';
import EditEmployee from './components/EditEmployee';
import EditAdmin from './components/EditAdmin';
import Addvacancy from './components/Addvacancy';
import Vacancy from './components/Vacancy';

function App() {
  return ( 
   <>
     <BrowserRouter>
       <Routes>
         <Route path='/adminlogin' element={<Login/>} />
         <Route path='/' element={<Mainpage/>}/>
         <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='' element={<Home/>}/>
            <Route path='/dashboard/employee' element={<Employee/>}/>
            <Route path='/dashboard/category' element={<Category/>}/>
            <Route path='/dashboard/profile' element={<Profile/>}/>
            <Route path='/dashboard/add_category' element={<AddCategory/>}/>
            <Route path='/dashboard/add_employee' element={<AddEmployee/>}/>
            <Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>}/>
            <Route path='/dashboard/edit_admin/:id' element={<EditAdmin/>}/>
            <Route path='/dashboard/add_vacancies' element={<Addvacancy/>}/>
            <Route path='/dashboard/vacancy' element={<Vacancy/>}/>S
         </Route>
       </Routes>
     </BrowserRouter>
   </>
  );
}

export default App;
