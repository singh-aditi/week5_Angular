import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService} from '../employee.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  title='reactive-forms';
  btnvisibility: boolean=true;
  empformlabel: string= 'Add Employee';
  empformbtn: string= 'Save';
  addUserForm: FormGroup;
  empid=+localStorage.getItem('editEmpId');
  data2: any;


  public roles = [];
  public Customers = [];
  constructor(private fb: FormBuilder, private empService: EmployeeService, private router: Router) {
    console.log(localStorage.getItem('editEmpId'));  
   // console.log("this. data2.firstName", this.data2.firstName);
  }

  ngOnInit(): void {
    this.empService.getRole()
      .subscribe(data => {
        this.roles = data;
        console.log("roles...", this.roles);

      }
      );

    this.empService.getCustomer()
      .subscribe(data => {this.Customers = data;
        console.log("Customers", this.Customers);
      });
    this.addUserForm=this.fb.group(
      {
        firstName: [this.data2.firstName, [Validators.required, Validators.minLength(3)]],
        middleName: [''],
        lastName: ['',[Validators.required, Validators.minLength(3)]],
        email: ['',[Validators.required,
                    Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
        phoneNo: ['',[Validators.required,
                      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        role_id: [''],
        address: ['',[Validators.required]],
        c_id: [''],
        id: [+localStorage.getItem('editEmpId')]
      }
    );
    console.log('before updation/ADD ROW', this.empid);

    if(this.empid>0)
    {
      console.log('Inside updation', this.empid);
      this.empService.getEmployeeById(this.empid).subscribe(data=>
        {
          this.data2=data;
          this.addUserForm.patchValue(data);
        })
        this.btnvisibility=false;
        this.empformlabel='Edit Employee';
        this.empformbtn='Update';
    }
  }
  onSubmit()
  {
    console.log("inside submit");
    this.empService.createUser(this.addUserForm.value)
      .subscribe(data=>
        {
          this.router.navigate(['list-emp']);
        }),
        error =>{
          alert(error);
        }
  }
  onUpdate(){
    console.log("inside update");

    this.empService.updateEmployee(this.addUserForm.value).subscribe(data=>
      {
        this.router.navigate(['list-emp']);
      }),
      error =>{
        alert(error);
      }
  }
  get firstName()
  {
    return this.addUserForm.get('firstName');
  }
  get middleName()
  {
    return this.addUserForm.get('middleName');
  }
  get lastName()
  {
    return this.addUserForm.get('lastName');
  }
  get email()
  {
    return this.addUserForm.get('email');
  }
  get phoneNo()
  {
    return this.addUserForm.get('phoneNo');
  }
  get role_id()
  {
    return this.addUserForm.get('role_id');
  }
  get address()
  {
    return this.addUserForm.get('address');
  }
  get id()
  {
    return this.addUserForm.get('id');
  }

get c_id()
  {
    return this.addUserForm.get('c_id');
  }
}
