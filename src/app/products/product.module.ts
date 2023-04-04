import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from "./product-list.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ConvertToSpacesPipe} from "../shared/convert-to-spaces.pipe";
import {RouterModule} from "@angular/router";
import {ProductDetailGuard} from "./product-detail.guard";
import {SharedModule} from '../shared/shared.module';
import {ProductCreateComponent} from "./product-create/product-create.component";
import { ProductEditComponent } from './product-edit/product-edit.component';
import {ProductEditGuard} from "./product-edit/product-edit.guard";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductCreateComponent,
    ConvertToSpacesPipe,
    ProductEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
      {
        path: 'edit/:id',
        canActivate: [ProductEditGuard],
        component: ProductEditComponent
      },
      { path: 'register', component: ProductCreateComponent }
    ]),
    SharedModule,
  ]
})
export class ProductModule {
}
