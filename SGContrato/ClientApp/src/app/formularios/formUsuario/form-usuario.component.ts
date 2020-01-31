import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
import { UserRol, Rol, User } from '../../model.component';
import { CatalogoService } from '../../catalogo/catalogo.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent {

  @Input() public tmpUserRol;
  userRol: UserRol;
  formGroup: FormGroup;
  roles: Array<Rol>;
  user: User;
  selection = new SelectionModel<Rol>(true, []);

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private catalogoService: CatalogoService) {

  }

  ngOnInit() {
    this.catalogoService.getRoles().subscribe(rolesDesdeWS => this.roles = rolesDesdeWS, error => console.error(error), () => this.llenarTabla());
    if (this.tmpUserRol == null)
      this.createForm();
    else
      this.loadForm();
  }

  llenarTabla() {
    console.log(this.roles);
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      userID: 21,
      txt_emailAlterno: ['', Validators.required],
      listaRoles: this.selection.selected
    });
  }

  private loadForm() {
    this.formGroup = this.formBuilder.group({
      userID: this.tmpUserRol.userID,
      rolId: this.tmpUserRol.rolID
    });
    console.log(this.formGroup.value);
  }

  submitForm() {
    console.log(this.selection.selected);
    this.formGroup.get('listaRoles').setValue(this.selection.selected);

    this.activeModal.close(this.formGroup.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}


