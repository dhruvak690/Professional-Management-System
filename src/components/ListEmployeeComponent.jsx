import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setemployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees()
  }, []);

  const getAllEmployees = () => {
    listEmployees()
      .then((response) => {
        setemployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addEmployee = () => {
    navigator("/add-employee");
  };

  const updateEmployee = (id) => {
    navigator(`/update-employee/${id}`);
  };

  const removeEmployee = (id) => {
    deleteEmployee(id).then((response)=>{
      getAllEmployees()
    }).catch((error)=>{
      console.error(error);
    })
  };

  return (
    <div className="container">
      <h2 className="text-center">Employees List</h2>
      <button className="btn btn-primary mb-2" onClick={addEmployee}>
        Add New Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee id</th>
            <th>Employee first name</th>
            <th>Employee last name</th>
            <th>Employee email id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstname}</td>
              <td>{employee.lastname}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-success mx-2"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => removeEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
