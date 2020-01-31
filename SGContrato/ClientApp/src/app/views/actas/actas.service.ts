import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipo, Acta, Contrato } from '../../model.component';
import { ContratosService } from '../contratos/contratos.service';

@Injectable({
  providedIn: 'root'
})
export class ActasService {

  private apiURL = this.baseUrl + "api/Acta";
  private apiURLTipo = this.baseUrl + "api/Tipo";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, public contratosService: ContratosService) {

  }

  // Metodo get para traer las garantias por contratoId
  public getActas(contratoId: string): Observable<Contrato> {
    return this.http.get<Contrato>(this.apiURL + '/' + contratoId);
  }

  // Metodo get para traer tipos de actas por seccionId
  public getTipoActa(seccionId): Observable<Tipo> {
    return this.http.get<Tipo>(this.apiURLTipo + '/' + seccionId);
  }

  // Metodo para modificar un contrato con sus actas
  updateContrato(contrato: Contrato): Observable<Contrato> {
    return this.http.put<Contrato>(this.apiURL + '/' + this.contratosService.getIdContratoActivo(), contrato);
  }

}
