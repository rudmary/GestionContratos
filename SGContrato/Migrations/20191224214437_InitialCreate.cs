using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Oracle.EntityFrameworkCore.Metadata;

namespace SGContrato.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "contrato",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoContrato = table.Column<int>(nullable: false),
                    txt_numProceso = table.Column<string>(nullable: true),
                    qn_tipoProceso = table.Column<int>(nullable: false),
                    qn_vigenciaContrato = table.Column<int>(nullable: false),
                    dt_fechaSuscripcion = table.Column<DateTime>(nullable: false),
                    dt_fechaInicio = table.Column<DateTime>(nullable: false),
                    dt_fechaFin = table.Column<DateTime>(nullable: false),
                    vm_montoAdjudicado = table.Column<double>(nullable: false),
                    bol_recurrencia = table.Column<bool>(nullable: false),
                    qn_proveedor = table.Column<int>(nullable: false),
                    txt_objetoContratacion = table.Column<string>(nullable: true),
                    qn_unidadConsolidadora = table.Column<int>(nullable: false),
                    txt_nombreDelegado = table.Column<string>(nullable: true),
                    txt_nombreAdministrador = table.Column<string>(nullable: true),
                    txt_nombreTecnicoExterno = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_contrato", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Seccion",
                columns: table => new
                {
                    seccionID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    txt_nombreSeccion = table.Column<string>(nullable: true),
                    txt_detalleSeccion = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seccion", x => x.seccionID);
                });

            migrationBuilder.CreateTable(
                name: "Tipo",
                columns: table => new
                {
                    tipoID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    txt_nombreTipo = table.Column<string>(nullable: true),
                    txt_detalleTipo = table.Column<string>(nullable: true),
                    seccionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tipo", x => x.tipoID);
                    table.ForeignKey(
                        name: "FK_Tipo_Seccion_seccionId",
                        column: x => x.seccionId,
                        principalTable: "Seccion",
                        principalColumn: "seccionID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tipo_seccionId",
                table: "Tipo",
                column: "seccionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "contrato");

            migrationBuilder.DropTable(
                name: "Tipo");

            migrationBuilder.DropTable(
                name: "Seccion");
        }
    }
}
