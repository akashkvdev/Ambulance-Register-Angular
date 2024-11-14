import { Component } from '@angular/core';
import { MyserviceService } from 'src/app/services/myservice.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {
  editUser: any = { user_details: {} };  // Ensure that user_details is initialized to avoid undefined errors
  all_user: any[] = [];
  all_roles: any[] = [];
  organization: any[] = [];
  entry_by: any;
  
  user_id: any;  // Store user_id for editing user details

  constructor(private allservice: MyserviceService) { }

  ngOnInit() {
    const userInfoString = localStorage.getItem('user_id');
    this.entry_by = userInfoString;
    this.allUser();
    this.allRoles();
    this.allOrganization();
  }

  // Fetch all users
  allUser() {
    this.allservice.getAllUsers().subscribe((data: any) => {
      this.all_user = data.data.reverse();
    }, (err: any) => {
      console.log(err);
    });
  }

  // Edit user function
  editUserDetails(user: any) {
    // Ensure that user_details is always an object
    this.editUser = {
      ...user,
      user_details: user.user_details ? { ...user.user_details } : { contact_no: '', login_id: '', status: 0 } // Initialize user_details if not present
    };
    this.user_id = user.user_id;  // Store user_id for form submission
  }
  

  // Handle form submission
  onSubmit(form: any) {
    if (form.valid) {
      const formData = { ...form.value, user_id: this.user_id, user_details: form.value.user_details };
      this.allservice.updateUser(this.user_id, formData).subscribe((response: any) => {
        alert(response.message);
        this.allUser();  // Refresh the user list
      }, (err: any) => {
        alert("Something went wrong!!");
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // Fetch all roles
  allRoles() {
    this.allservice.toatalActiveUserrole().subscribe((data: any) => {
      this.all_roles = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  // Fetch all organizations
  allOrganization() {
    this.allservice.totalActiveHospital().subscribe((data: any) => {
      this.organization = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  // Toggle user status
  toggleStatus(user: any) {
    user.user_details.status = user.user_details.status === 1 ? 0 : 1;
    const data = { status: user.user_details.status, updated_by: 1 };

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
