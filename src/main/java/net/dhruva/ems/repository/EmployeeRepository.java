package net.dhruva.ems.repository;

import net.dhruva.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository <Employee,Long> {



}
