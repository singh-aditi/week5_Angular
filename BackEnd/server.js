"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let express = require('express');
let fs = require('fs');
let app = express();
let cORS = require('cors');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: 'true'
}));
app.listen(3000);
app.use(cORS());
const { Pool, Client } = require('pg');
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});
// app.get('/BusinessLogic', loadData)
// function loadData(req: any, res: any) {
//     pool.query('select * from employee order by id asc')
//         .then((result: any) => {
//             res.json(result.rows);
//         });
// }
app.get('/BussinessLogic', (req, res) => {
    pool.query('select employee."firstName",employee."middleName",employee."lastName",employee.email,employee."phoneNo",employee.role_id,employee.address,employee.id, customer.name, role_tbl.role_id, role_tbl.role_name from employee inner join customer on employee.c_id=customer.c_id inner join role_tbl on role_tbl.role_id=employee.role_id order by id asc;')
        .then((result) => {
        res.json(result.rows);
    });
});
app.delete('/EmployeeTable/:id', deleteRow);
function deleteRow(req, res) {
    pool.query('delete from employee where id = $1', [req.params.id])
        .then(() => {
        res.send();
    });
}
//role drop down api
app.get('/RoleData', (req, res) => {
    pool.query('select role_id, role_name from role_tbl') // where id=$1;',[req.params.id])
        .then((result) => {
        res.json(result.rows);
    });
});
//ends
//customer dropdown api
app.get('/CustomerData', (req, res) => {
    pool.query('select c_id, name from customer') //where id=$1;',[req.params.id])
        .then((result) => {
        res.json(result.rows);
    });
});
//ends
app.put('/Update', Update);
function Update(req, res) {
    const text = 'UPDATE employee SET "firstName"=$1, "middleName"=$2, "lastName"=$3, email=$4, "phoneNo"=$5, role_id=$6, address = $7, c_id=$8 where id=$9';
    const values = [req.body.firstname, req.body.middlename, req.body.lastname, req.body.email, req.body.phoneNo, req.body.role_id, req.body.address, req.body.c_id, req.body.id];
    console.log(req.body.id);
    pool.query(text, values)
        .then(() => res.send());
}
app.post('/Add', AddRow);
function AddRow(req, res) {
    const text = 'insert into employee ("firstName","middleName","lastName",email,"phoneNo",role_id,address,c_id) values ($1,$2,$3,$4,$5,$6,$7,$8) returning id;';
    const values = [req.body.firstname, req.body.middlename, req.body.lastname, req.body.email, req.body.phoneNo, req.body.role_id, req.body.address, req.body.c_id];
    pool.query(text, values)
        .then((result) => res.json(result.rows[0]));
}
