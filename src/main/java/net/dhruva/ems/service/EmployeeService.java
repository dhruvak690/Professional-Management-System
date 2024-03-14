package net.dhruva.ems.service;

import net.dhruva.ems.dto.EmployeeDto;
import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeByid(Long employeeid);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long employeeid,EmployeeDto updatedEmployee);

    void deleteEmployee(Long employeeid);

}
