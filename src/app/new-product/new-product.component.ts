import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {AppStateService} from "../services/app-state.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  public productFrm!: FormGroup;

  product:Array<Product>=this.appState.productState.products;

  constructor(private fb:FormBuilder,private ps:ProductService,private appState:AppStateService) {}

  ngOnInit(): void {
    this.productFrm=this.fb.group({
      name:this.fb.control(''),
      marque:this.fb.control(''),
      modele:this.fb.control(''),
      prix:this.fb.control(0),
      disponible:this.fb.control(true)
    })
  }

  saveProduct() {
      this.ps.saveProduct(this.productFrm.value).subscribe({
        next:data=>{
          alert("Product "+ data.marque +" saved");
        },
      })
  }
}
