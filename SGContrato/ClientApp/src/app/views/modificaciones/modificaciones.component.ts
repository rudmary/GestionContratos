import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modificacion } from '../../model.component';

@Component({
    selector: 'app-modificaciones',
    templateUrl: './modificaciones.component.html',
    styleUrls: ['./modificaciones.component.css']
})
export class ModificacionesComponent {
  public modificaciones: Array<Modificacion>;



}

