import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  apiUrl = 'http://103.39.241.158:5004/api';
  constructor(private http: HttpClient) { }




  allOrganization() {
    return [
      { organization_id: 1, organization_name: 'HMN' },
      { organization_id: 2, organization_name: 'HMRKL' },
      { organization_id: 3, organization_name: 'HMCH' },
    ];
  }

  allRoles() {
    return [
      { role_id: 1, role_name: 'Admin' },
      { role_id: 2, role_name: 'Manager' },
      { role_id: 3, role_name: 'User' },
    ];
  }
  //========================Static data as per requirement====================//
  //all hospitals
  totalActiveHospital() {
    return this.http.get(`${this.apiUrl}/organizations`);
  }

  //alluser role
  toatalActiveUserrole() {
    return this.http.get(`${this.apiUrl}/user-roles`);
  }

  logIn(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data); // Adjust endpoint as needed
  }
  //================adduser=========================//
  addUser(data: any): Observable<any> { // Ensure it returns Observable
    return this.http.post(`${this.apiUrl}/users`, data); // Adjust endpoint as needed
  }


  //===========mode of admission
  addModeOfAdmission(data: any): Observable<any> { // Ensure it returns Observable
    return this.http.post(`${this.apiUrl}/modeofadmissions`, data); // Adjust endpoint as needed
  }

  getAllModes() {
    return this.http.get(`${this.apiUrl}/modeofadmissions`);
  }

  updateFunction(id: any, data: any) {
    return this.http.put(`${this.apiUrl}/modeofadmissions/${id}`, data);
  }

  modeActivation(id: any, data: any) {
    return this.http.patch(`${this.apiUrl}/modeofadmissions/${id}/status`, data);
  }
  //=============manage user ===========================//
  getAllUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }
  updateUser(id: any, data: any) {
    return this.http.put(`${this.apiUrl}/users/${id}`, data);
  }

  userActivation(id: any, data: any) {
    return this.http.patch(`${this.apiUrl}/users/${id}/status`, data);
  }



  //================alldepartments============
  getAllDepartments() //id dependent
  {
    return this.http.get(`${this.apiUrl}/departments`);
  }
  addDepartment(data: any) {
    return this.http.post(`${this.apiUrl}/departments`, data); // Adjust endpoint as needed
  }
  updateDepartment(id: any, data: any) {
    return this.http.put(`${this.apiUrl}/departments/${id}`, data);
  }

  departActivation(id: any, data: any) {
    return this.http.patch(`${this.apiUrl}/departments/${id}/status`, data);
  }

  //==============organization=======================
  addOrgOfAdmission(data: any): Observable<any> { // Ensure it returns Observable
    return this.http.post(`${this.apiUrl}/organizations`, data); // Adjust endpoint as needed
  }
  updateOrgFunction(id: any, data: any) {
    return this.http.put(`${this.apiUrl}/organizations/${id}`, data);
  }

  orgActivation(id: any, data: any) {
    return this.http.patch(`${this.apiUrl}/organizations/${id}/status`, data);
  }



  //==============Adrole=======================
  addRole(data: any): Observable<any> { // Ensure it returns Observable
    return this.http.post(`${this.apiUrl}/user-roles`, data); // Adjust endpoint as needed
  }

  getRole()  //id dependent
  {
    return this.http.get(`${this.apiUrl}/user-roles`);
  }

  updateRole(id: any, data: any) {
    return this.http.put(`${this.apiUrl}/user-roles/${id}`, data);
  }

  roleActivation(id: any, data: any) {
    return this.http.patch(`${this.apiUrl}/user-roles/${id}/status`, data);
  }

  //========assign user=============
  viewUserentryby(id: any) {
    const params = { entry_by: id };
    return this.http.get(`${this.apiUrl}/users`, { params });
  }


  //===========navigations=========
  addNaviGation(data: any) {
    return this.http.post(`${this.apiUrl}/navigations`, data);
  }

  allNavigations() {
    return this.http.get(`${this.apiUrl}/navigations`);
  }

  updateNav(id: any, data: any) {
    return this.http.put(`${this.apiUrl}/navigations/${id}`, data);
  }
  //assign nav
  searchAssignNav(role_id: any) {
    const params = { role_id: role_id };
    return this.http.get(`${this.apiUrl}/assignnavigations`, { params });
  }

  assignNav(data: any) {
    console.log(typeof data);
    return this.http.post(`${this.apiUrl}/assignnavigations`, data);
  }

  deleteAssignNav(id: any) {
    return this.http.delete(`${this.apiUrl}/assignnavigations/` + id)
  }


  //Ambulance register===========================
  allStates() {
    return this.http.get(`${this.apiUrl}/states`);
  }

  allDist(state_id: any) {
    const params = { state_id: state_id };
    return this.http.get(`${this.apiUrl}/districts`, { params });
  }

  addAmbulance(data:any) {
    return this.http.post(`${this.apiUrl}/ambulanceRegister`, data);
  }

  //patient details====
  getAllDetails(params?: any)
  {
    return this.http.get(`${this.apiUrl}/ambulanceRegistereddata`, { params });
  }
  addPatientDetails(data:any) {
    return this.http.put(`${this.apiUrl}/updatePatientData`, data);
  }

  getAlldepatmentsOrwise(id:any)
  {
    const params = { organization_id: id };
    return this.http.get(`${this.apiUrl}/departments`, { params });
  }
}



  