import { Component, OnInit } from '@angular/core';
import { Tipo } from '../../model.component';
import { CatalogoService } from '../catalogo.service';
import { FormTipoComponent } from '../../formularios/formTipo/form-tipo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tipo-categoria',
  templateUrl: './tipo-categoria.component.html',
  styleUrls: ['./tipo-categoria.component.css']
})
export class TipoCategoriaComponent implements OnInit {

  public tipos: Array<Tipo>;
  public nuevoTipo: Tipo;
  public editTipo: Tipo;

  //valores spinners
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  showSpinner = true;

  constructor(public modalService: NgbModal, public catalogoService: CatalogoService, private toastr: ToastrService) { }

  ngOnInit() {
    this.cargarDatos()
  }

  cargarDatos() {
    this.catalogoService.getTipo().subscribe(tiposDesdeWS => this.tipos = tiposDesdeWS, error => console.error(error), () => this.llenarTabla());
  }

  llenarTabla() {
    console.log(this.tipos);
  }

  openFormModal() {
    const modalRef = this.modalService.open(FormTipoComponent);
    modalRef.componentInstance.tip = null; // should be the id
    modalRef.result.then((result) => {
      this.nuevoTipo = result;
      this.insertar();
    }).catch((error) => {
      console.log(error);
    });
  }

  insertar() {
    console.log(this.nuevoTipo);
    let tipo;
    this.catalogoService.insertTipo(this.nuevoTipo).subscribe(tipoDesdeWS => tipo = tipoDesdeWS, error => this.showError(), () => this.showSuccess("¡Ingreso de dato exitoso!!"));
  }

  editar() {
    let categoria;
    this.catalogoService.updateTipo(this.editTipo).subscribe(tipoDesdeWS => categoria = tipoDesdeWS, error => this.showError(), () => this.showSuccess("¡Actualizacion de dato exitoso!!"));
  }

  editarTipo(tipo: Tipo) {
    console.log(tipo);
    const modalRef = this.modalService.open(FormTipoComponent);
    modalRef.componentInstance.tip = tipo; // should be the id
    modalRef.result.then((result) => {
      this.editTipo = result;
      console.log(this.editTipo);
      this.editar();
    }).catch((error) => {
      console.log(error);
    });
  }

  // Metodo para decirle al usuario que todo salio correcto
  showSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Success!');
    this.cargarDatos();
  }

  showError() {
    this.toastr.error('A ocurrido un error en el servidor!', 'Error!');
  }
}

