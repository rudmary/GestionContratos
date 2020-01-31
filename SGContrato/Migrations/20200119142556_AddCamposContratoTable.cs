using Microsoft.EntityFrameworkCore.Migrations;

namespace SGContrato.Migrations
{
    public partial class AddCamposContratoTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "qn_estadoContrato",
                table: "contrato",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "txt_archivoContrato",
                table: "contrato",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "txt_detalleFormaPago",
                table: "contrato",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "txt_detalleGarantias",
                table: "contrato",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "qn_estadoContrato",
                table: "contrato");

            migrationBuilder.DropColumn(
                name: "txt_archivoContrato",
                table: "contrato");

            migrationBuilder.DropColumn(
                name: "txt_detalleFormaPago",
                table: "contrato");

            migrationBuilder.DropColumn(
                name: "txt_detalleGarantias",
                table: "contrato");
        }
    }
}
