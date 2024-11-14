import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/services/myservice.service';

@Component({
  selector: 'app-mode-admission',
  templateUrl: './mode-admission.component.html',
  styleUrls: ['./mode-admission.component.css']
})
export class ModeAdmissionComponent implements OnInit {
  admissionForm!: FormGroup;
  updateForm!:FormGroup;
  entry_by: any = 1;
  all_modes_of_admission: any[] = [];
  mode_of_admission_id: any; // Track the ID for updating

  constructor(private fb: FormBuilder, private modeAdmissionService: MyserviceService) {}

  ngOnInit(): void {
    this.initialization();
    this.allModesOfAdmission();
    this.initaializeUpdate();
  }

  // Form initialization
  initialization() {
    this.admissionForm = this.fb.group({
      mode_of_admission: ['', Validators.required],
      entry_by: [this.entry_by],
      status: [1]
    });
  }

  initaializeUpdate()
  {
    this.updateForm = this.fb.group({
      mode_of_admission: ['', Validators.required],
      updated_by: [this.entry_by],
    });
  }

  // Form submission
  onSubmit(): void {
    if (this.admissionForm.valid) {
      const formData = this.admissionForm.value;

      this.modeAdmissionService.addModeOfAdmission(formData).subscribe(
        (response: any) => {
          alert(response.message);
          // this.admissionForm.reset();
          this.allModesOfAdmission();
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
    this.modeAdmissionService.getAllModes().subscribe(
      (data: any) => {
        this.all_modes_of_admission = data.data.reverse();;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // Prepare for editing a mode of admission
  editMode(mode: any) {
    this.mode_of_admission_id = mode.mode_of_admission_id; // Store the ID for updates
    this.updateForm.patchValue({
      mode_of_admission: mode.mode_of_admission // Patch the value into the form
    });
  }

  // Update function
  onUpdateFunction() {
    if (this.updateForm.valid) {
      const updatedModeOfAdmission = this.updateForm.value;

      // Call the service method to save the changes
      this.modeAdmissionService.updateFunction(this.mode_of_admission_id, updatedModeOfAdmission).subscribe({
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
    this.modeAdmissionService.modeActivation(user.mode_of_admission_id, data).subscribe(
      (response: any) => {
        console.log("User status updated successfully", response);
      },
      (error: any) => {
        console.error("Error updating user status", error);
      }
    );
  }
}
