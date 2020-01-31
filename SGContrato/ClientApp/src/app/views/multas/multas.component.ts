import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MultasService } from './multas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contrato, Multa, Tipo } from '../../model.component';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../contratos/contratos.service';
import { FormMultaComponent } from '../../formularios/formMulta/form-multa.component';

@Component({
    selector: 'app-multas',
    templateUrl: './multas.component.html',
    styleUrls: ['./multas.component.css']
})


export class MultasComponent {

  public contrato: Contrato;
  public multas: Multa[];
  public nuevaMulta: Multa;
  public formGroup: FormGroup;
  tiposMulta: any;

  constructor(private contratosService: ContratosService, public activeModal: NgbActiveModal, private modalService: NgbModal, private multasService: MultasService, private fb: FormBuilder, private router: Router) {  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.multasService.getMultas(this.contratosService.getIdContratoActivo()).subscribe(contratoConMultasDesdeWS => this.contrato = contratoConMultasDesdeWS, error => console.error(error), () => this.llenarTabla());
  }

  llenarTabla() {
    this.multas = this.contrato.multas;
  }

  openFormModal() {
    const modalRef = this.modalService.open(FormMultaComponent);
    modalRef.componentInstance.id = 2; // should be the id

    modalRef.result.then((result) => {
      this.nuevaMulta = result;
      this.insertar();
    }).catch((error) => {
      console.log(error);
    });
  }

  insertar() {
    this.contrato.multas.push(this.nuevaMulta);
    this.multasService.updateContrato(this.contrato).subscribe(contratoDesdeWS => this.contrato = contratoDesdeWS, error => console.error(error), () => this.cargarDatos());
  }

  update(multa: Multa) {
    const modalRef = this.modalService.open(FormMultaComponent);
    modalRef.componentInstance.multa = multa; // se podra enviar un objeto?????????

    modalRef.result.then((result) => {
      this.nuevaMulta = result;
      this.insertar();
    }).catch((error) => {
      console.log(error);
    });
  }

  seeDetail() {

  }

  //formulario reactivo para una nueva Multa
  private multasForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.fb.group({
      ID: '0',
      qn_tipoMulta: ['0', Validators.required],
      vm_montoMulta: ['', Validators.required],
      txt_motivoMulta: ['', Validators.required],
      dt_fechaMulta: ['', Validators.required],
      dt_fechaUltimoCambio: today,
      txt_codigoInforme: ['', Validators.required],
      contratoID: this.contratosService.getIdContratoActivo()
    });
  }
}


