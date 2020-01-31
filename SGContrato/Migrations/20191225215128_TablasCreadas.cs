using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Oracle.EntityFrameworkCore.Metadata;

namespace SGContrato.Migrations
{
    public partial class TablasCreadas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "acta",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoActa = table.Column<int>(nullable: false),
                    txt_codigoActa = table.Column<string>(nullable: true),
                    dt_fechaActa = table.Column<DateTime>(nullable: false),
                    txt_archivoActa = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_acta", x => x.ID);
                    table.ForeignKey(
                        name: "FK_acta_contrato_contratoID",
                        column: x => x.contratoID,
                        principalTable: "contrato",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "entregable",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoEntregable = table.Column<int>(nullable: false),
                    qn_cantidadEntregable = table.Column<int>(nullable: false),
                    dt_fechaEntregable = table.Column<DateTime>(nullable: false),
                    txt_archivoEntregable = table.Column<string>(nullable: true),
                    txt_descripcionEntregable = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_entregable", x => x.ID);
                    table.ForeignKey(
                        name: "FK_entregable_contrato_contratoID",
                        column: x => x.contratoID,
                        principalTable: "contrato",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "formaPago",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoPago = table.Column<int>(nullable: false),
                    txt_archivoPago = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_formaPago", x => x.ID);
                    table.ForeignKey(
                        name: "FK_formaPago_contrato_contratoID",
                        column: x => x.contratoID,
                        principalTable: "contrato",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "garantia",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoGarantia = table.Column<int>(nullable: false),
                    vm_valorGarantia = table.Column<double>(nullable: false),
                    txt_codigoGarantia = table.Column<string>(nullable: true),
                    txt_proveedorGarantia = table.Column<string>(nullable: true),
                    dt_inicioGarantia = table.Column<DateTime>(nullable: false),
                    dt_finGarantia = table.Column<DateTime>(nullable: false),
                    txt_archivoGarantia = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_garantia", x => x.ID);
                    table.ForeignKey(
                        name: "FK_garantia_contrato_contratoID",
                        column: x => x.contratoID,
                        principalTable: "contrato",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "informe",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoInforme = table.Column<int>(nullable: false),
                    txt_codigoInforme = table.Column<string>(nullable: true),
                    dt_fechaInforme = table.Column<DateTime>(nullable: false),
                    txt_archivoInforme = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_informe", x => x.ID);
                    table.ForeignKey(
                        name: "FK_informe_contrato_contratoID",
                        column: x => x.contratoID,
                        principalTable: "contrato",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "modificacion",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoModificacion = table.Column<int>(nullable: false),
                    txt_motivoModificacion = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_modificacion", x => x.ID);
                    table.ForeignKey(
                        name: "FK_modificacion_contrato_contratoID",
                        column: x => x.contratoID,
                        principalTable: "contrato",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "multa",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoMulta = table.Column<int>(nullable: false),
                    vm_montoMulta = table.Column<double>(nullable: false),
                    txt_motivoMulta = table.Column<string>(nullable: true),
                    dt_fechaMulta = table.Column<DateTime>(nullable: false),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    txt_codigoInforme = table.Column<string>(nullable: true),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_multa", x => x.ID);
                    table.ForeignKey(
                        name: "FK_multa_contrato_contratoID",
                        column: x => x.contratoID,
                        principalTable: "contrato",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "vencimientos",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    dt_fechaVencimiento = table.Column<DateTime>(nullable: false),
                    qn_diasAnticipacion = table.Column<int>(nullable: false),
                    qn_frecuenciaAnticipacion = table.Column<int>(nullable: false),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vencimientos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_vencimientos_contrato_contratoID",
                        column: x => x.contratoID,
                        principalTable: "contrato",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pago",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_porcentajePago = table.Column<float>(nullable: false),
                    vm_montoPago = table.Column<double>(nullable: false),
                    dt_tentativaPago = table.Column<DateTime>(nullable: false),
                    dt_realPago = table.Column<DateTime>(nullable: false),
                    txt_comprobantePago = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    formaPagoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pago", x => x.ID);
                    table.ForeignKey(
                        name: "FK_pago_formaPago_formaPagoID",
                        column: x => x.formaPagoID,
                        principalTable: "formaPago",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "fechaModificado",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    dt_fechaAnterior = table.Column<DateTime>(nullable: false),
                    dt_fechaActual = table.Column<DateTime>(nullable: false),
                    modificacionID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_fechaModificado", x => x.ID);
                    table.ForeignKey(
                        name: "FK_fechaModificado_modificacion_modificacionID",
                        column: x => x.modificacionID,
                        principalTable: "modificacion",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "valorModificado",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    vm_valorAnterior = table.Column<double>(nullable: false),
                    vm_valorActual = table.Column<double>(nullable: false),
                    modificacionID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_valorModificado", x => x.ID);
                    table.ForeignKey(
                        name: "FK_valorModificado_modificacion_modificacionID",
                        column: x => x.modificacionID,
                        principalTable: "modificacion",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_acta_contratoID",
                table: "acta",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_entregable_contratoID",
                table: "entregable",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_fechaModificado_modificacionID",
                table: "fechaModificado",
                column: "modificacionID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_formaPago_contratoID",
                table: "formaPago",
                column: "contratoID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_garantia_contratoID",
                table: "garantia",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_informe_contratoID",
                table: "informe",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_modificacion_contratoID",
                table: "modificacion",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_multa_contratoID",
                table: "multa",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_pago_formaPagoID",
                table: "pago",
                column: "formaPagoID");

            migrationBuilder.CreateIndex(
                name: "IX_valorModificado_modificacionID",
                table: "valorModificado",
                column: "modificacionID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_vencimientos_contratoID",
                table: "vencimientos",
                column: "contratoID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "acta");

            migrationBuilder.DropTable(
                name: "entregable");

            migrationBuilder.DropTable(
                name: "fechaModificado");

            migrationBuilder.DropTable(
                name: "garantia");

            migrationBuilder.DropTable(
                name: "informe");

            migrationBuilder.DropTable(
                name: "multa");

            migrationBuilder.DropTable(
                name: "pago");

            migrationBuilder.DropTable(
                name: "valorModificado");

            migrationBuilder.DropTable(
                name: "vencimientos");

            migrationBuilder.DropTable(
                name: "formaPago");

            migrationBuilder.DropTable(
                name: "modificacion");
        }
    }
}
