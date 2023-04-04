import { Injectable } from '@angular/core';
import {AlertComponent} from "./alert.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

export enum AlertTypes {
  DANGER = 'danger',
  SUCESS = 'success'
}
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes){
    const bsModalRef: BsModalRef = this.modalService.show(AlertComponent);
    bsModalRef.content.type = type
    bsModalRef.content.message = message;
  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER)
  }

  showAlertSucess(message: string){
    this.showAlert(message, AlertTypes.SUCESS)
  }
}
