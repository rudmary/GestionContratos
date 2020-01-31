import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActasService } from './actas.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Acta, Tipo, Contrato } from '../../model.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../contratos/contratos.service';
import { FormActaComponent } from '../../formularios/formActa/form-acta.component';

@Component({
    selector: 'app-actas',
    templateUrl: './actas.component.html',
    styleUrls: ['./actas.component.css']
})
export class ActasComponent {

  public contrato: Contrato;
  public actas: Acta[];
  public tiposActa: Tipo;
  public nuevaActa: Acta;

  constructor(public modalService: NgbModal, public contratosService: ContratosService, private actasService: ActasService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.cargarDatos();
    //this.actasService.getActas('1').subscribe(garantiasDesdeWS => this.garantias = garantiasDesdeWS, error => console.error(error));
    //this.actasService.getTipoActa('8').subscribe(tiposDesdeWS => this.tiposActa = tiposDesdeWS, error => console.error(error));
  }

  public cargarDatos() {
    this.actasService.getActas(this.contratosService.getIdContratoActivo()).subscribe(contratoConActasDesdeWS => this.contrato = contratoConActasDesdeWS, error => console.error(error), () => this.llenartabla());
  }

  public llenartabla() {
    this.actas = this.contrato.actas;
  }

  openFormModal() {
    const modalRef = this.modalService.open(FormActaComponent);
    modalRef.componentInstance.id = 2; // should be the id

    modalRef.result.then((result) => {
      this.nuevaActa = result;
      this.insertar();
    }).catch((error) => {
      console.log(error);
    });
  }

  insertar() {
    this.nuevaActa.txt_archivoActa = this.nuevaActa.txt_archivoActa.replace(/\\/g, "/");
    this.contrato.actas.push(this.nuevaActa);
    this.actasService.updateContrato(this.contrato).subscribe(contratoDesdeWS => this.contrato = contratoDesdeWS, error => console.error(error), () => this.cargarDatos());
  }
  
}




