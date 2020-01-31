import { Component, Input,Output } from '@angular/core';
import { ContratosService } from '../contratos/contratos.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Contrato } from '../../model.component';

@Component({
    selector: 'app-datosGenerales',
    templateUrl: './datosGenerales.component.html',
    styleUrls: ['./datosGenerales.component.css']
})

export class DatosGeneralesComponent {

  public contrato: Contrato;

  constructor(private contratosService: ContratosService, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    let contrato: Contrato;
    this.contratosService.getContrato(this.contratosService.getIdContratoActivo()).subscribe(contratoDesdeWS => contrato = contratoDesdeWS, error => console.error(error), () => this.verContrato(contrato));
  }

  verContrato(contrato: Contrato) {
    this.contrato = contrato;
  }
  
}
