import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {path:'menu',component:MenuComponent},
  {path:'add-user',component:AddUserComponent},
  {path:'ambulance-register',component:AmbulanceRegisterComponent},
  {path:'manage-user',component:ManageUserComponent},
  {path:'mode-of-admission',component:ModeAdmissionComponent},
  {path:'add-role',component:AddRoleComponent},
  {path:'patient-details',component:PatientRegistrationComponent},
  {path:'assign-user',component:AssignUserComponent},
  {path:'organization',component:OrganizationComponent},
  {path:'department',component:DepartmentComponent},
  {path:'add-navigation',component:AddNavigationComponent},
  {path:'assign-navigation',component:AssignNavigationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
