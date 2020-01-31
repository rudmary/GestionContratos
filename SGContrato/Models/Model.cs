using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGContrato.Models
{
    public class User
    {
        public int ID { get; set; }
        public string txt_username { get; set; }
        public string txt_emailAlterno { get; set; }
        public string txt_token { get; set; }
        public List<UserRol> userRol { get; set; }
    }
    public class Rol
    {
        public int ID { get; set; }
        public string txt_rolName { get; set; }
        public string txt_rolDetaile { get; set; }
        public List<UserRol> userRol { get; set; }

    }
    public class UserRol
    {
        public int userID { get; set; }
        public int rolID { get; set; }
        public User user { get; set; }
        public Rol rol { get; set; }
    }
    public class Contrato
    {
        public int ID { get; set; }
        public string txt_codigoContrato { get; set; }
        public int qn_tipoContrato { get; set; }
        public string txt_numProceso { get; set; }
        public int qn_tipoProceso { get; set; }
        public int qn_vigenciaContrato { get; set; }
        public DateTime dt_fechaSuscripcion { get; set; }
        public DateTime dt_fechaInicio { get; set; }
        public DateTime dt_fechaFin { get; set; }
        public double vm_montoAdjudicado { get; set; }
        public bool bol_recurrencia { get; set; }
        public int qn_proveedor { get; set; }
        public string txt_objetoContratacion { get; set; }
        public int qn_unidadConsolidadora { get; set; }
        public string txt_nombreDelegado { get; set; }
        public string txt_nombreAdministrador { get; set; }
        public string txt_nombreTecnicoExterno { get; set; }
        public string txt_detalleFormaPago { get; set; }
        public string txt_detalleGarantias { get; set; }
        public string txt_archivoContrato { get; set; }
        public int qn_estadoContrato { get; set; }
        public DateTime dt_fechaUltimoCambio { get; set; }
        public List<Garantia> garantias { get; set; }
        public FormaPago formaPago { get; set; }
        public List<Historial> historial { get; set; }
        public List<Multa> multas { get; set; }
        public List<Informe> informes { get; set; }
        public List<Acta_Entrega_Recepcion> actas { get; set; }
        public List<Entregable> entregables { get; set; }
        public List<Modificacion> modificaciones { get; set; }
        public List<Vencimientos> vencimientos { get; set; }

    }

    public class Garantia
    {
        public int ID { get; set; }
        public int qn_tipoGarantia { get; set; }
        public Double vm_valorGarantia { get; set; }
        public string txt_codigoGarantia { get; set; }
        public string txt_proveedorGarantia { get; set; }
        public DateTime dt_inicioGarantia { get; set; }
        public DateTime dt_finGarantia { get; set; }
        public string txt_archivoGarantia { get; set; }
        public DateTime dt_fechaUltimoCambio { get; set; }
        public int contratoID { get; set; }
    }

    public class FormaPago
    {
        public int ID { get; set; }
        public int qn_tipoPago { get; set; }
        public string txt_archivoPago { get; set; }
        public DateTime dt_fechaUltimoCambio { get; set; }
        public List<Pago> pagos { get; set; }
        public int contratoID { get; set; }
    }

    public class Pago
    {
        public int ID { get; set; }
        public float qn_porcentajePago { get; set; }
        public Double vm_montoPago { get; set; }
        public DateTime dt_tentativaPago { get; set; }
        public DateTime dt_realPago { get; set; }
        public string txt_comprobantePago { get; set; }
        public DateTime dt_fechaUltimoCambio { get; set; }
        public int formaPagoID { get; set; }
    }

    public class Multa
    {
        public int ID { get; set; }
        public int qn_tipoMulta { get; set; }
        public Double vm_montoMulta { get; set; }
        public string txt_motivoMulta { get; set; }
        public DateTime dt_fechaMulta { get; set; }
        public DateTime dt_fechaUltimoCambio { get; set; }
        public string txt_codigoInforme { get; set; }
        public int contratoID { get; set; }
    }

    public class Informe
    {
        public int ID { get; set; }
        public int qn_tipoInforme { get; set; }
        public string txt_codigoInforme { get; set; }
        public DateTime dt_fechaInforme { get; set; }
        public string txt_archivoInforme { get; set; }
        public DateTime dt_fechaUltimoCambio { get; set; }
        public int contratoID { get; set; }
    }

    public class Acta_Entrega_Recepcion
    {
        public int ID { get; set; }
        public int qn_tipoActa { get; set; }
        public string txt_codigoActa { get; set; }
        public DateTime dt_fechaActa { get; set; }
        public string txt_archivoActa { get; set; }
        public DateTime dt_fechaUltimoCambio { get; set; }
        public int contratoID { get; set; }
    }

    public class Entregable
    {
        public int ID { get; set; }
        public int qn_tipoEntregable { get; set; }
        public int qn_cantidadEntregable { get; set; }
        public DateTime dt_fechaEntregable { get; set; }
        public string txt_archivoEntregable { get; set; }
        public string txt_descripcionEntregable { get; set; }
        public DateTime dt_fechaUltimoCambio { get; set; }
        public int contratoID { get; set; }
    }

    public class Modificacion
    {
        public int ID { get; set; }
        public int qn_tipoModificacion { get; set; }
        public string txt_motivoModificacion { get; set; }
        public DateTime dt_fechaUltimoCambio { get; set; }
        public ValorModificado valorModificado { get; set; }
        public FechaModificado fechaModificado { get; set; }
        public int contratoID { get; set; }
    }

    public class ValorModificado
    {
        public int ID { get; set; }
        public Double vm_valorAnterior { get; set; }
        public Double vm_valorActual { get; set; }
        public int modificacionID { get; set; }
    }

    public class FechaModificado
    {
        public int ID { get; set; }
        public DateTime dt_fechaAnterior { get; set; }
        public DateTime dt_fechaActual { get; set; }
        public int modificacionID { get; set; }
    }

    public class Vencimientos
    {
        public int ID { get; set; }
        public string txt_nombreSeccion { get; set; }
        public string txt_nombreTipo { get; set; }
        public DateTime dt_fechaVencimiento { get; set; }
        public int qn_diasAnticipacion { get; set; }
        public int qn_frecuenciaAnticipacion { get; set; }
        public DateTime dt_fechaUltimoCambio { get; set; }
        public int contratoID { get; set; }

    }

    public class Tipo
    {
        public int tipoID { get; set; }
        public string txt_nombreTipo { get; set; }
        public string txt_detalleTipo { get; set; }
        public int seccionId { get; set; }

    }

    public class Seccion
    {
        public int seccionID { get; set; }
        public string txt_nombreSeccion { get; set; }
        public string txt_detalleSeccion { get; set; }
        public IList<Tipo> tipos { get; set; }

    }

    public class Historial
    {
        public int ID { get; set; }
        public string txt_accionHistorial { get; set; }
        public DateTime dt_fechaAccion { get; set; }
        public int contratoID { get; set; }
    }
}
