using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Oracle.EntityFrameworkCore.Metadata;

namespace SGContrato.Migrations
{
    public partial class createHistorialTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "historial",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    txt_accionHistorial = table.Column<string>(nullable: true),
                    dt_fechaAccion = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_historial", x => x.ID);
                    table.ForeignKey(
                        name: "FK_historial_contrato_contratoID",
                        column: x => x.contratoID,
                        principalTable: "contrato",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_historial_contratoID",
                table: "historial",
                column: "contratoID",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "historial");
        }
    }
}
