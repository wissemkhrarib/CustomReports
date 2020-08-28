namespace CustomReports.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ReportsDbContext : DbContext
    {
        public ReportsDbContext()
            : base("name=ReportsDbContext")
        {
        }

        public virtual DbSet<Bloc> Blocs { get; set; }
        public virtual DbSet<CustomerFilter> CustomerFilters { get; set; }
        public virtual DbSet<CustomerReport> CustomerReports { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Dimension> Dimensions { get; set; }
        public virtual DbSet<Filter> Filters { get; set; }
        public virtual DbSet<Report> Reports { get; set; }
        public virtual DbSet<Series_Measures> Series_Measures { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bloc>()
                .Property(e => e.Type)
                .IsUnicode(false);

            modelBuilder.Entity<CustomerReport>()
                .Property(e => e.CubeName)
                .IsUnicode(false);

            modelBuilder.Entity<CustomerReport>()
                .Property(e => e.ServerName)
                .IsUnicode(false);

            modelBuilder.Entity<CustomerReport>()
                .Property(e => e.DBName)
                .IsUnicode(false);

            modelBuilder.Entity<CustomerReport>()
                .Property(e => e.DBType)
                .IsUnicode(false);

            modelBuilder.Entity<Dimension>()
                .Property(e => e.FieldName)
                .IsUnicode(false);

            modelBuilder.Entity<Dimension>()
                .Property(e => e.Alias)
                .IsUnicode(false);

            modelBuilder.Entity<Filter>()
                .Property(e => e.FilterName)
                .IsUnicode(false);

            modelBuilder.Entity<Filter>()
                .Property(e => e.Type)
                .IsUnicode(false);

            modelBuilder.Entity<Filter>()
                .Property(e => e.Field)
                .IsUnicode(false);

            modelBuilder.Entity<Filter>()
                .Property(e => e.Value)
                .IsUnicode(false);

            modelBuilder.Entity<Filter>()
                .Property(e => e.QueryStringKey)
                .IsUnicode(false);

            modelBuilder.Entity<Report>()
                .Property(e => e.ReportName)
                .IsFixedLength();

            modelBuilder.Entity<Report>()
                .Property(e => e.CubeName)
                .IsFixedLength();

            modelBuilder.Entity<Series_Measures>()
                .Property(e => e.Type)
                .IsUnicode(false);

            modelBuilder.Entity<Series_Measures>()
                .Property(e => e.FieldName)
                .IsUnicode(false);

            modelBuilder.Entity<Series_Measures>()
                .Property(e => e.Alias)
                .IsUnicode(false);
        }
    }
}
