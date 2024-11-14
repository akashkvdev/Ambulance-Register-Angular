//ts file

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/services/myservice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ambulance-register',
  templateUrl: './ambulance-register.component.html',
  styleUrls: ['./ambulance-register.component.css'],
  providers: [DatePipe]
})
export class AmbulanceRegisterComponent implements OnInit, OnDestroy {
  navForm!: FormGroup;
  all_state: any;
  all_dist: any;
  entry_by: any;
  organization_id: any;
  private timeInterval: any;

  constructor(
    private allService: MyserviceService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    const userInfoString = localStorage.getItem('user_id');
    const org_id = localStorage.getItem('organization_id');
    this.entry_by = userInfoString
    this.organization_id = org_id;
    this.getAllStates();
    this.initializeForm();
    this.startUpdatingTime();
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval); // Clear interval when the component is destroyed
    }
  }

  startUpdatingTime() {
    this.timeInterval = setInterval(() => {
      const currentTime = this.datePipe.transform(new Date(), 'HH:mm') || '';
      this.navForm.get('arrival_time')?.setValue(currentTime);
    }, 1000);
  }

  getAllStates() {
    this.allService.allStates().subscribe(
      (res: any) => {
        this.all_state = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getDist(state_id: any) {
    this.allService.allDist(state_id).subscribe(
      (res: any) => {
        this.all_dist = res.districts;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  initializeForm() {
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
 // Format as YYYY-MM-DD
    this.navForm = this.formBuilder.group({
      date_of_visit: [formattedDate, Validators.required],
      arrival_time: ['', Validators.required],
      entry_by: [this.entry_by],
      organization_id: [this.organization_id],
      patient_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      ambulance_number: ['', Validators.required],
      location: ['', Validators.required],
      state_id: ['', Validators.required],
      dist_id: ['', Validators.required],
      driver_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      driver_contact_no: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      coming_from_which_hospital: ['']
    });
  }

  onSubmit(): void {
    if (this.navForm.valid) {
      console.log('Form Submitted:', this.navForm.value);
      this.allService.addAmbulance(this.navForm.value).subscribe(
        (data: any) => {
          alert(data.message);
          this.initializeForm(); // Reset the form
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      console.log('Form is invalid');
      this.navForm.markAllAsTouched();
    }
  }


  // ======================Open Camera ANd Capture Image Form Here =====================
  cameraActive = false;
  capturedImage: string | null = null;

  // Open Camera - Trigger camera access on mobile
  openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const videoElement = document.getElementById('video') as HTMLVideoElement;
          videoElement.srcObject = stream;
          videoElement.play();
          this.cameraActive = true;
        })
        .catch((err) => {
          console.error('Error accessing camera:', err);
        });
    }
  }

  // Capture Image from Camera
  captureImage() {
    const videoElement = document.getElementById('video') as HTMLVideoElement;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      this.capturedImage = canvas.toDataURL('image/png');
    }
  }

  // Upload Captured Image
  uploadImage() {
    if (this.capturedImage) {
      // Perform image upload logic here, e.g., call an API
      console.log('Uploading image:', this.capturedImage);
    }
  }
}