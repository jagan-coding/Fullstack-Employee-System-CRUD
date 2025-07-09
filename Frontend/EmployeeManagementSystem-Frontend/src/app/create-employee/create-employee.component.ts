import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
    employee : Employee = new Employee();
    constructor(private employeeService : EmployeeServiceService, private route : Router){}

    onSubmit(){
      this.insertEmployee();
    }

    insertEmployee(){
      this.employeeService.createEmployee(this.employee).subscribe(data => {
        this.goToEmployeeList();
      })
    }

    goToEmployeeList(){
      this.route.navigate(['employees']);
    }
}
