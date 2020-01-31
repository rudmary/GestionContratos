import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html',
  styleUrls: ['./form-solicitud.component.css']
})
export class FormSolicitudComponent implements OnInit {

  @Input() cantContratos: number;
  public formGroup: FormGroup;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {

  }


  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      qn_cantContratos: this.cantContratos,
      txt_motivoTransferencia: ['', Validators.required],
      txt_admRecomendado: ['', Validators.required],
      txt_destinatario: ['', Validators.required],
      dt_fechaSolicitud: today
    });
  }

  submitForm() {
    this.cantContratos = 0;
    this.activeModal.close(this.formGroup.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
