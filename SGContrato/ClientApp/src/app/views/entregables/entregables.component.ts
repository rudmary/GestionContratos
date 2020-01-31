import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntregablesService } from './entregables.service';
import { ContratosService } from '../contratos/contratos.service';
import { GarantiasService } from '../garantias/garantias.service';
import { Contrato, Entregable, Tipo, Garantia } from '../../model.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormEntregableComponent } from '../../formularios/formEntregable/form-entregable.component';

@Component({
    selector: 'app-entregables',
    templateUrl: './entregables.component.html',
    styleUrls: ['./entregables.component.css']
})
export class EntregablesComponent {

  public contrato: Contrato;
  public entregables: Entregable[];
  public nuevoEntregable: Entregable;
  public formGroup: FormGroup;
  tiposEntregable: any;

  constructor(private garantiasService: GarantiasService, private modalService: NgbModal, private contratosService: ContratosService, private entregablesService: EntregablesService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.entregablesService.getEntregables(this.contratosService.getIdContratoActivo()).subscribe(contratoConEntregablesDesdeWS => this.contrato = contratoConEntregablesDesdeWS, error => console.error(error), () => this.llenarTabla());
  }

  llenarTabla() {
    this.entregables = this.contrato.entregables;
  }

  openFormModal() {
    const modalRef = this.modalService.open(FormEntregableComponent);
    modalRef.componentInstance.id = 2; // should be the id

    modalRef.result.then((result) => {
      this.nuevoEntregable = result;
      this.insertar();
    }).catch((error) => {
      console.log(error);
    });
  }

  insertar() {
    this.nuevoEntregable.txt_archivoEntregable = this.nuevoEntregable.txt_archivoEntregable.replace(/\\/g, "/");
    this.contrato.entregables.push(this.nuevoEntregable);
    this.entregablesService.updateContrato(this.contrato).subscribe(contratoDesdeWS => this.contrato = contratoDesdeWS, error => console.error(error), () => this.cargarDatos());
  }

  //formulario reactivo
  private buildForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.fb.group({
      ID: '0',
      qn_tipoEntregable: ['0', Validators.required],
      qn_cantidadEntregable: ['0', Validators.required],
      dt_fechaEntregable: ['', Validators.required],
      txt_archivoEntregable: ['', Validators.required],
      txt_descripcionEntregable: ['', Validators.required],
      dt_fechaUltimoCambio: today,
      contratoID: '0'
    });
  }

}




