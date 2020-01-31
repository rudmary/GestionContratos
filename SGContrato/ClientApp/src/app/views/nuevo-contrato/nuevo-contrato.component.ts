import { Component, OnInit, Input } from '@angular/core';
import { Tipo, Contrato } from '../../model.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { ContratosService } from '../contratos/contratos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-contrato',
  templateUrl: './nuevo-contrato.component.html',
  styleUrls: ['./nuevo-contrato.component.css']
})
export class NuevoContratoComponent implements OnInit {
     
  @Input() tipoId: number;
  tiposContrato: Tipo;
  public progress: number;
  public message: string;
  formGroup: FormGroup;
  public contrato: Contrato;

  public proveedores;
  public unidades;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, public contratosService: ContratosService, public router: Router) {
    this.crearFormulario();
    this.contratosService.getTipoContrato('41').subscribe(tiposDesdeWS => this.tiposContrato = tiposDesdeWS, error => console.error(error));    
  }

  ngOnInit() {
    this.unidades =
    [
      {
        ID:"1",
        name: "FIEC",
        descripcion: "Unidad especializada en la compra de equipos tecnologicos",
        email: "fiec@espol.edu.ec"
      },
      {
        ID:"2",
        name: "FICT",
        descripcion: "Unidad especializada en la compra de equipos para excavacion",
        email: "fict@espol.edu.ec"
      }
    ];
    this.proveedores =
      [
        {
          ID:1,
          name: "Almacenes Juan Eljuri",
          ruc: 2978798798001
        },
        {
          ID:2,
          name: "Tu nombre",
          ruc: 2967686564562
        }
      ];
    
  }

  

  llenarTabla() {
    console.log('llego');
  }

  private crearFormulario() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      txt_codigoContrato: ['', Validators.required],
      qn_tipoContrato: [null, Validators.required],
      txt_numProceso: ['', Validators.required],
      qn_tipoProceso: [null, Validators.required],
      qn_vigenciaContrato: [null, Validators.required],
      dt_fechaSuscripcion: ['', Validators.required],
      dt_fechaInicio: ['', Validators.required],
      dt_fechaFin: ['', Validators.required],
      vm_montoAdjudicado: ['', Validators.required],
      bol_recurrencia: false,
      qn_proveedor: [null, Validators.required],
      txt_objetoContratacion: ['', Validators.required],
      qn_unidadConsolidadora: ['', Validators.required],
      txt_nombreDelegado: ['', Validators.required],
      txt_nombreAdministrador: ['', Validators.required],
      txt_nombreTecnicoExterno: ['', Validators.required],
      txt_detalleFormaPago: ['', Validators.required],
      txt_detalleGarantias: ['', Validators.required],
      txt_archivoContrato: ['', Validators.required],
      qn_estadoContrato: null,
      dt_fechaUltimoCambio: today
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
  
  onSubmit() {
    console.log(this.formGroup.value);
         
    //let path = this.formGroup.get("qn_unidadConsolidadora").value;
    //console.log(path);
    let path = this.formGroup.get("txt_archivoContrato").value.replace(/\\/g, "/");

    this.formGroup.get('txt_archivoContrato').setValue(path);
    this.formGroup.get('qn_proveedor').setValue("1");
    this.formGroup.get('qn_unidadConsolidadora').setValue("1");
    this.formGroup.get('qn_estadoContrato').setValue("1");
    console.log(this.formGroup.value);
    let contrato: Contrato = Object.assign({}, this.formGroup.value);
    this.registrar(contrato);   
  }

  registrar(contrato: Contrato) {
    this.contratosService.createContrato(contrato).subscribe(contratoDesdeWS => contrato = contratoDesdeWS, error => console.error(error), () => this.cargarDatos());
  }

  cargarDatos() {
    alert("Contrato ingresado exitosamente");
    this.formGroup.reset();
    this.router.navigate(['/contratos']);
  }

}





