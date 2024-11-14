import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/services/myservice.service';

@Component({
  selector: 'app-ambulance-detail-report',
  templateUrl: './ambulance-detail-report.component.html',
  styleUrls: ['./ambulance-detail-report.component.css']
})
export class AmbulanceDetailReportComponent implements OnInit {
  fromDate: Date | null = null;
  toDate: Date | null = null;
  fromTime: string | null = null;
  toTime: string | null = null;
  allAmbulanceDatas: any[] = []; // Array to hold ambulance data
 organization_id:any
  constructor(private service: MyserviceService) {}

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('user_id');
    const org_id = localStorage.getItem('organization_id');
    this.organization_id = org_id;
 
    this.getAmbulanceReport();
  }
  SearchData:any;
  applyFilter() {
    // Prepare the date and time range objects based on input values
    const dateRange = this.fromDate && this.toDate ? { start: this.fromDate, end: this.toDate } : undefined;
    const timeRange = this.fromTime && this.toTime ? { start: this.fromTime, end: this.toTime } : undefined;

    // Call getAmbulanceReport with dateRange and timeRange if they are set
    this.getAmbulanceReport(dateRange, timeRange);
  }

  getAmbulanceReport(dateRange?: { start: Date, end: Date }, timeRange?: { start: string, end: string }) {
    const params: any = {};

    // Add date and time filters to params if provided
    if (dateRange) {
      params.from_date = dateRange.start;
      params.to_date = dateRange.end;
    }

    if (timeRange) {
      params.fromTime = timeRange.start;
      params.toTime = timeRange.end;
    }

    // Call the service to fetch filtered data
    this.service.getAllDetails(params).subscribe((res: any) => {
      console.log(res);
      this.allAmbulanceDatas = res.data; // Store the response data
    });
  }

  // Method to calculate total payment
 getTotalPayment(): number {
  return this.allAmbulanceDatas.reduce((total, ambulanceData) => {
    const paymentAmount = ambulanceData.payments?.payment_amount;
    return total + (paymentAmount ? Number(paymentAmount) : 0);
  }, 0);
}



openPrintWindow(): void {
  // Get the content of the print section
  const printSection = document.getElementById('printSection')?.innerHTML;

  // Create a new window
  const printWindow = window.open('', '_blank', 'width=800,height=600');

  // Write the HTML content into the new window
  printWindow?.document.write(`
    <html>
      <head>
        <title>Print Ambulance Data</title>
        <style>
          /* Add your custom CSS styles for print here */
          body {
            font-family: Arial, sans-serif;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
          }
          .table th, .table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          .fw-bold {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h2>Ambulance Data Report</h2>
        <div class="table-responsive">
          ${printSection}
        </div>
      </body>
    </html>
  `);

  // Wait for the content to load, then trigger the print
  printWindow?.document.close();
  printWindow?.print();
}
}