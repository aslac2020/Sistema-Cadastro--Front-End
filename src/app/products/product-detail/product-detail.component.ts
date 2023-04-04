import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "../product";
import {ProductService} from "../product.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  productModel : IProduct | any;
  width: number = 150;
  heigth: number = 150;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    console.log(id)
    this.pageTitle += ` ${id} `
    this.getProductById(id);

  }

  getProductById(productId: number){
    const allProducts = this.productService.getProductById(productId).subscribe( {
      next: (data) => {
        this.productModel = data
      }
    })
  }

  onBack(): void {
    this.router.navigate(['/products'])
  }

}
