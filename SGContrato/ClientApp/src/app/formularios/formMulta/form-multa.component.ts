import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../../views/contratos/contratos.service';
import { Tipo } from '../../model.component';
import { MultasService } from '../../views/multas/multas.service';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-form-multa',
  templateUrl: './form-multa.component.html'
})
export class FormMultaComponent {
  @Input() tipoId: number;
  tiposMulta: Tipo;
  public progress: number;
  public message: string;
  formGroup: FormGroup;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private fb: FormBuilder, public cs: ContratosService, public ms: MultasService) {
    this.createForm();
    this.ms.getTipoMulta('4').subscribe(tiposDesdeWS => this.tiposMulta = tiposDesdeWS, error => console.error(error));
  }

  private createForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      qn_tipoMulta: [0, Validators.required],
      vm_montoMulta: [0, Validators.required],
      txt_codigoInforme: ['', Validators.required],
      txt_motivoMulta: ['', Validators.required],
      dt_fechaMulta: ['', Validators.required],
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




