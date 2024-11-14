import { Component } from '@angular/core';
import { MyserviceService } from 'src/app/services/myservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.css']
})
export class AssignUserComponent {


  organization_id:any;
  role_id:any =6;

  addUserForm!: FormGroup;
  entry_by: any; // Static entry_by value as per the requirement

  constructor(private fb: FormBuilder, private allservice: MyserviceService) { }

  ngOnInit() {
    const userInfoString = localStorage.getItem('user_id');
    const org_id = localStorage.getItem('organization_id');
    this.entry_by = userInfoString
    this.organization_id = org_id;
    // Initialize the form with validation
    this.formInitialization();
    this.viewUser(this.entry_by);
  }


  formInitialization() {
    this.addUserForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      role_id: [this.role_id],
      organization_id: [this.organization_id],
      // gender: ['', Validators.required],
      user_type: [0],
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
        this.viewUser(this.entry_by);
      },(err:any)=>{
        alert("Something went Wrong!!")
      });
    } else {
      console.log('Form is invalid');
    }
  }

all_user:any
viewUser(id:any)
{
  this.allservice.viewUserentryby(this.entry_by).subscribe((res:any)=>{
    this.all_user = res.data;
  },(err:any)=>{
    console.log(err);    
  })
}


  //==toggle===
  toggleStatus(user: any) {
    // Toggle status between 1 and 0
    user.user_details.status = user.user_details.status === 1 ? 0 : 1;
  
    // Prepare data with status and updated_by fields
    const data = {
      status: user.user_details.status,
      updated_by: this.entry_by
    };
  
    // Call the service to update the user's status
    this.allservice.userActivation(user.user_id, data).subscribe(
      (response: any) => {
        console.log("User status updated successfully", response);
      },
      (error: any) => {
        console.error("Error updating user status", error);
      }
    );
  }

}
