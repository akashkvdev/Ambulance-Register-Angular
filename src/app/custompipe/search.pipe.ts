import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'AmbulanceDetailsSearchPipe'
})
export class AmbulanceDetailsSearchPipe implements PipeTransform {
  transform(value: any[], args?: string): any[] {
    if (!value || !args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const patientName = item.patient?.patient_name?.toLowerCase() || '';
      const ambulanceNumber = item.ambulance?.ambulance_number?.toLowerCase() || '';

      return patientName.includes(searchValue) || ambulanceNumber.includes(searchValue);
    });
  }
}
