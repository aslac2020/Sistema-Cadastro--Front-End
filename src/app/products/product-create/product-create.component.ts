import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IProduct} from "../product";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AlertComponent} from "../../shared/alert/alert.component";
import {AlertService} from "../../shared/alert/alert.service";

@Component({
  selector: 'pm-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  bsModalRef?: BsModalRef;
  formCreateProduct!: FormGroup
  errorMessage: string = ''
  constructor(
    private builder: FormBuilder,
    private productService: ProductService,
    private modalService: BsModalService,

    private alertModalService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createFormIsBlank();
  }

  createFormIsBlank(){
    this.formCreateProduct = this.builder.group({
      productName: ["", Validators.required],
      productCode: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required]
    })
  }

  saveProduct() {
    const product = this.formCreateProduct.getRawValue() as IProduct;
    this.productService.saveProduct(product).subscribe( {
      next: (data) => {
        this.alertModalService.showAlertSucess("Produto cadastrado com sucesso :)")
        this.formCreateProduct.reset();
        this.router.navigate(['products'])
      },
      error: (err) => {
        console.log(err)
        this.alertModalService.showAlertDanger("Erro ao cadastrar produto :(, favor verificar e cadastrar novamente")
      }
    })
  }

  onBack() {
    this.router.navigate(['products'])
  }



  onSucess(){
    this.bsModalRef = this.modalService.show(AlertComponent);
    this.bsModalRef.content.type = 'sucess';
    this.bsModalRef.content.message = "Produto cadastrado com sucesso :)"

  }

}
