using CustomReports.Data_Access;
using CustomReports.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomReports.Controllers
{
    [Authorize]
    public class ReportController : Controller
    {
        private ReportRepository reportRepository;
        private PageRepository pageRepository;

        public ReportController()
        {
            reportRepository = new ReportRepository();
            pageRepository = new PageRepository();
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
        [HttpGet]
        public JsonResult AddPage(int id)
        {
            var newPage = new Page();
            newPage.ReportId = id;
            pageRepository.Add(newPage);
            var json = JsonConvert.SerializeObject(newPage.Id);
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeletePage(int id)
        {
            var page = pageRepository.Get(id);
            pageRepository.Remove(page);
            return new EmptyResult();
        }
    }
}