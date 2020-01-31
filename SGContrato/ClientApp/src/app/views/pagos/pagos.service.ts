import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrato, FormaPago, Tipo } from '../../model.component';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private apiURL = this.baseUrl + "api/FormaPago";
  private apiURLTipo = this.baseUrl + "api/Tipo";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  // Metodo get para traer las garantias por contratoId
  public getFormaPago(contratoId: string): Observable<Contrato> {
    return this.http.get<Contrato>(this.apiURL + '/' + contratoId);
  }

  // Metodo get para traer las garantias por contratoId
  public getPago(formaPagoId: string): Observable<FormaPago> {
    return this.http.get<FormaPago>(this.apiURL + '/' + formaPagoId);
  }

  // Metodo get para traer tipos de actas por seccionId
  public getTipoActa(seccionId): Observable<Tipo> {
    return this.http.get<Tipo>(this.apiURLTipo + '/' + seccionId);
  }

}
