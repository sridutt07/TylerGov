import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../Data/employee.service';
import { Employee } from '../../Models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnDestroy {
  employees: Employee[] = [];

  managerList: Employee[] = [];

  displayedColumns = ['id', 'firstName', 'lastName'];

  subscriptions: Subscription[] = [];

  constructor(private employeeData: EmployeeService) {
    this.subscriptions.push(
      employeeData.getAllEmployees().subscribe({
        next: (allEmployees: Employee[]) => {
          this.employees = allEmployees;
        },
        error: (response) => {
          console.log(response);
        },
      })
    );

    this.subscriptions.push(
      employeeData.getAllManagers().subscribe({
        next: (allMangers: Employee[]) => {
          this.managerList = allMangers;
        },
        error: (response) => {
          console.log(response);
        },
      })
    );
  }

  onMangerSelect(managerId: number) {
    this.subscriptions.push(
      this.employeeData.getEmpFromMangerId(managerId).subscribe({
        next: (allEmployees: Employee[]) => {
          this.employees = allEmployees;
        },
        error: (response) => {
          console.log(response);
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
