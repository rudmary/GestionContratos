import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Garantia, Tipo } from '../../model.component';

@Injectable({
  providedIn: 'root'
})

export class GarantiasService {

  private apiURL = this.baseUrl + "api/Garantia";
  private apiURLTipo = this.baseUrl + "api/Tipo";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  // Metodo get para traer las garantias por contratoId
  public getGarantias(contratoId: string): Observable<Array<Garantia>> {
    return this.http.get<Array<Garantia>>(this.apiURL + '/' + contratoId);
  }

  // Metodo get para traer tipos de garantias por seccionId
  public getTipoGarantia(seccionId): Observable<Tipo> {
    return this.http.get<Tipo>(this.apiURLTipo + '/' + seccionId);
  }

  // Metodo post para insertar nueva garantia
  public postGarantia(garantia: Garantia): Observable<Garantia>{
    return this.http.post<Garantia>(this.apiURL, garantia);
  }


}




