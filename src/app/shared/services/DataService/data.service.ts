import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { DetailEmployee } from '../../models/employee.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService{
  constructor(private httpClient : HttpClient) { }
  urlEmployeeData : string = 'http://localhost:3000/employees';


  getAllData(column: string, order: string, page : number, pageSize : number){
    const sort = order === 'default' || order === '' ? "" : (order === 'asc' ? `_sort=${column}&` :`_sort=-${column}&`);
    return this.httpClient.get(this.urlEmployeeData+"?"+sort+"_page="+page)
  }

  getEmployee(id : string | null) : Observable<any> {
    return this.httpClient.get(this.urlEmployeeData+'?id='+id);
   }

  updateEmployee(data : DetailEmployee) : Observable<any> {
    return this.httpClient.put(this.urlEmployeeData+"/"+data.id, data);
  }

  addEmployee(data : DetailEmployee) : Observable<any>{
    return this.httpClient.post(this.urlEmployeeData, data);
  }

  deleteEmployee(id : string){
    return this.httpClient.delete(this.urlEmployeeData+"/"+id);
  }

}
