import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private baseUrl = "http://localhost:8080/employees";

  constructor(private httpClient : HttpClient) {}

  getEmployeeList() : Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseUrl}`);
  }

  createEmployee(employee : Employee):Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`,employee);
  }

  getEmployeeById(empId : number):Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${empId}`)
  }

  updateEmployeeById(empId : number,employee : Employee) : Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseUrl}/${empId}`,employee);
  }

  deleteEmployeeById(empId : number){
    return this.httpClient.delete(`${this.baseUrl}/${empId}`);
  }
  
}
