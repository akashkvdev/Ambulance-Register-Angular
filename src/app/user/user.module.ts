import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { MenuComponent } from './menu/menu.component';
import { AmbulanceRegisterComponent } from './ambulance-register/ambulance-register.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ModeAdmissionComponent } from './mode-admission/mode-admission.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { AssignUserComponent } from './assign-user/assign-user.component';
import { OrganizationComponent } from './organization/organization.component';
import { DepartmentComponent } from './department/department.component';
import { AddNavigationComponent } from './add-navigation/add-navigation.component';
import { AssignNavigationComponent } from './assign-navigation/assign-navigation.component';

@NgModule({
  declarations: [
    AddUserComponent,
    MenuComponent,
    AmbulanceRegisterComponent,
    ManageUserComponent,
    ModeAdmissionComponent,
    AddRoleComponent,
    PatientRegistrationComponent,
    AssignUserComponent,
    OrganizationComponent,
    DepartmentComponent,
    AddNavigationComponent,
    AssignNavigationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule  // Add if using reactive forms
  ]
})
export class UserModule { }
