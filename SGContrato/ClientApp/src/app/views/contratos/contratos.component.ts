import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Event, Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';


import { Contrato } from '../../model.component';
import { ContratosService } from './contratos.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  contratos: Contrato[];

  contratoId: string;
  valor_filtro = '';
  showLoadingIndicator = true;

  @Output() contratoActivo = new EventEmitter<string>();

  constructor(private contratosService: ContratosService, private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {

      if (RouterEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (RouterEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }      
    });
  }

  ngOnInit() {
    this.filtro.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrarContrato(value));
    this.contratosService.setContratoId('0');
    this.contratosService.getContratos().subscribe(contratosDesdeWS => this.contratos = contratosDesdeWS, error => console.error(error));
  }

  mostrarDetalle(contratoId: string) {
    this.contratosService.setContratoId(contratoId);
    this.router.navigate(["/datosGenerales"]);
  }

  filtro = new FormControl('')

  //@Output('filtro') filtroEmitter = new EventEmitter<string>();

  filtrarContrato(value: string) {
    this.valor_filtro = value
  }

}



/////////////////////////*************************************************************************
