import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit{
  empId : number = 0;
  employee : Employee = new Employee();

  constructor(private employeeService : EmployeeServiceService,private route : ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.empId = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.empId).subscribe(
      data => this.employee=data
    );
  }

  onSubmit(){
    this.employeeService.updateEmployeeById(this.empId,this.employee).subscribe(
      data => {this.employee=data
      this.goToEmployeeList()}
    );
  }

  goToEmployeeList(){
    this.router.navigate(['employees']);
  }

}
