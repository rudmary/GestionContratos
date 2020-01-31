import { Component, OnInit } from '@angular/core';
import { Historial, Contrato } from '../../model.component';
import { ContratosService } from '../contratos/contratos.service';
import { HistorialService } from '../historial/historial.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  public historial: Historial[];
  public contrato: Contrato;

  //valores spinners
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  showSpinner = true;

  constructor(public historialService: HistorialService, private contratosService: ContratosService) { }

  ngOnInit() {
    let historial;
    this.historialService.getHistorial(this.contratosService.getIdContratoActivo()).subscribe(historialDesdeWS => historial = historialDesdeWS, error => console.error(error), () => this.cargarDatos(historial));
  }
  cargarDatos(contrato: Contrato) {
    this.historial = contrato.historial;
    this.contrato = contrato;
    console.log(this.contrato);
  }

}
