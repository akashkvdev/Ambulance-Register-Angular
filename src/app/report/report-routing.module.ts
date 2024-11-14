import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbulanceDetailReportComponent } from './ambulance-detail-report/ambulance-detail-report.component';

const routes: Routes = [
  {path:'ambulance-details-report',component:AmbulanceDetailReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
