import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Contrato, Tipo } from '../../model.component';
import { ContratosService } from '../contratos/contratos.service';
import { Router } from '@angular/router';
import { ActasService } from '../actas/actas.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  public contratos: Contrato[];
  public contratosFiltrados: Contrato[]=[];
  public formGroup: FormGroup;
  public tipoContrato: Tipo;
  public estado: Tipo;
  codContratoForm: FormControl = new FormControl('');
  adminContratoForm: FormControl = new FormControl('');
  codProcessForm: FormControl = new FormControl('');
  providerForm: FormControl = new FormControl('');

  constructor(private formBuilder: FormBuilder,private actasService: ActasService, private contratosService: ContratosService, private router: Router) { }

  ngOnInit() {

    this.createForm();
    this.actasService.getTipoActa('1').subscribe(tiposDesdeWS => this.tipoContrato = tiposDesdeWS, error => console.error(error));
    this.actasService.getTipoActa('21').subscribe(tiposDesdeWS => this.estado = tiposDesdeWS, error => console.error(error));
    this.contratosService.getContratos().subscribe(contratosDesdeWS => this.contratos = contratosDesdeWS, error => console.error(error));
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      codigoContrato: this.codContratoForm,
      adminContrato: this.adminContratoForm,
      estadoContrato: ['', Validators.required],
      codigoProceso: this.codProcessForm,
      proveedor: this.providerForm,
      tipoContrato: [''],
      fechaSubs1: ['', Validators.required],
      fechaSubs2: ['', Validators.required],
      fechaInicio1: ['', Validators.required],
      fechaInicio2: ['', Validators.required],
      fechaFin1: ['', Validators.required],
      fechaFin2: ['', Validators.required]
    });
  }

  submitForm() {
    console.log(this.formGroup.get('estadoContrato').value);
    this.filtrar();
  }

  mostrarDetalle(contratoId: string) {
    this.contratosService.setContratoId(contratoId);
    this.router.navigate(["/datosGenerales"]);
  }

  mostrarHistorial(contratoId: string) {
    this.contratosService.setContratoId(contratoId);
    this.router.navigate(["/historial"]);
  }

  filtrar() {
    if (this.formGroup.get('estadoContrato').value!= 0) {
      this.contratos.forEach(x => {
        if (x.qn_estadoContrato == this.formGroup.get('estadoContrato').value) {
          this.contratosFiltrados.push(x);
          console.log(this.contratosFiltrados);
        }

      });
    }
  }

}
