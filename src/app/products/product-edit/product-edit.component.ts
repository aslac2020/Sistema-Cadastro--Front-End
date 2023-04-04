import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "../product";
import {ProductService} from "../product.service";
import {AlertService} from "../../shared/alert/alert.service";

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{

  FormEditProduct!: FormGroup
  id: number = 0;

  productModel!: IProduct;

  constructor(
    private builder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,

    private alertService: AlertService,

    private productService: ProductService
    ) {   this.createFormIsBlank();
  }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params["id"];
    this.getProductById(this.id)
  }
  createFormIsBlank(){
    this.FormEditProduct = this.builder.group({
      productName: ["", Validators.required],
      productCode: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required]
    })
  }

  fillForm(product: IProduct){
    this.FormEditProduct.setValue({
      productName: product.productName,
      productCode: product.productCode,
      description: product.description,
      price: product.price
    })
  }

  getProductById(id: number){
    this.productService.getProductById(id).subscribe({
      next: (data) => {
       if(data != null){
         this.productModel = data;
         this.fillForm(data)
       }
      }, error: error => console.log(error)
    })
  }

  updateProduct() {
    const productForm = this.FormEditProduct.getRawValue() as IProduct;
    this.productService.updateProduct(this.id,productForm).subscribe({
      next: (data) => {
        this.alertService.showAlertSucess("Produto atualizado com sucesso :)")
        this.FormEditProduct.reset();
       this.router.navigate(['/products'])
      }, error: (err) => {
        this.alertService.showAlertDanger("Erro ao atualizar o produto")
      }
    })
  }

  onBack() {
    this.router.navigate(['/products'])
  }
}
