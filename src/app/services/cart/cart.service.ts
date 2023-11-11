import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icart, InputCart } from 'src/app/interface/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }
  getCart(userId: string): Observable<any> {
    return this.http.get<Icart>(`http://localhost:8000/api/cart/${userId}`)
  }
  addToCart(data: InputCart, userId: string): Observable<any> {
    return this.http.post(`http://localhost:8000/api/cart/${userId}`, data)
  }
  removeProductInCart(userId: string, productId: string): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/cart/${userId}?idProduct=${productId}`)
  }
  changeQuantity(data: InputCart, userId: string, productId: string): Observable<any> {
    return this.http.patch(`http://localhost:8000/api/cart/${userId}?idProduct=${productId}`, data)
  }
}
