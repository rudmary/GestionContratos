import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contrato, FormaPago, Pago } from '../../model.component';
import { ContratosService } from '../contratos/contratos.service';
import { PagosService } from './pagos.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pagos',
    templateUrl: './pagos.component.html',
    styleUrls: ['./pagos.component.css']
})
export class PagosComponent {

  public contrato: Contrato;
  public formaPago: FormaPago;
  public pagos: Pago[];
  //public tiposActa: Tipo;

  constructor(public contratosService: ContratosService, private pagosService: PagosService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.cargarPagos();
    //this.actasService.getActas('1').subscribe(garantiasDesdeWS => this.garantias = garantiasDesdeWS, error => console.error(error));
    //this.actasService.getTipoActa('8').subscribe(tiposDesdeWS => this.tiposActa = tiposDesdeWS, error => console.error(error));
  }

  public cargarPagos() {
    this.pagosService.getFormaPago(this.contratosService.getIdContratoActivo()).subscribe(contratoConFormaPagoDesdeWS => this.contrato = contratoConFormaPagoDesdeWS, error => console.error(error), () => this.llenarTabla());
  }

  public llenarTabla() {
    this.formaPago = this.contrato.formaPago;
  }
}

