using CustomReports.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CustomReports.ViewModels
{
    public class CustomerReportViewModel
    {
        [Required]
        public int ReportId { get; set; }
        public Report Report { get; set; }
        public List<Customer> Customers { get; set; }
        [Required]
        [Display(Name = "Customer")]
        public int CustomerId { get; set; }

        [Required]
        [Display(Name = "Cube Name")]
        public string CubeName { get; set; }

        [Required]
        [Display(Name = "Server Name")]
        public string ServerName { get; set; }

        [Required]
        [Display(Name = "DB Name")]
        public string DBName { get; set; }

        [Required]
        [Display(Name = "DB Type")]
        public string DBType { get; set; }

    }
}