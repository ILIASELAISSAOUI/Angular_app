import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private ps:ProductService,private router:Router,public appState:AppStateService) {
  }

  ngOnInit(): void {
        this.appState.productState.productChecked=0;
        this.getPage()
        this.getTotalPages()
    }

  onChange() {
    if (this.appState.productState.motCle != "") {
      this.appState.productState.products = this.appState.productState.products.filter((p:Product) => p.nom.includes(this.appState.productState.motCle))
    }else {
      this.ngOnInit()
    }
  }

  getPage(){
    this.ps.getPage(this.appState.productState.page,this.appState.productState.size).subscribe({
      next:data=>{
        this.appState.productState.products=data;
      },
      error:err=>{console.log(err)}
    })
  }

  getTotalPages() {
    this.ps.getProducts().subscribe({
      next:data => {
        this.appState.productState.totalProducts=data.length;
        for (let i = 0; i < data.length; i++) {
          if(data[i].disponible){
            this.appState.productState.productChecked++
          }
        }
        if(data.length%this.appState.productState.size!=0){
          this.appState.productState.totalPages=(data.length/this.appState.productState.size)+1;
        }
        else {
          this.appState.productState.totalPages=data.length/this.appState.productState.size;
        }
      },
      error:err => {console.log(err)}
    })
  }
  handleCheckButton(produit:Product) {
      this.ps.checkProduct(produit)
      .subscribe({
      next:updatedProduct=>{
        this.appState.productState.products.map((p:Product)=>{
          if (p.id==produit.id){
              return updatedProduct
          }
        })
      }
    })
    produit.disponible=!produit.disponible
    if (produit.disponible) {
      this.appState.productState.productChecked++
    }else {
      this.appState.productState.productChecked--
    }
  }

  handleDeleteProduct(produit: Product) {
    if(confirm("Are you sure you want to delete this product?")){
      this.ps.deleteProduct(produit)
        .subscribe({
          next:()=>{
            this.appState.productState.products=this.appState.productState.products.filter((p:Product)=>p.id!=produit.id)
          }
        })
    }
  }


  handleCurrentPage(page: number) {
    this.appState.productState.page=page;
    this.getPage()
  }

  handleUpdate(produit: Product) {
    this.router.navigate(["/editProduct",produit.id])
  }
}
