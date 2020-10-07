using CustomReports.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace CustomReports.Data_Access
{
    public class PageRepository : IRepository<Page>
    {
        private readonly ReportsDbContext dbContext;
        public PageRepository()
        {
            dbContext = new ReportsDbContext();
        }
        public void Add(Page entity)
        {
            dbContext.Pages.Add(entity);
            dbContext.SaveChanges();
        }

        public Page Get(int id)
        {
           return dbContext.Pages.FirstOrDefault(p => p.Id == id);
        }
        public Page GetLastPage(int reportId)
        {
            return dbContext.Pages.LastOrDefault(p=>p.ReportId==reportId);
        }

        public IEnumerable<Page> GetAll()
        {
            return dbContext.Pages.ToList();
        }

        public void Remove(Page entity)
        {
            dbContext.Pages.Remove(entity);
            dbContext.SaveChanges();
        }

        public void Update(Page entity)
        {
            dbContext.Pages.AddOrUpdate(entity);
            dbContext.SaveChanges();
        }
    }
}