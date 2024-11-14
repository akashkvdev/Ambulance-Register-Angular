import { Component } from '@angular/core';
import { MyserviceService } from 'src/app/services/myservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  organization: any = [];
  all_roles: any = [];
  addUserForm!: FormGroup;
  entry_by: any; // Static entry_by value as per the requirement

  constructor(private fb: FormBuilder, private allservice: MyserviceService) { }

  ngOnInit() {
    const userInfoString = localStorage.getItem('user_id');
    this.entry_by = userInfoString
   
    this.allOrganization();
    this.allRoles();

    // Initialize the form with validation
    this.formInitialization();
  }


  formInitialization() {
    this.addUserForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      role_id: ['', Validators.required],
      organization_id: ['', Validators.required],
      // gender: ['', Validators.required],
      user_type: [1],
      contact_no: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]
      ]
    });
  }

  //submit form
  onSubmit() {
    if (this.addUserForm.valid) {
      const formData = { ...this.addUserForm.value, entry_by: this.entry_by };
      console.log('Form Data:', formData);
      // Here, submit the form data to the service, e.g.:
      this.allservice.addUser(formData).subscribe((response: any) => {
        alert(response.message);
        this.addUserForm.reset(); // Reset form after submission
        this.formInitialization(); //initialize
      },(err:any)=>{
        alert("Something went Wrong!!")
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // Fetch and display all organizations
  allOrganization() {
    this.allservice.totalActiveHospital().subscribe((data: any) => {
      this.organization = data.data;
    }, (err: any) => {
      console.log(err);
    });

  }

  //fetch all roles
  allRoles() {
    this.allservice.toatalActiveUserrole().subscribe((data: any) => {
      this.all_roles = data.data;
      console.log(this.all_roles)
    }, (err: any) => {
      console.log(err);
    });
  }

}
