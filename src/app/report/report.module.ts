import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { AmbulanceDetailReportComponent } from './ambulance-detail-report/ambulance-detail-report.component';
import { FormsModule } from '@angular/forms';
import { AmbulanceDetailsSearchPipe } from '../custompipe/search.pipe';


@NgModule({
  declarations: [
    AmbulanceDetailReportComponent,
    AmbulanceDetailsSearchPipe
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule
  ]
})
export class ReportModule { }
