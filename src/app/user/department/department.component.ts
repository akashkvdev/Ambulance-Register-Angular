import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/services/myservice.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentForm!: FormGroup;
  editDepartmentForm!: FormGroup;
  all_departments: any[] = [];
  entry_by: any = 1;
  department_id: any;
  organization:any;
  constructor(private fb: FormBuilder, private departmentService: MyserviceService) {}

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('user_id');
    const org_id = localStorage.getItem('organization_id');
    this.entry_by = userInfoString
    

    this.initializeForms();
    this.getAllDepartments();
    this.allOrganization();
  }

  // Form initialization
  initializeForms() {
    this.departmentForm = this.fb.group({
      department_name: ['', Validators.required],
      organization_id: ['', Validators.required],
      entry_by: [this.entry_by],
      status:[1]
    });

    this.editDepartmentForm = this.fb.group({
      department_name: ['', Validators.required],
      updated_by: [this.entry_by],
    });
  }

  // Get all departments
  getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe((data: any) => {
      console.log(data);
      this.all_departments = data.data.reverse();
    }, (error: any) => {
      console.error('Error fetching departments:', error);
    });
  }

  // Form submission for adding a department
  onSubmit(): void {
    if (this.departmentForm.valid) {
      const formData = this.departmentForm.value;
      this.departmentService.addDepartment(formData).subscribe(
        (response: any) => {
          alert(response.message);
          this.departmentForm.reset();
          this.getAllDepartments();
        },
        (error: any) => {
          console.error('Error submitting form:', error);
          alert('Something went wrong! Please try again.');
        }
      );
    }
  }

  // Edit department
  editDepartment(department: any) {
    this.department_id = department.department_id;
    this.editDepartmentForm.patchValue({
      department_name: department.department_name,
    });
  }

  // Update department
  onUpdateFunction() {
    if (this.editDepartmentForm.valid) {
      const updatedData = {
        ...this.editDepartmentForm.value,
        department_id: this.department_id
      };
      
      this.departmentService.updateDepartment(this.department_id ,updatedData).subscribe({
        next: (response: any) => {
          console.log('Department updated successfully:', response);
          this.getAllDepartments();
        },
        error: (error:any) => {
          console.error('Error updating department:', error);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  // Toggle department activation
  toggleActivation(department: any) {
    department.status = !department.status;
    // this.departmentService.toggleDepartmentActivation(department.department_id, department.status).subscribe(
    //   (response: any) => {
    //     console.log('Department status updated:', response);
    //   },
    //   (error: any) => {
    //     console.error('Error updating department status:', error);
    //   }
    // );
  }


  allOrganization() {
    this.departmentService.totalActiveHospital().subscribe((data: any) => {
      this.organization = data.data;
    }, (err: any) => {
      console.log(err);
    });

  }


  toggleStatus(user: any) {
    // Toggle status between 1 and 0
    user.status = user.status === 1 ? 0 : 1;
  
    // Prepare data with status and updated_by fields
    const data = {
      status: user.status,
      updated_by: this.entry_by
    };
  
    // Call the service to update the user's status
    this.departmentService.departActivation(user.department_id, data).subscribe(
      (response: any) => {
        console.log("User status updated successfully", response);
      },
      (error: any) => {
        console.error("Error updating user status", error);
      }
    );
  }
}
