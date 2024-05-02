import axios from "axios";

const  REST_API_BASE_URL = "http://localhost:8080/api/employees";

export const listEmployees = () =>{
    return axios.get(REST_API_BASE_URL);
}

export const createEmployee = (employee) =>{
    return axios.post(REST_API_BASE_URL,employee)
}

export const getEmployee = (employeeid) =>{
    return axios.get(REST_API_BASE_URL + '/' + employeeid)
}

export const updateEmployee = (employeeid, employee) =>{
    return axios.put(REST_API_BASE_URL + '/' + employeeid,employee)
}

export const deleteEmployee = (employeeid) =>{
    return axios.delete(REST_API_BASE_URL + '/' + employeeid)
}