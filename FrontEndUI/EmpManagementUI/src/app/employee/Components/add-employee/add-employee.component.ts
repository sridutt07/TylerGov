import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../Data/employee.service';
import { Employee } from '../../Models/employee.model';
import { Role } from '../../Models/role.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnDestroy {
  managerList: Employee[] = [];

  rolesList: Role[] = [];

  subscriptions: Subscription[] = [];

  employeeForm: FormGroup = this.fb.group({
    managerEmployeeId: [null],
    employeeId: ['', Validators.required],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    roleIds: [[], Validators.required],
    isManager: false,
  });

  constructor(
    private fb: FormBuilder,
    private employeeData: EmployeeService,
    private router: Router
  ) {
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

    this.subscriptions.push(
      employeeData.getAllRoles().subscribe({
        next: (allRoles: Role[]) => {
          this.rolesList = allRoles;
        },
        error: (response) => {
          console.log(response);
        },
      })
    );
  }

  addEmployee() {
    if (this.employeeForm.valid) {
      this.subscriptions.push(
        this.employeeData.createEmployee(this.employeeForm.value).subscribe({
          next: (res: Employee) => {
            this.router.navigateByUrl('');
          },
          error: (response) => {
            console.log(response);
          },
        })
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
