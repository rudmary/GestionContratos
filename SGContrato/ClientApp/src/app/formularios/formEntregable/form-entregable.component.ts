import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../../views/contratos/contratos.service';
import { Tipo } from '../../model.component';
import { EntregablesService } from '../../views/entregables/entregables.service';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-form-entregable',
  templateUrl: './form-entregable.component.html'
})
export class FormEntregableComponent {
  @Input() tipoId: number;
  tiposEntregable: Tipo;
  public progress: number;
  public message: string;
  formGroup: FormGroup;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private fb: FormBuilder, public cs: ContratosService, public es: EntregablesService) {
    this.createForm();
    this.es.getTipoEntregable('6').subscribe(tiposDesdeWS => this.tiposEntregable = tiposDesdeWS, error => console.error(error));
  }

  private createForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      qn_tipoEntregable: [0, Validators.required],
      qn_cantidadEntregable: [0, Validators.required],
      dt_fechaEntregable: ['', Validators.required],
      txt_archivoEntregable: ['', Validators.required],
      txt_descripcionEntregable: ['', Validators.required],
      dt_fechaUltimoCambio: today,
      contratoID: this.cs.getIdContratoActivo()
    });
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }

  submitForm() {
    console.log(this.formGroup.value);
    this.activeModal.close(this.formGroup.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}




