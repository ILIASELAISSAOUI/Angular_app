import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrl: './edit-component.component.css'
})
export class EditComponent implements OnInit{
  productId:number=0;
  currentProduct!:Product;
  public editGroup!:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,private ps:ProductService,private fb:FormBuilder) {}

  ngOnInit(): void {
    this.productId=this.activatedRoute.snapshot.params['id'];
    this.ps.getProductById(this.productId).subscribe({
      next:(data)=>{
        this.currentProduct=data;
        this.editGroup=this.fb.group({
          nom:this.fb.control(this.currentProduct.nom,Validators.required),
          marque:this.fb.control(this.currentProduct.marque,Validators.required),
          modele:this.fb.control(this.currentProduct.modele,Validators.required),
          prix:this.fb.control(this.currentProduct.prix,Validators.required),
          disponible:this.fb.control(this.currentProduct.disponible,Validators.required)
        })
      },
      error:err=>{console.log(err)}
    })
  }

  updateProduct() {
      let product:Product =this.editGroup.value;
      this.ps.updateProduct(product,this.productId).subscribe({
        next:data=>{
          alert("Product "+ data.marque +" updated");
        },
        error:err=>{console.log(err)}
      })
  }


}
