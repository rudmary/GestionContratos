import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Contrato, Tipo } from '../../model.component';

@Injectable()
export class ContratosService {

  private apiURL = this.baseUrl + "api/Contrato";
  private apiURLTipo = this.baseUrl + "api/Tipo";

  private contratoId: string="";
  private contratoActivo: Contrato;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public getTipoContrato(seccionId): Observable<Tipo> {
    return this.http.get<Tipo>(this.apiURLTipo + '/' + seccionId);
  }

  // Metodo para traer una lista de contratos
  public getContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.apiURL);
  }

  // Metodo para traer un contrato
  public getContrato(contratoId: string): Observable<Contrato> {
    //let params = new HttpParams().set('incluirGarantias', "true");
    //return this.http.get<Contrato>(this.apiURL + '/' + contratoId, {params: params});
    return this.http.get<Contrato>(this.apiURL + '/' + contratoId);
  }

  // Metodo para crear un nuevo contrato
  createContrato(contrato: Contrato): Observable<Contrato> {
    return this.http.post<Contrato>(this.apiURL, contrato); 
  }

  // Metodo para modificar un contrato
  updateContrato(contrato: Contrato): Observable<Contrato> {
    console.table(contrato);
    console.log(contrato);
    //////alert(this.contratoId);
    return this.http.put<Contrato>(this.apiURL + '/' + this.contratoId, contrato);
  }

  // Metodo para borrar un contrato
  deleteContrato(contratoId: string): Observable<Contrato> {
    return this.http.delete<Contrato>(this.apiURL + '/' + contratoId);
  }

  // Metodo para setear el id del contrato activo
  public setContratoId(contratoId: string) {
      this.contratoId = contratoId;    
  }

  public getIdContratoActivo() {
    if (this.contratoId != "") {
      return this.contratoId;
    } else {
      return;
    }    
  }
}
