import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contrato, Tipo } from '../../model.component';
import { ContratosService } from '../contratos/contratos.service';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  private apiURL = this.baseUrl + "api/Informe";
  private apiURLTipo = this.baseUrl + "api/Tipo";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, public contratosService: ContratosService) {

  }

  // Metodo get para traer las garantias por contratoId
  public getInformes(contratoId: string): Observable<Contrato> {
    return this.http.get<Contrato>(this.apiURL + '/' + contratoId);
  }

  public getTipoInforme(seccionId): Observable<Tipo> {
    return this.http.get<Tipo>(this.apiURLTipo + '/' + seccionId);
  }

  // Metodo para modificar un contrato con sus entregables
  updateContrato(contrato: Contrato): Observable<Contrato> {
    return this.http.put<Contrato>(this.apiURL + '/' + this.contratosService.getIdContratoActivo(), contrato);
  }

}
