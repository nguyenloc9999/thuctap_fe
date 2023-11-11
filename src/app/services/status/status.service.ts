import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStatus } from 'src/app/interface/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }
  getAllStatus(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(`http://localhost:8000/api/status`)
  }
  getStatusById(id: string | number): Observable<IStatus> {
    return this.http.get<IStatus>(`http://localhost:8000/api/status/${id}`)
  }
  addStatus(status: IStatus): Observable<IStatus> {
    return this.http.post<IStatus>('http://localhost:8000/api/status', status)
  }
  updateStatus(status: IStatus): Observable<IStatus> {
    return this.http.patch<IStatus>(`http://localhost:8000/api/products/${status._id}`, status)
  }
}
