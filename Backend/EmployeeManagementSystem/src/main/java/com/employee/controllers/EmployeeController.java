package com.employee.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.employee.entities.Employee;
import com.employee.exceptions.EmployeeNotFoundException;
import com.employee.repositories.EmployeeRepository;

@RestController
@CrossOrigin(origins ="http://localhost:4200")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@GetMapping("/employees")
	public List<Employee> getAllEmployee(){
		return employeeRepository.findAll();
	}
	
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
	@GetMapping("/employees/{empId}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable int empId) {
		Employee emp = employeeRepository.findById(empId).orElseThrow(()-> new EmployeeNotFoundException("Employee with this Employee Id: "+empId+" does not exist!"));
		return ResponseEntity.ok(emp);
	}
	
	@PutMapping("/employees/{empId}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable int empId,@RequestBody Employee employee) {
		Employee emp = employeeRepository.findById(empId).orElseThrow(()-> new EmployeeNotFoundException("Employee with this Employee Id: "+empId+" does not exist!"));
		emp.setEmpName(employee.getEmpName());
		emp.setEmpDesignation(employee.getEmpDesignation());
		emp.setEmpSalary(employee.getEmpSalary());
		employeeRepository.save(emp);
		return ResponseEntity.ok(emp);
	}
	
	@DeleteMapping("/employees/{empId}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable int empId){
		Employee emp = employeeRepository.findById(empId).orElseThrow(()-> new EmployeeNotFoundException("Employee with this Employee Id: "+empId+" does not exist!"));
		employeeRepository.delete(emp);
		Map<String,Boolean> response = new HashMap<>();
		response.put("Delete", true);
		return ResponseEntity.ok(response);
	}
	
}
