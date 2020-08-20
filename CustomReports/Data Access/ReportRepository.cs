using CustomReports.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace CustomReports.Data_Access
{
    public class ReportRepository : IRepository<Report>
    {
        protected readonly ReportsDbContext dbContext;
        public ReportRepository()
        {
            dbContext = new ReportsDbContext();
        }

        public void Add(Report entity)
        {
            dbContext.Reports.Add(entity);
            dbContext.SaveChanges();
        }

        public Report Get(int id)
        {
            return dbContext.Reports.FirstOrDefault(r => r.Id == id);
        }

        public IEnumerable<Report> GetAll()
        {
            return dbContext.Reports.ToList();
        }

        public void Remove(Report entity)
        {
            dbContext.Reports.Remove(entity);
            dbContext.SaveChanges();
        }

        public void Update(Report entity)
        {
            dbContext.Reports.AddOrUpdate(entity);
            dbContext.SaveChanges();
        }

        //public ist<CustomerReport> Customers(int ReportID)
        //{
        //    List<CustomerReport> customers = new List<Models.CustomerReport>();
        //    var r = db.Reports.Include(r => r.CustomerReports).FirstOrDefault(r => r.Id == ReportID);
        //    if (r != null)
        //    {
        //        customers = r.CustomerReports.ToList();
        //    }
        //    return customers;
        //}
    }
}