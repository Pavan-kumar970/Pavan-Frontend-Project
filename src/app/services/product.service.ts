import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:5000/api/auth/products'; // ✅ Change to match backend

  constructor(private http: HttpClient) {}

  // ✅ Fetch products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ✅ Get product by ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

 
  // ✅ Create a product
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }


  // ✅ Update a product
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // ✅ Delete a product
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
