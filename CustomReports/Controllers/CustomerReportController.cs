using CustomReports.Data_Access;
using CustomReports.Models;
using CustomReports.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomReports.Controllers
{
    public class CustomerReportController : Controller
    {
        private CustomerReportRepository customerReportRepository;
        private ReportRepository reportRepository;
        private CustomerRepository customerRepository;
        public CustomerReportController()
        {
            customerReportRepository = new CustomerReportRepository();
            reportRepository = new ReportRepository();
            customerRepository = new CustomerRepository();
        }
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Add(int id)
        {
            var report = reportRepository.Get(id);
            var customerReportViewModel = new CustomerReportViewModel();
            customerReportViewModel.Report = report;
            customerReportViewModel.ReportId = report.Id;
            customerReportViewModel.Customers = customerRepository.GetAll().ToList();
            return View(customerReportViewModel);
        }

        [HttpPost]
        public ActionResult Add(CustomerReportViewModel customerReportViewModel)
        {
            if (ModelState.IsValid)
            {
                var customerReport = new CustomerReport();
                customerReport.ReportId = customerReportViewModel.ReportId;
                customerReport.CustomerId = customerReportViewModel.CustomerId;
                customerReport.CubeName = customerReportViewModel.CubeName;
                customerReport.ServerName = customerReportViewModel.ServerName;
                customerReport.DBName = customerReportViewModel.DBName;
                customerReport.DBType = customerReportViewModel.DBType;
                customerReportRepository.Add(customerReport);
                return RedirectToAction("Details", "Report", new { id = customerReportViewModel.ReportId });
            }
            return View(customerReportViewModel);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            var customerReport = customerReportRepository.Get(id);
            customerReportRepository.Remove(customerReport);
            return new EmptyResult();
        }
    }
}