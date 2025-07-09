import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})
export class ListEmployeeComponent implements OnInit{

  employees : Employee[] = [];

  constructor(private employeeService : EmployeeServiceService,private route : Router){}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  private getEmployeeList() {
    this.employeeService.getEmployeeList().subscribe(data => this.employees = data);
  }

  updateEmployee(empId : number){
    this.route.navigate(['update-employee',empId]);
  }

  deleteEmployee(empId : number){
    this.employeeService.deleteEmployeeById(empId).subscribe(data => {
      alert("Deleted Successfully!");
      this.getEmployeeList();
    })
  }

}
