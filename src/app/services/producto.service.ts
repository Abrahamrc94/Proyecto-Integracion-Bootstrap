
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private infoEndP = 'http://localhost:8080/api/producto';

  constructor( private http: HttpClient) { }

  GetAllProducts(): Observable<any> {
    return this.http.get(this.infoEndP);
  }

  createProduct(producto: any): Observable<any>{
    producto.id = "";
    let json = JSON.stringify(producto);
    return this.http.post(this.infoEndP, producto);
  }

  modificarProducto(producto: any): Observable<any>{
    let id = producto.id;
    let json = JSON.stringify(producto);
    return this.http.put(this.infoEndP + `/${id}`, producto);
  }

}