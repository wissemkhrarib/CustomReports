namespace CustomReports.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Bloc
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Bloc()
        {
            Dimensions = new HashSet<Dimension>();
            Series_Measures = new HashSet<Series_Measures>();
        }

        public int Id { get; set; }

        public int ReportId { get; set; }

        [StringLength(50)]
        public string Type { get; set; }

        public int X { get; set; }

        public int Y { get; set; }

        public int W { get; set; }

        public int H { get; set; }

        [StringLength(50)]
        public string Title { get; set; }

        [StringLength(50)]
        public string HeaderColor { get; set; }

        public virtual Report Report { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Dimension> Dimensions { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Series_Measures> Series_Measures { get; set; }
    }
}
