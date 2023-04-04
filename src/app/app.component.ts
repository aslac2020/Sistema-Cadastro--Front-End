import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `<nav class='navbar navbar-expand navbar-light bg-light'>
    <a class="navbar-brand" style="margin-left: 20px; font-size: 25px; font-weight: bold">{{pageTitle}}</a>
    <ul class="nav nav-pills">
      <li><a class='nav-link' routerLink="/welcome">Home</a></li>
      <li><a class='nav-link' routerLink="/products">Product List</a></li>
      <li><a class='nav-link' routerLink="/register">Add Product</a></li>
    </ul>
  </nav>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {
  pageTitle = 'AJL EMBALAGENS';
}
