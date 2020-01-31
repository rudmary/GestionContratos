import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformesService } from './informes.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Contrato, Informe, Tipo } from '../../model.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../contratos/contratos.service';
import { FormInformeComponent } from '../../formularios/formInforme/form-informe.component';

@Component({
    selector: 'app-informes',
    templateUrl: './informes.component.html',
    styleUrls: ['./informes.component.css']
})
export class InformesComponent {
  public contrato: Contrato;
  public informes: Informe[];
  public tiposInforme: Tipo;
  public nuevoInforme: Informe;
  
  constructor(public modalService: NgbModal, private contratosService: ContratosService, private informesService: InformesService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.cargarDatos();    
  }

  cargarDatos() {
    this.informesService.getInformes(this.contratosService.getIdContratoActivo()).subscribe(contratoConInformesDesdeWS => this.contrato = contratoConInformesDesdeWS, error => console.error(error), () => this.llenarTabla());
  }

  llenarTabla() {
    this.informes = this.contrato.informes;
  }

  openFormModal() {
    const modalRef = this.modalService.open(FormInformeComponent);
    modalRef.componentInstance.id = 2; // should be the id

    modalRef.result.then((result) => {
      this.nuevoInforme = result;
      this.insertar();
    }).catch((error) => {
      console.log(error);
    });
  }

  insertar() {
    this.nuevoInforme.txt_archivoInforme = this.nuevoInforme.txt_archivoInforme.replace(/\\/g, "/");
    this.contrato.informes.push(this.nuevoInforme);
    this.informesService.updateContrato(this.contrato).subscribe(contratoDesdeWS => this.contrato = contratoDesdeWS, error => console.error(error), () => this.cargarDatos());
  }

}


