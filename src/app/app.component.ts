import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  buttons:Array<any> =[
    {
      route: "/home",
      name: "Home",
      icon:"bi bi-house",
    },
    {
      route: "/products",
      name: "Products",
      icon:"bi bi-arrow-down",
    },
    {
      route: "/newProduct",
      name: "New Product",
      icon:"bi bi-plus-circle",
    }
  ];

  currentButton :any;


  setCurrentButton(button:any) {
      this.currentButton=button;
  }

}
