import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../../views/contratos/contratos.service';
import { Tipo } from '../../model.component';
import { GarantiasService } from '../../views/garantias/garantias.service';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-form-garantia',
  templateUrl: './form-garantia.component.html'
})
export class FormGarantiaComponent {
  @Input() tipoId: number;
  tiposGarantia: Tipo;
  public progress: number;
  public message: string;

  formGroup: FormGroup;
  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private fb: FormBuilder, public cs: ContratosService, public gs: GarantiasService) {
    this.crearFormulario();
    this.gs.getTipoGarantia('2').subscribe(tiposDesdeWS => this.tiposGarantia = tiposDesdeWS, error => console.error(error));
  }

  private crearFormulario() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      qn_tipoGarantia: [0, Validators.required],
      vm_valorGarantia: [0, Validators.required],
      txt_codigoGarantia: ['', Validators.required],
      txt_proveedorGarantia: ['', Validators.required],
      dt_inicioGarantia: ['', Validators.required],
      dt_finGarantia: ['', Validators.required],
      txt_archivoGarantia: ['', Validators.required],
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
    this.activeModal.close(this.formGroup.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}




