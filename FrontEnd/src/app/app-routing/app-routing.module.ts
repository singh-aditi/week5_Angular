import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeDetailsComponent} from '/home/aditisingh/Desktop/week5_Angular/src/app/employee-details/employee-details.component'
import {AddEmpComponent} from '/home/aditisingh/Desktop/week5_Angular/src/app/add-emp/add-emp.component'

export const routes: Routes = [  
  { path: '', redirectTo: '/list-emp', pathMatch: 'full' },  
  { path: 'list-emp', component: EmployeeDetailsComponent },  
  { path: 'add-emp', component: AddEmpComponent }  
]; 

@NgModule({
  imports: [  
    CommonModule,  
    RouterModule.forRoot(routes)  
  ],  
  exports: [RouterModule],  
  declarations: [] 
})
export class AppRoutingModule { }
