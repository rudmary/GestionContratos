

export interface User {
  ID: number;
  txt_username: string;
  txt_emailAlterno: string;
  txt_token?: string;
  userRol: UserRol[];
}

export interface Rol {
  ID: number;
  txt_rolName: string;
  txt_rolDetaile: string;
  userRol: UserRol[];
}

export interface UserRol {
  userID: number;
  rolID: number;
  user: User;
  rol: Rol;
}

export interface Solicitud {
  ID: number;
  qn_cantContratos: number;
  txt_motivoTransferencia: string;
  txt_admRecomendado: string;
  txt_destinatario: string;
  dt_fechaSolicitud
}

export interface Contrato {
  ID: number;
  txt_codigoContrato: string;
  qn_tipoContrato: number;
  txt_numProceso: string;
  qn_tipoProceso: number;
  qn_vigenciaContrato: number;
  dt_fechaSuscripcion: string;
  dt_fechaInicio: string;
  dt_fechaFin: string;
  vm_montoAdjudicado: number;
  bol_recurrencia: boolean;
  qn_proveedor: number;
  txt_objetoContratacion: string;
  qn_unidadConsolidadora: number;
  txt_nombreDelegado: string;
  txt_nombreAdministrador: string;
  txt_nombreTecnicoExterno: string;
  txt_detalleFormaPago: string;
  txt_detalleGarantias: string;
  txt_archivoContrato: string;
  qn_estadoContrato: number;
  dt_fechaUltimoCambio: string;
  garantias: Garantia[];
  formaPago: FormaPago;
  multas: Multa[];
  informes: Informe[];
  actas: Acta[];
  entregables: Entregable[];
  modificaciones: Modificacion[];
  historial: Historial[];
  vencimientos: Vencimiento[];
}

export interface Garantia {
  ID: number;
  qn_tipoGarantia: number;
  vm_valorGarantia: number;
  txt_codigoGarantia: string;
  txt_proveedorGarantia: string;
  dt_inicioGarantia: Date;
  dt_finGarantia: Date;
  txt_archivoGarantia: string;
  dt_fechaUltimoCambio: Date;
  contratoID: number;
}

export interface FormaPago {
  ID: number;
  qn_tipoPago: number;
  txt_archivoPago: string;
  dt_fechaUltimoCambio: Date;
  pagos: Pago[];
  contratoID: number;
}

export interface Pago {
  ID: number;
  qn_porcentajePago: number;
  vm_montoPago: number;
  dt_tentativaPago: Date;
  dt_realPago: Date;
  txt_comprobantePago: string;
  dt_fechaUltimoCambio: Date;
  formaPagoID: number;
}
export interface Multa {
  ID: number;
  qn_tipoMulta: number;
  vm_montoMulta: number;
  txt_motivoMulta: string;
  dt_fechaMulta: Date;
  dt_fechaUltimoCambio: Date;
  txt_codigoInforme: string;
  contratoID: number;
}

export interface Informe {
  ID: number;
  qn_tipoInforme: number;
  txt_codigoInforme: string;
  dt_fechaInforme: Date;
  txt_archivoInforme: string;
  dt_fechaUltimoCambio: Date;
  contratoID: number;
}

export interface Acta {
  ID: number;
  qn_tipoActa: number;
  txt_codigoActa: string;
  dt_fechaActa: Date;
  txt_archivoActa: string;
  dt_fechaUltimoCambio: Date;
  contratoID: number;
}

export interface Entregable {
  ID: number;
  qn_tipoEntregable: number;
  qn_cantidadEntregable: number;
  dt_fechaEntregable: Date;
  txt_archivoEntregable: string;
  txt_descripcionEntregable: string;
  dt_fechaUltimoCambio: Date;
  contratoID: number;
}

export interface Modificacion {
  ID: number;
  qn_tipoModificacion: number;
  txt_motivoModificacion: string;
  dt_fechaUltimoCambio: Date;
  valorModificado: valorModificado;
  fechaModificado: fechaModificado;
  contratoID: number;
}

export interface valorModificado {
  ID: number;
  vm_valorAnterior: number;
  vm_valorActual: number;
  modificacionID: number;
}

export interface fechaModificado {
  ID: number;
  dt_fechaAnterior: Date;
  dt_fechaActual: Date;
  modificacionID: number;
}

export interface Vencimiento {
  ID: number;
  txt_nombreSeccion: string;
  txt_nombreTipo: string;
  dt_fechaVencimiento: Date;
  qn_diasAnticipacion: number;
  qn_frecuenciaAnticipacion: number;
  dt_fechaUltimoCambio: Date;
  contratoID: number;
}

export interface Historial {
  ID: number;
  txt_accionHistorial: string;
  dt_fechaAccion: Date;
  contratoID: number;
}

export interface Tipo {
  tipoID: number;
  txt_nombreTipo: string;
  txt_detalleTipo: string;
  seccionId: number;
}

export interface Seccion {
  seccionID: number;
  txt_nombreSeccion: string;
  txt_detalleSeccion: string;
  tipos: Tipo[];
}
