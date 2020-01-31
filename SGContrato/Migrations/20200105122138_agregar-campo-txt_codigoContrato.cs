using Microsoft.EntityFrameworkCore.Migrations;

namespace SGContrato.Migrations
{
    public partial class agregarcampotxt_codigoContrato : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "txt_codigoContrato",
                table: "contrato",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "txt_codigoContrato",
                table: "contrato");
        }
    }
}
