using CustomReports.Data_Access;
using CustomReports.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomReports.Controllers
{
    [Authorize]
    public class ReportController : Controller
    {
        private ReportRepository reportRepository;

        public ReportController()
        {
            reportRepository = new ReportRepository();
        }
     
        // GET: Report
        public ActionResult Index()
        {
            var reports = reportRepository.GetAll();
            return View(reports);
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(Report report)
        {
            if (ModelState.IsValid)
            {
                reportRepository.Add(report);
                return RedirectToAction("Index", "Report");
            }
            return View(report);
        }


        [HttpGet]
        public ActionResult Details(int id)
        {
            var report = reportRepository.Get(id);
            return View(report);
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            var report = reportRepository.Get(id);
            return View(report);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            var report = reportRepository.Get(id);
            reportRepository.Remove(report);
            return new EmptyResult();
        }

    }
}