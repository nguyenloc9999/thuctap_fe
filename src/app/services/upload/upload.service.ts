import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  AddImage(files: any[]): Observable<any> {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    } else {
      formData.append('images', files);
    }
    return this.http.post(`http://localhost:8000/api/images/upload`, formData);
  }
  updateImage(publicId: string, files: any[]): Observable<any> {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    } else {
      formData.append('images', files);
    }
    return this.http.put(`http://localhost:8000/api/images/${publicId}`, formData);
  }
}
