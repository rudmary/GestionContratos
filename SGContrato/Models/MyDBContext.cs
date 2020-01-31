using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SGContrato.Models;

namespace SGContrato.Models
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRol>().HasKey(x => new { x.userID, x.rolID });

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Contrato> contrato { get; set; }
        public DbSet<Garantia> garantia { get; set; }
        public DbSet<FormaPago> formaPago { get; set; }
        public DbSet<Pago> pago { get; set; }
        public DbSet<Multa> multa { get; set; }
        public DbSet<Informe> informe { get; set; }
        public DbSet<Acta_Entrega_Recepcion> acta { get; set; }
        public DbSet<Entregable> entregable { get; set; }
        public DbSet<Modificacion> modificacion { get; set; }
        public DbSet<ValorModificado> valorModificado { get; set; }
        public DbSet<FechaModificado> fechaModificado { get; set; }
        public DbSet<Vencimientos> vencimientos { get; set; }
        public DbSet<Seccion> Seccion { get; set; }
        public DbSet<Tipo> Tipo { get; set; }
        public DbSet<User> user { get; set; }
        public DbSet<Rol> rol { get; set; }
        public DbSet<UserRol> userRol { get; set; }
        public DbSet<Historial> historial { get; set; }

    }
}
