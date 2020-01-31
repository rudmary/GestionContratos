import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seccion, Tipo, Rol, UserRol } from '../model.component';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private apiURLSeccion = this.baseUrl + "api/Seccion";
  private apiURLTipo = this.baseUrl + "api/Tipo";
  private apiURLUserRol = this.baseUrl + "api/UserRol";
  private apiURLRol = this.baseUrl + "api/Rol";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  // Seccion
  public getSeccion(): Observable<Array<Seccion>> {
    return this.http.get<Array<Seccion>>(this.apiURLSeccion);
  }

  insertSeccion(seccion: Seccion) {
    return this.http.post<Seccion>(this.apiURLSeccion, seccion);
  }

  updateSeccion(seccion: Seccion): Observable<Seccion> {
    return this.http.put<Seccion>(this.apiURLSeccion + '/' + seccion.seccionID, seccion);
  }


  // Tipos
  public getTipo(): Observable<Array<Tipo>> {
    return this.http.get<Array<Tipo>>(this.apiURLTipo);
  }

  insertTipo(tipo:Tipo) {
    return this.http.post<Tipo>(this.apiURLTipo, tipo);
  }

  updateTipo(tipo: Tipo): Observable<Tipo> {
    return this.http.put<Tipo>(this.apiURLTipo + '/' + tipo.tipoID, tipo);
  }

  // Usuario
  public getUserRol(): Observable<Array<UserRol>> {
    return this.http.get<Array<UserRol>>(this.apiURLUserRol);
  }

  insertUserRol(userRol: UserRol) {
    return this.http.post<UserRol>(this.apiURLUserRol, userRol);
  }

  updateUserRol(userRol: UserRol): Observable<UserRol> {
    return this.http.put<UserRol>(this.apiURLUserRol + '/' + userRol.userID, userRol);
  }

  // Roles
  public getRoles(): Observable<Array<Rol>> {
    return this.http.get<Array<Rol>>(this.apiURLRol);
  }

  insertRol(rol: Rol) {
    return this.http.post<Rol>(this.apiURLRol, rol);
  }

  updateRol(rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(this.apiURLRol + '/' + rol.ID, rol);
  }



}
