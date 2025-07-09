import db from '../config/db.js'

export const addEmployee =  (firstName, lastName, mail, cryptedPassword, role) => {

    const insertEmployee = 
    'INSERT INTO employee (firstName, lastName, mail, password, role) VALUES (?, ?, ?, ?, ?);';
    return db.query(insertEmployee, [firstName, lastName, mail, cryptedPassword, role]); 

}

export const loginEmployee = (firstName, lastName) => {
    const selectEmployee = 
    "SELECT idEmployee, mail, password from employee where firstName like ? and lastName like ?;"
    return db.query(selectEmployee, [firstName, lastName]);
}

export const getEmployeeAccount = (employeeId) => {
    const getEmployee=
    'SELECT idEmployee, firstName, lastName, mail FROM employee where idEmployee = ?;';
    return db.query(getEmployee, [employeeId]);
} 

export const updateEmployeeAccount = (firstName, lastName, mail, employeeId) => {
    const updateEmployee = 
    'UPDATE employee SET firstName = ?, lastName = ?, mail = ? WHERE idEmployee = ?;';

    return db.query(updateEmployee, [firstName, lastName, mail, employeeId]);
}

export const updateEmployeePassword = (cryptedPassword, employeeId) =>{
    const updatePassword = 
    'UPDATE employee SET password = ? WHERE idEmployee = ?;';

    return db.query(updatePassword, [cryptedPassword, employeeId])
}

export const getEmployeePassword = (idEmployee) => {
    const selectEmployee = 
    'SELECT password FROM employee WHERE idEmployee = ?;'; 

    return db.query(selectEmployee, [ idEmployee]);
}