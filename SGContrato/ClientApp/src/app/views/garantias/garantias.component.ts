import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { GarantiasService } from '../garantias/garantias.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContratosService } from '../contratos/contratos.service';
import { Contrato, Garantia, Tipo } from '../../model.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGarantiaComponent } from '../../formularios/formGarantia/form-garantia.component';

@Component({
    selector: 'app-garantias',
    templateUrl: './garantias.component.html',
    styleUrls: ['./garantias.component.css']
})
export class GarantiasComponent implements OnInit {

  public garantias: Array<Garantia>;
  public formGroup: FormGroup;
  public nuevaGarantia: Garantia;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private http: HttpClient, private contratosService: ContratosService, private garantiasService: GarantiasService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {

    this.cargarDatos();
    this.garantiaForm();
  }

  cargarDatos() {
    this.garantiasService.getGarantias(this.contratosService.getIdContratoActivo()).subscribe(garantiasDesdeWS => this.garantias = garantiasDesdeWS, error => console.error(error));
  }

  //formulario reactivo para una nueva Garantia
  private garantiaForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.fb.group({
      ID: 0,
      qn_tipoGarantia: [0, Validators.required],
      vm_valorGarantia: [0, Validators.required],
      txt_codigoGarantia: ['', Validators.required],
      txt_proveedorGarantia: ['', Validators.required],
      dt_inicioGarantia: ['', Validators.required],
      dt_finGarantia: ['', Validators.required],
      txt_archivoGarantia: ['', Validators.required],
      dt_fechaUltimoCambio: today,
      contratoID: this.contratosService.getIdContratoActivo()
    });
  }

  openFormModal() {
    const modalRef = this.modalService.open(FormGarantiaComponent);
    modalRef.componentInstance.id = 2; // should be the id

    modalRef.result.then((result) => {
      this.nuevaGarantia = result;
      this.registrar();
    }).catch((error) => {
      console.log(error);
    });
  }

  public registrar() {
    let contrato: Contrato;                                                                                                                                         //  ()  permite esperar hasta que se cargue el contrato
    this.contratosService.getContrato(this.contratosService.getIdContratoActivo()).subscribe(contratoDesdeWS => contrato = contratoDesdeWS, error => console.error(error), () => this.registarGarantia(contrato));
  }

  public registarGarantia(contrato) {
    let garantia: Garantia = this.nuevaGarantia;
    let path = garantia.txt_archivoGarantia.replace(/\\/g, "/");
    garantia.txt_archivoGarantia = path;
    contrato.garantias.push(garantia);
    this.contratosService.updateContrato(contrato).subscribe(contratoDesdeWS => contrato = contratoDesdeWS, error=> console.error(error), () => this.cargarDatos());
  }
}

