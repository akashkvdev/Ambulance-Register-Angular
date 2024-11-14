import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/services/myservice.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {
  admissionForm!: FormGroup;
  updateForm!:FormGroup;
  entry_by: any;
  all_modes_of_admission: any[] = [];
  organization_id: any; // Track the ID for updating

  constructor(private fb: FormBuilder, private modeAdmissionService: MyserviceService) {}

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('user_id');
    const org_id = localStorage.getItem('organization_id');
    this.entry_by = userInfoString
    // this.organization_id = org_id;

    this.initialization();
    this.allModesOfAdmission();
    this.initaializeUpdate();
  }

  // Form initialization
  initialization() {
    this.admissionForm = this.fb.group({
      organization_name: ['', Validators.required],
      org_short_name: ['', Validators.required],
      organization_location: ['', Validators.required],

      entry_by: [this.entry_by],
      status: [1]
    });
  }

  initaializeUpdate()
  {
    this.updateForm = this.fb.group({
      organization_name: ['', Validators.required],
      org_short_name: ['', Validators.required],
      organization_location: ['', Validators.required],

      updated_by: [this.entry_by],
    });
  }

  // Form submission
  onSubmit(): void {
    if (this.admissionForm.valid) {
      const formData = this.admissionForm.value;

      this.modeAdmissionService.addOrgOfAdmission(formData).subscribe(
        (response: any) => {
          alert(response.message);
          // this.admissionForm.reset();
          this.allModesOfAdmission()
          this.initialization(); // Re-initialize the form to clear values
        },
        (error: any) => {
          console.error('Error submitting form:', error);
          alert("Something went wrong. You might have used this name before!");
        }
      );
    }
  }

  // Fetch all modes of admission
  allModesOfAdmission() {
    this.modeAdmissionService.totalActiveHospital().subscribe(
      (data: any) => {
        this.all_modes_of_admission = data.allOrganizations.reverse();
        console.log(data);
        
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // Prepare for editing a mode of admission
  editMode(mode: any) {
    this.organization_id = mode.organization_id; // Store the ID for updates
    this.updateForm.patchValue({
      organization_name: mode.organization_name,
      organization_id: mode.organization_id,
      org_short_name: mode.org_short_name,
      organization_location: mode.organization_location,// Patch the value into the form
    });
  }

  // Update function
  onUpdateFunction() {
    if (this.updateForm.valid) {
      const updatedModeOfAdmission = this.updateForm.value;

      // Call the service method to save the changes
      this.modeAdmissionService.updateOrgFunction(this.organization_id, updatedModeOfAdmission).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.allModesOfAdmission(); // Refresh the list after update
          this.initaializeUpdate();
        },
        error: (error) => {
          console.error('Error updating mode of admission:', error);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
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
    this.modeAdmissionService.orgActivation(user.organization_id, data).subscribe(
      (response: any) => {
        console.log("User status updated successfully", response);
      },
      (error: any) => {
        console.error("Error updating user status", error);
      }
    );
  }
}
