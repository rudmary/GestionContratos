import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrato } from '../../model.component';
import { ContratosService } from '../contratos/contratos.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private apiURL = this.baseUrl + "api/Historial";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, public contratosService: ContratosService) {

  }

  // Metodo get para traer las garantias por contratoId
  public getHistorial(contratoId: string): Observable<Contrato> {
    return this.http.get<Contrato>(this.apiURL + '/' + contratoId);
  }

  // Metodo para modificar un contrato con sus entregables
  updateContrato(contrato: Contrato): Observable<Contrato> {
    return this.http.put<Contrato>(this.apiURL + '/' + this.contratosService.getIdContratoActivo(), contrato);
  }
}
