import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
import { Tipo, Seccion } from '../../model.component';
import { CatalogoService } from '../../catalogo/catalogo.service';

@Component({
  selector: 'app-form-tipo',
  templateUrl: './form-tipo.component.html',
  styleUrls: ['./form-tipo.component.css']
})
export class FormTipoComponent {

  @Input() public tip;
  tipo: Tipo;
  formGroup: FormGroup;
  categorias: Array<Seccion>;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private catalogoService: CatalogoService) {

  }

  ngOnInit() {
    this.catalogoService.getSeccion().subscribe(categoriasDesdeWS => this.categorias = categoriasDesdeWS, error => console.error(error), () => this.llenarSelect());

    if (this.tip == null) {
      this.createForm();
    }
    else
      this.loadForm();
  }

  llenarSelect() {
    console.log(this.categorias);
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      tipoID: 0,
      txt_nombreTipo: ['', Validators.required],
      txt_detalleTipo: ['', Validators.required],
      seccionId: [0, Validators.required]
    });
  }

  private loadForm() {
    console.log(this.tip);
    this.formGroup = this.formBuilder.group({
      tipoID: this.tip.tipoID,
      txt_nombreTipo: this.tip.txt_nombreTipo,
      txt_detalleTipo: this.tip.txt_detalleTipo,
      seccionId: this.tip.seccionId
    });
    console.log(this.formGroup.value);
  }

  submitForm() {
    console.log(this.formGroup.value);
    this.activeModal.close(this.formGroup.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}




