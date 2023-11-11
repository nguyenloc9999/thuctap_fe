import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/interface/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment(comment: any): Observable<IComment> {
    return this.http.post<any>(`http://localhost:8000/api/comment`, comment)
  }
  removeComment(id: any): Observable<IComment> {
    return this.http.delete<IComment>(`http://localhost:8000/api/comment/${id}`)
  }
  getCommentById(id: any): Observable<IComment> {
    return this.http.get<IComment>(`http://localhost:8000/api/comment/${id}/detail`)
  }
  getCommentByProduct(productId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`http://localhost:8000/api/comment/${productId}`)
  }
  updateComment(comment: IComment): Observable<IComment> {
    return this.http.post<IComment>(`http://localhost:8000/api/comment/${comment._id}`, comment)
  }
  getAllComment(): Observable<IComment[]> {
    return this.http.get<IComment[]>(`http://localhost:8000/api/comment`)
  }
}
