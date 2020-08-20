namespace CustomReports.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CustomerReport
    {
        public int Id { get; set; }

        public int ReportId { get; set; }

        public int CustomerId { get; set; }

        [Required]
        [StringLength(50)]
        public string CubeName { get; set; }

        [Required]
        [StringLength(50)]
        public string ServerName { get; set; }

        [Required]
        [StringLength(50)]
        public string DBName { get; set; }

        [Required]
        [StringLength(50)]
        public string DBType { get; set; }

        public virtual Customer Customer { get; set; }

        public virtual Report Report { get; set; }
    }
}
