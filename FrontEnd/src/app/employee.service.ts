import { Injectable } from '@angular/core';
import { employee,role,Customer } from '/home/aditisingh/Desktop/Angular_practice/reactive-forms/src/app/employee';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl:string="http://localhost:3000";
  constructor(private http: HttpClient) { }

  getEmployees (): Observable<employee[]> {
    return this.http.get<employee[]>(this.baseUrl+'/BussinessLogic')
  }
  getRole (): Observable<role[]>{
    return this.http.get<role[]>(this.baseUrl+'/RoleData')
  }
  getCustomer():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseUrl+'/CustomerData')
  } 
  deleteEmployees(id: number) {  
    return this.http.delete<employee[]>(this.baseUrl + '/EmployeeTable/' + id);  
  }  
  createUser(employee: employee) {  
    return this.http.post(this.baseUrl+ '/Add', employee);  
  }   
  updateEmployee(employee: employee) {  
    return this.http.put(this.baseUrl+'/Update', employee);  
  }
  getEmployeeById(id: number) {  
    return this.http.get<employee>(this.baseUrl + '/' + id);  
  }   

}
