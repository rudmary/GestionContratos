using Microsoft.EntityFrameworkCore.Migrations;

namespace SGContrato.Migrations
{
    public partial class AgregoColumnasVencimiento : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "txt_nombreSeccion",
                table: "vencimientos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "txt_nombreTipo",
                table: "vencimientos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "txt_nombreSeccion",
                table: "vencimientos");

            migrationBuilder.DropColumn(
                name: "txt_nombreTipo",
                table: "vencimientos");
        }
    }
}
