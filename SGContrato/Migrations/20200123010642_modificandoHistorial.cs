using Microsoft.EntityFrameworkCore.Migrations;

namespace SGContrato.Migrations
{
    public partial class modificandoHistorial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_historial_contratoID",
                table: "historial");

            migrationBuilder.CreateIndex(
                name: "IX_historial_contratoID",
                table: "historial",
                column: "contratoID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_historial_contratoID",
                table: "historial");

            migrationBuilder.CreateIndex(
                name: "IX_historial_contratoID",
                table: "historial",
                column: "contratoID",
                unique: true);
        }
    }
}
