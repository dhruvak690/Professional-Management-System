package net.dhruva.ems.controller;


import lombok.AllArgsConstructor;
import net.dhruva.ems.dto.EmployeeDto;
import net.dhruva.ems.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")

public class EmployeeController {

    private EmployeeService employeeService;
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeByid(@PathVariable("id") Long employeeid){
       EmployeeDto employeeDto =  employeeService.getEmployeeByid(employeeid);
       return ResponseEntity.ok(employeeDto);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
     List<EmployeeDto>  employees = employeeService.getAllEmployees();
     return ResponseEntity.ok(employees);
    }

    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeid,@RequestBody EmployeeDto updatedEmployee){
       EmployeeDto employeeDto = employeeService.updateEmployee(employeeid,updatedEmployee);
       return ResponseEntity.ok(employeeDto);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeid){
        employeeService.deleteEmployee(employeeid);
        return ResponseEntity.ok("Employee id deleted successfully");
    }

}
