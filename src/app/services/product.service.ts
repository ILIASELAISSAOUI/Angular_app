import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  public getPage(page:number,size:number):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:8089/products?_page=${page}&_limit=${size}`)

  }
  public getProducts():Observable<Array<Product>>{
     return this.http.get<Array<Product>>("http://localhost:8089/products")
  }

  public checkProduct(produit :Product):Observable<any>{
    return this.http.patch<Product>(`http://localhost:8089/products/${produit.id}`,{disponible:!produit.disponible})
  }

  public deleteProduct(produit:Product):Observable<any>{
    return this.http.delete(`http://localhost:8089/products/${produit.id}`)
  }

  public saveProduct(product:Product):Observable<Product>{
    return this.http.post<Product>("http://localhost:8089/products",product)
  }


  public getProductById(productId: number):Observable<Product>{
    return this.http.get<Product>(`http://localhost:8089/products/${productId}`)
  }

  public updateProduct(product:Product,id:number):Observable<Product>{
    return this.http.put<Product>(`http://localhost:8089/products/${id}`,product)
  }
}
