import {Component, OnDestroy, OnInit} from "@angular/core";
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertService} from "../shared/alert/alert.service";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = ''
  sub!: Subscription ;

  isExistsProducts: boolean = false;

  onNotify(message: string): void {
  }

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value)
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];



  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.getProducts()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLowerCase().includes(filterBy))
  }

  OnRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message
  }

  getProducts() {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.isExistsProducts = true;
        this.filteredProducts = this.products
        console.log(this.filteredProducts)
      },
      error: (error) => {
        this.errorMessage = error;
        this.isExistsProducts = false;
      }
    })

  }

  navigateDetail(id: number) {
    this.productService.getProductById(id).subscribe({
      next:(result) => {
        this.router.navigate(['/products', id])
      },
      error: err => this.errorMessage = err
    })
  }

  navigateEdit(id: number) {
    this.productService.getProductById(id).subscribe({
      next:(result) => {
        this.router.navigate(['/edit', id])
      },
      error: err => this.errorMessage = err
    })
  }

  navigateCreate() {
      this.router.navigate(['register'])
  }

  deleteProduct(id: number){
    console.log(id)
    this.productService.deleteProduct(id).subscribe({
      next: (result) => {
       alert('cai aqui')
      }, error: (err) => {
        this.alertService.showAlertSucess("Produto excluido com sucesso :)")
        this.getProducts();
      }
    })
  }
}
