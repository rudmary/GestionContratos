import { Component, OnInit } from '@angular/core';
import { UserRol } from '../../model.component';
import { CatalogoService } from '../catalogo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormUsuarioComponent } from '../../formularios/formUsuario/form-usuario.component';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})


export class UsuarioComponent implements OnInit {

  public usuarios: Array<UserRol>;
  public nuevoUserRol: UserRol;
  public editUserRol: UserRol;

  //valores spinners
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  showSpinner = true;

  constructor(private catalogoService: CatalogoService, public modalService: NgbModal) {

  }

  ngOnInit() {
    this.catalogoService.getUserRol().subscribe(usuariosDesdeWS => this.usuarios = usuariosDesdeWS, error => console.error(error), () => this.cargarDatos());
  }

  cargarDatos() {
    console.log(this.usuarios);
  }

  openFormModal() {
    const modalRef = this.modalService.open(FormUsuarioComponent);
    modalRef.componentInstance.tmpUserRol = null; // should be the id
    modalRef.result.then((result) => {
      console.log(result);
      //result.listaRoles.forEach(x => {
      //  const userRol: UserRol = {
      //    userID: result.userID,
      //    rolID: x.id
      //  };
      //  console.log(userRol);
      //  this.insertar(userRol);
      //});
      //this.nuevoUserRol = result;
      //this.insertar();
    }).catch((error) => {
      console.log(error);
    });
  }

  insertar(userRol: UserRol) {
    console.log(userRol);
    this.catalogoService.insertUserRol(userRol).subscribe(userRolDesdeWS => userRol = userRolDesdeWS, error => console.error(error), () => this.cargarDatos());
  }

  editar() {
    let userRol;
    this.catalogoService.updateUserRol(this.editUserRol).subscribe(userRolDesdeWS => userRol = userRolDesdeWS, error => console.error(error), () => this.cargarDatos());
  }

  editarCategoria(userRol: UserRol) {
    const modalRef = this.modalService.open(FormUsuarioComponent);
    modalRef.componentInstance.tmpUserRol = userRol; // should be the id
    modalRef.result.then((result) => {
      this.editUserRol = result;
      console.log(this.editUserRol);
      this.editar();
    }).catch((error) => {
      console.log(error);
    });
  }

}





