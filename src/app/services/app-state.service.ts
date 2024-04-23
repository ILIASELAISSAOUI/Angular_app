import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  productState: any ={
    motCle:"",
    size:3,
    page:0,
    totalPages:0,
    totalProducts:0,
    productChecked:0,
    products:Array<Product>
  }

  // public setProductState(state:any){
  //   this.productState=(...this.productState,...state);
  // }
  constructor() { }
}
