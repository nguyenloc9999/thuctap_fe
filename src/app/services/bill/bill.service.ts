import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBill } from 'src/app/interface/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(
    private http: HttpClient
  ) { }
  getAllBill(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/bill');
  }
  getBillId(id: string | number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/bill/${id}`);
  }
  addBill(bill: IBill): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/bill', bill);
  }
  updateBill(bill: IBill): Observable<IBill> {
    return this.http.patch<any>(`http://localhost:8000/api/bill/${bill._id}`, bill)
  }
}
