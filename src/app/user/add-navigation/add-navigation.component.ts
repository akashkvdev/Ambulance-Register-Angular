import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/services/myservice.service';

@Component({
  selector: 'app-add-navigation',
  templateUrl: './add-navigation.component.html',
  styleUrls: ['./add-navigation.component.css']
})
export class AddNavigationComponent {

  navForm!: FormGroup;
  editUserForm!: FormGroup;
  entry_by: any = 1;
  constructor(private formBuilder: FormBuilder, private allService: MyserviceService) { }

  ngOnInit(): void {
    this.initialization();
    this.allNavigations();
    this. EditInitialization();
  }

  initialization() {
    this.navForm = this.formBuilder.group({
      nav_name: ['', Validators.required],
      nav_url: ['', Validators.required],
      nav_icon: ['', Validators.required],
      entry_by: [this.entry_by]
    });
  }

  EditInitialization()
  {
    this.editUserForm = this.formBuilder.group({
      nav_id:[this.nav_id],
      nav_name: ['', Validators.required],
      nav_url: ['', Validators.required],
      nav_icon: ['', Validators.required],
      updated_by: [this.entry_by] // This will always be 1 as per your requirements
    });
  }

  onSubmit(): void {
    if (this.navForm.valid) {
      console.log('Form Submitted:', this.navForm.value);
      this.allService.addNaviGation(this.navForm.value).subscribe(
        (data: any) => {
          console.log(data.message);
          this.navForm.reset();  // Reset form after successful submission
          this.initialization();
          this.allNavigations();
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

  all_navs: any[] = [];
  allNavigations() {
  this.allService.allNavigations().subscribe((data:any)=>{
   this.all_navs = data.data.reverse();
   console.log(data);
   
  },(err:any)=>{
    console.log(err); 
  })
  }


  nav_id:any
  editNav(data:any)
  {
    this.nav_id = data.nav_id;
    this.EditInitialization();
    if (data) {
      this.editUserForm.patchValue({
        nav_name: data?.nav_name || '',
        nav_url: data?.nav_url || '',
        nav_icon: data?.nav_icon || '',
      });
    }
  }


  onUpdate(){
    if (this.editUserForm.valid) {
      const formData = this.editUserForm.value;
      console.log(formData);
      // Call your service to update the user here
      this.allService.updateNav(this.nav_id,formData).subscribe((response:any)=> {
      alert(response.message);
      this.allNavigations();
      },(err:any)=>{
        alert("Something Went Wrong!!")
      });
    } else {
      this.editUserForm.markAllAsTouched(); // Show validation messages
    }
  }
}

