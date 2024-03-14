package net.dhruva.ems.service.impl;

import lombok.AllArgsConstructor;
import net.dhruva.ems.dto.EmployeeDto;
import net.dhruva.ems.entity.Employee;
import net.dhruva.ems.exception.ResourceNotFoundException;
import net.dhruva.ems.mapper.EmployeeMapper;
import net.dhruva.ems.repository.EmployeeRepository;
import net.dhruva.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    public EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeByid(Long employeeid) {
        Employee employee = employeeRepository.findById(employeeid)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee does not exist with given Id:"+employeeid));


        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
           List<Employee> employees = employeeRepository.findAll();

        return employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeid, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeid).orElseThrow(() ->
                new ResourceNotFoundException("Employee does not exist with given Id:"+employeeid));

        employee.setFirstname(updatedEmployee.getFirstname());
        employee.setLastname(updatedEmployee.getLastname());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeobj  = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeobj);
    }

    @Override
    public void deleteEmployee(Long employeeid) {
        Employee employee = employeeRepository.findById(employeeid).orElseThrow(() ->
                new ResourceNotFoundException("Employee does not exist with given Id:"+employeeid));

         employeeRepository.deleteById(employeeid);

    }
}
