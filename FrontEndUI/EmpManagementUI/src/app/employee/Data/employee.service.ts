import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from '../Models/employee.model';
import { Role } from '../Models/role.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //No environments file in cli ver 15.0.1 
  baseApi:string = "http://localhost:5245/api/Employees/";

  constructor(private http:HttpClient) { }

  getAllEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseApi + "GetAllEmployees");
  }

  getAllManagers() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseApi + "GetAllManagers");
  }

  getEmpFromMangerId(managerId:number) : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseApi + "GetEmpFromMangerId",{params:{managerId:managerId}});
  }

  getAllRoles() : Observable<Role[]>{
    return this.http.get<Role[]>(this.baseApi + "GetAllRoles");
  }

  createEmployee(newEmployee:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.baseApi + "AddEmployee",newEmployee)
  } 

}
