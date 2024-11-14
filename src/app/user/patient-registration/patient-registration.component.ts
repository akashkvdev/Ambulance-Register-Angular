
import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/services/myservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {
  submitted = false; // This property tracks form submission status
  patientForm!: FormGroup;
  get_all_data: any;
  filteredData: any;
  fromDate: string | null = null;
  toDate: string | null = null;
  entry_by:any;
  ambulace_manage_id:any;
  hospitality_id:any;
  patient_id:any;
  organization_id:any ;
  constructor(private allService: MyserviceService, private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {
    const userInfoString = localStorage.getItem('user_id');
    const org_id = localStorage.getItem('organization_id');
    this.entry_by = userInfoString
    this.organization_id = org_id;

    this.getAlldataDetails();
    this.getAllDepartments();
    this.allModesOfAdmission();
    // Subscribe to changes on the 'ip' field to set mandatory fields
    this.patientForm.get('ip')?.valueChanges.subscribe(value => {
      this.setMandatoryFields(!!value); // Call method with a boolean indicating if IP is filled
    });
  }

  getAlldataDetails() {
    this.allService.getAllDetails(this.organization_id).subscribe(
      (data: any) => {
        console.log(data);  
        this.get_all_data = data.data.reverse();
        this.filteredData = this.get_all_data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  filterData() {
    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);

      this.filteredData = this.get_all_data.filter((data: any) => {
        const dateOfVisit = new Date(data.date_of_visit);
        return dateOfVisit >= from && dateOfVisit <= to;
      });
    } else {
      this.filteredData = this.get_all_data;
    }
  }

  patient_name: any;

  editDetaildata(data: any) {
   
    this.patient_name = data?.patient?.patient_name;
    this.ambulace_manage_id = data?.ambulace_manage_id;
    this.hospitality_id = data?.hospitality_id;
    this.patient_id = data?.patient_id;

    this.initializeForm(); // Reset form after submission
  }

  // Method to initialize the form
  initializeForm() {
    this.patientForm = this.formBuilder.group({
      other_id_type: ['', Validators.required],
      other_id_no: ['', Validators.required],
      ip: [''], // Not mandatory initially
      op: ['',Validators.required], // Not mandatory initially
      mode_of_admission_id: [''], // Not mandatory initially
      department_id: [''], // Not mandatory initially
      admitted_area: [''], // Not mandatory initially
      referred_by: [''], // Not mandatory initially
      remarks: ['', Validators.required],
      mobile_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Example pattern for mobile number
      payment_amount: ['', Validators.required],
      updated_by:[this.entry_by],
      ambulace_manage_id:[this.ambulace_manage_id],
      hospitality_id:[this.hospitality_id],
      patient_id:[this.patient_id],

    });
  }

  // Method to set mandatory fields based on 'ip' input
  setMandatoryFields(isIpEntered: boolean) {
    const mandatoryFields = ['other_id_type', 'other_id_no', 'remarks', 'mobile_number', 'payment_amount'];

    // Set validators based on whether IP is entered
    mandatoryFields.forEach(field => {
      if (isIpEntered) {
        this.patientForm.get(field)?.setValidators(Validators.required);
        this.patientForm.get('op')?.clearValidators(); // 'op' not required
      } else {
        this.patientForm.get(field)?.setValidators(Validators.required);
        this.patientForm.get('op')?.setValidators(null); // Reset 'op' to not required
      }
    });

    // Update the form to reflect changes
    this.updateFormValidity(mandatoryFields);
    this.patientForm.get('op')?.updateValueAndValidity();
  }

  // Method to update the validity of fields
  updateFormValidity(fields: string[]) {
    fields.forEach(field => {
      this.patientForm.get(field)?.updateValueAndValidity();
    });
  }

  // Submission method
  onSubmit() {
    this.submitted = true; // Set submitted to true on form submission

    if (this.patientForm.valid) {
      console.log(this.patientForm.value);
      
      this.allService.addPatientDetails(this.patientForm.value).subscribe(
        (response: any) => {
          alert(response.message)
          console.log('Data saved successfully:', response);
          this.initializeForm(); // Reset form after submission
          this.submitted = false; // Reset submitted flag after successful submission
          this.getAlldataDetails();
        },
        (error: any) => {
          console.error('Error saving data:', error);
          alert("something went wrong!!")
        }
      );
    } else {
      console.log('Form is invalid:', this.patientForm.errors);
    }
  }


    // Get all departments
    all_departments:any
    getAllDepartments() {
      this.allService.getAlldepatmentsOrwise(this.organization_id).subscribe((data: any) => {
        this.all_departments = data.data;
      }, (error: any) => {
        console.error('Error fetching departments:', error);
      });
    }

      // Fetch all modes of admission
  all_modes_of_admission:any
   allModesOfAdmission() {
    this.allService.getAllModes().subscribe(
      (data: any) => {
        this.all_modes_of_admission = data.data.reverse();;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }


  //=======key up======
  hide_me:boolean = true;
  hide_op:boolean = false;
  keyUpip(myip:any)
  {
    console.log(myip);
    if(myip == 0)
    {
      console.log("I have no value");
      this.hide_me = true;
      this.hide_op = false; 
    }else{
      console.log("values in me");
      this.hide_me = false;
      this.hide_op = true;
    }
  }

}
