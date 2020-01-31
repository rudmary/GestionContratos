import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contrato } from '../../model.component';
import { ContratosService } from '../contratos/contratos.service';

@Component({
    selector: 'app-vencimientos',
    templateUrl: './vencimientos.component.html',
    styleUrls: ['./vencimientos.component.css']
})
export class VencimientosComponent {

  public contratoGarantias: Contrato;
  public vencimientos: any[];
  constructor(public contratosService: ContratosService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.contratosService.getContrato(this.contratosService.getIdContratoActivo()).subscribe(contratoygarantias => this.contratoGarantias = contratoygarantias, error => console.error(error), () => this.llenarTabla());
  }

  llenarTabla() {
    
  }

}

interface vencimiento {

}
