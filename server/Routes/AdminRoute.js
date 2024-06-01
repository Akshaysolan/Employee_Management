const express = require('express');
const con = require('../utils/db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');


const router = express.Router();

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Wrong email or password" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email }, 
                "jwt_secret_key", 
                { expiresIn: '1d' }
            );
            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});



router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Data: result });
    });
});


router.post('/add_category', (req, res) => {
    console.log('Received request to add category:', req.body.category); 
    const sql = "INSERT INTO category(`name`) VALUES (?)";
    con.query(sql, [req.body.category], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true });
    });
});



 //image start code

 const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
 })

 const upload = multer({
    storage : storage
 })
 //image end.................


router.post('/add_employee', upload.single('image'), (req, res) =>{
    const sql = `INSERT INTO employee(name, email, password, address, salary, image, category_id, hiredate ) VALUES(?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if(err) return res.json({Status: false, Error:"Query Error"})
        const values = [
           req.body.name,
           req.body.email,
           hash,
           req.body.address,
           req.body.salary,
           req.file.filename,
           req.body.category_id,
           req.body.hiredate

        ] 
        con.query(sql, [values], (err, result) =>{

            if(err) return res.json({Status: false, Error:"Query Error"})
            return res.json({Status: true})
        }) 
    });
});

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Data: result });
    });
});

router.get('/employee/:id', (req, res) =>{
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Data: result });
    });
});

router.put('/edit_employee/:id', (req, res) =>{
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name=?, email=?, salary=?, address=?, category_id=?, hiredate=?
        WHERE id = ?`

        const values = [
            req.body.name,
            req.body.email,
            req.body.salary,
            req.body.address,
            req.body.category_id,
            req.body.hiredate
         ] 

    con.query(sql,[...values, id],(err, result) =>{
        if(err) return res.json({Status:false, Error:"Query Error"+err})
        return res.json({Status: true, Data:result})
    });
});


router.delete('/delete_employee/:id',(req, res) =>{
    const id = req.params.id;
    const sql = `delete from employee where id=?`
    con.query(sql,[id],(err, result) =>{
        if(err) return res.json({Status:false, Error:"Query Error"+err})
        return res.json({Status: true, Data:result})
    });
});


router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error:"Query Error"+err})
        return res.json({Status:true, Data:result})
    });
});

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error:"Query Error"+err})
        return res.json({Status:true, Data:result})
    });
});


router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOfEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error:"Query Error"+err})
        return res.json({Status:true, Data:result})
    });
});


router.get('/admin_records', (req, res) =>{
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error:"Query Error"+err})
        return res.json({Status:true, Data:result})
    });
});

router.get('/logout', (req, res)=>{
    res.clearCookie('token')
    return res.json({Status: true})
});


router.post('/edit_admin', (req, res) => {
    const { email, name, password } = req.body;
    const sql = "UPDATE admin SET name = ?, password = ? WHERE email = ?";
    con.query(sql, [name, password, email], (err, result) => {
        if (err) {
            console.error("Error updating admin details:", err);
            return res.status(500).json({ success: false, error: "An error occurred while updating admin details." });
        }
        
        if (result.affectedRows > 0) {
            return res.json({ success: true, message: "Admin details updated successfully." });
        } else {
            return res.status(404).json({ success: false, error: "Admin not found." });
        }
    });
});

router.delete('/delete_admin/:id',(req, res) =>{
    const id = req.params.id;
    const sql = `delete from admin where id=?`
    con.query(sql,[id],(err, result) =>{
        if(err) return res.json({Status:false, Error:"Query Error"+err})
        return res.json({Status: true, Data:result})
    });
});


router.post('/add_vacancies', (req, res) => {
    const { category_id, vacancies } = req.body;
    console.log(req.body); // Add this line to log the received data

    if (!category_id || !vacancies) {
      return res.status(400).json({ Status: false, Error: 'Missing required fields' });
    }

    const sql = 'INSERT INTO vacancies (category_id, vacancies) VALUES (?, ?)';
    con.query(sql, [category_id, vacancies], (err, result) => {
      if (err) {
        return res.status(500).json({ Status: false, Error: 'Query Error: ' + err });
      }
      return res.status(200).json({ Status: true, Data: result });
    });
});


router.get('/vac_count', (req, res) => {
    const sql = "select sum(vacancies) as vacancies from vacancies";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error:"Query Error"+err})
        return res.json({Status:true, Data:result})
    });
});


router.get('/vacancy', (req, res) => {
    const sql = "SELECT * FROM vacancies";
    con.query(sql, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Data: result });
    });
});


module.exports = { adminRouter: router };
