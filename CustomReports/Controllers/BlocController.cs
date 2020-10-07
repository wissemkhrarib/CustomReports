using CustomReports.Data_Access;
using CustomReports.Models;
using CustomReports.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace CustomReports.Controllers
{
    [Authorize]
    public class BlocController : Controller
    {
        // GET: Bloc
        private readonly BlocRepository blocRepository;
        private readonly ReportRepository reportRepository;
        public BlocController()
        {
            blocRepository = new BlocRepository();
            reportRepository = new ReportRepository();
        }

        [HttpGet]
        public JsonResult Create(int id, string title,string headerColor)
        {
            var bloc = new Bloc();
            bloc.Title = title;
            bloc.PageId = id;
            bloc.HeaderColor = headerColor;
            bloc.X = 0;
            bloc.W = 12;
            bloc.H = 4;
            var lastBloc = blocRepository.GetLastBloc(id);
            if (lastBloc != null)
                bloc.Y = lastBloc.Y + lastBloc.H;
            bloc.Id = blocRepository.AddAndGetId(bloc);
            var json = JsonConvert.SerializeObject(bloc);
            Debug.WriteLine(json);
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Update(string jsonData)
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            var blocs = ser.Deserialize<List<Bloc>>(jsonData);

            foreach (var bloc in blocs)
            {
                var dbBloc = blocRepository.Get(bloc.Id);
                dbBloc.X = bloc.X;
                dbBloc.Y = bloc.Y;
                dbBloc.W = bloc.W;
                dbBloc.H = bloc.H;
                blocRepository.Update(dbBloc);
            }

            return new EmptyResult();
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            var bloc = blocRepository.Get(id);
            blocRepository.Remove(bloc);
            return new EmptyResult();
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            var bloc = blocRepository.Get(id);
            return View(bloc);
        }

    }
}