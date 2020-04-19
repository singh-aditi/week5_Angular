import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from "@angular/router";
import { employee } from '/home/aditisingh/Desktop/week5_Angular/src/app/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  public employees = [];
  // public roles = [];
  // public Customers = [];
  constructor(private _employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._employeeService.getEmployees()
      .subscribe(data => this.employees = data);

    // this._employeeService.getRole()
    //   .subscribe(data => this.roles = data);

    // this._employeeService.getCustomer()
    //   .subscribe(data => this.Customers = data);

  }
  addUser() {
    localStorage.removeItem('editEmpId');
    this.router.navigate(['add-emp'])

    
  }

  deleteEmp(employee: employee) {
    this._employeeService.deleteEmployees(employee.id)
      .subscribe(data => {
        this.employees = this.employees.filter(u => u !== employee);
      })
  }
  editEmp(employee: employee): void {
    localStorage.removeItem('editEmpId');
    localStorage.setItem('editEmpId', employee.id.toString());
    this.router.navigate(['add-emp']);
  }



}
