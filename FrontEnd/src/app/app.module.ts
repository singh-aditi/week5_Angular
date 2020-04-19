import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {EmployeeService} from './employee.service'
import { ReactiveFormsModule, FormGroup, FormsModule } from "@angular/forms";  
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmpComponent } from './add-emp/add-emp.component'; 

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    AddEmpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
